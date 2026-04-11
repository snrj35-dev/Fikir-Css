# Versioning and Semver Policy

## Version format
Fikir CSS follows `MAJOR.MINOR.PATCH`.

## Current stage guidance
- `0.x`: pre-1.0 productization stage.
- In `0.x`, breaking changes can occur, but must be explicitly called out in release + migration notes.

## Change classification
- `PATCH`: non-breaking fixes (docs/tests/style bugs, no contract break)
- `MINOR`: new surface or behavior that does not break existing canonical contract usage
- `MAJOR`: canonical contract break, migration-required rename/removal, or compatibility break

## Required for version bump
- release notes updated
- migration impact reviewed
- alias migration artifact regenerated when relevant
- support matrix reviewed

## Tag policy
- Git tag format: `vX.Y.Z`
- Tag must match `package.json#version`
