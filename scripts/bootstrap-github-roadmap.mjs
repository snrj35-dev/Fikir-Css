import { execSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

const labelsPath = resolve(rootDir, ".github/project-management/labels.json");
const milestonesPath = resolve(rootDir, ".github/project-management/milestones.json");
const issuesPath = resolve(rootDir, ".github/project-management/issues-m1.json");

function parseRepoSlug() {
  const envSlug = process.env.GITHUB_REPOSITORY;
  if (envSlug) return envSlug;

  const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
  const match = remote.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/);

  if (!match) {
    throw new Error(`Cannot parse GitHub slug from origin URL: ${remote}`);
  }

  return match[1];
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function githubRequest({ method = "GET", path, body }) {
  const url = `https://api.github.com${path}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${path} failed (${response.status}): ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function printDryRun(slug, labels, milestones, issues) {
  console.log("GH token not found. Dry-run only.");
  console.log(`Target repo: ${slug}`);
  console.log(`Would sync ${labels.length} labels, ${milestones.length} milestones, ${issues.length} issues.`);
  console.log("Provide GH_TOKEN or GITHUB_TOKEN to apply changes.");
}

async function upsertLabels(slug, labels) {
  const existing = await githubRequest({ path: `/repos/${slug}/labels?per_page=100` });
  const existingByName = new Map(existing.map((item) => [item.name, item]));

  for (const label of labels) {
    const found = existingByName.get(label.name);

    if (!found) {
      await githubRequest({ method: "POST", path: `/repos/${slug}/labels`, body: label });
      continue;
    }

    await githubRequest({
      method: "PATCH",
      path: `/repos/${slug}/labels/${encodeURIComponent(label.name)}`,
      body: {
        new_name: label.name,
        color: label.color,
        description: label.description
      }
    });
  }
}

async function upsertMilestones(slug, milestones) {
  const existing = await githubRequest({ path: `/repos/${slug}/milestones?state=all&per_page=100` });
  const existingByTitle = new Map(existing.map((item) => [item.title, item]));

  for (const milestone of milestones) {
    const found = existingByTitle.get(milestone.title);

    if (!found) {
      await githubRequest({ method: "POST", path: `/repos/${slug}/milestones`, body: milestone });
      continue;
    }

    await githubRequest({
      method: "PATCH",
      path: `/repos/${slug}/milestones/${found.number}`,
      body: {
        title: milestone.title,
        description: milestone.description,
        due_on: milestone.due_on,
        state: milestone.state
      }
    });
  }

  const refreshed = await githubRequest({ path: `/repos/${slug}/milestones?state=all&per_page=100` });
  return new Map(refreshed.map((item) => [item.title, item.number]));
}

async function upsertIssues(slug, issues, milestoneNumbersByTitle) {
  const existing = await githubRequest({ path: `/repos/${slug}/issues?state=all&per_page=100` });
  const issueByTitle = new Map(
    existing
      .filter((item) => !item.pull_request)
      .map((item) => [item.title, item])
  );

  for (const issue of issues) {
    const milestoneNumber = issue.milestone
      ? milestoneNumbersByTitle.get(issue.milestone)
      : undefined;

    const payload = {
      title: issue.title,
      body: issue.body,
      labels: issue.labels,
      milestone: milestoneNumber
    };

    const found = issueByTitle.get(issue.title);

    if (!found) {
      await githubRequest({ method: "POST", path: `/repos/${slug}/issues`, body: payload });
      continue;
    }

    await githubRequest({
      method: "PATCH",
      path: `/repos/${slug}/issues/${found.number}`,
      body: payload
    });
  }
}

async function main() {
  const slug = parseRepoSlug();
  const labels = await readJson(labelsPath);
  const milestones = await readJson(milestonesPath);
  const issues = await readJson(issuesPath);

  if (!token) {
    printDryRun(slug, labels, milestones, issues);
    return;
  }

  await upsertLabels(slug, labels);
  const milestoneNumbersByTitle = await upsertMilestones(slug, milestones);
  await upsertIssues(slug, issues, milestoneNumbersByTitle);

  console.log(`GitHub roadmap bootstrap completed for ${slug}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
