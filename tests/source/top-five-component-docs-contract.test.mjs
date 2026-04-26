import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

const docs = [
  {
    path: "docs/components/app-shell.md",
    required: ["`app-shell`", "`app-shell-topbar`", "`app-shell-content`", "`app-shell-sidebar`", "`app-shell-main`"],
    forbidden: ['class="comp-app-shell"', 'class="app-shell-footer"', 'class="app-shell-header"']
  },
  {
    path: "docs/components/navbar.md",
    required: ["`navbar`", "`navbar-brand`", "`navbar-nav`", "`navbar-item`"],
    forbidden: ['class="comp-navbar"', 'class="navbar-menu"', 'class="navbar-actions"', 'class="navbar-toggle"']
  },
  {
    path: "docs/components/page-header.md",
    required: ["`page-header`", "`page-header-content`", "`page-header-actions`"],
    forbidden: ['class="comp-page-header"', 'class="page-header-title"', 'class="page-header-subtitle"', 'class="page-header-breadcrumb"']
  },
  {
    path: "docs/components/sidebar-nav.md",
    required: ["`sidebar-nav`", "`sidebar-nav-section`", "`sidebar-nav-item`"],
    forbidden: ['class="comp-sidebar-nav"', 'class="sidebar-nav-submenu"', 'class="sidebar-item-active"', 'data-active="true"']
  },
  {
    path: "docs/components/timeline.md",
    required: ["`timeline`", "`timeline-item`", "`timeline-marker`", "`timeline-content`", "`timeline-title`", "`timeline-meta`"],
    forbidden: ['class="comp-timeline"', 'class="timeline-entry"', 'class="timeline-dot"']
  }
];

for (const doc of docs) {
  test(`top-five docs contract: ${doc.path} uses canonical selectors`, async () => {
    const content = await readFile(resolve(rootDir, doc.path), "utf8");

    for (const required of doc.required) {
      assert.ok(content.includes(required), `${doc.path} is missing canonical token ${required}`);
    }

    for (const forbidden of doc.forbidden) {
      assert.equal(content.includes(forbidden), false, `${doc.path} still references stale token ${forbidden}`);
    }
  });
}
