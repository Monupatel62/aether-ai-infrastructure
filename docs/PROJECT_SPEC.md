# Project Specification — aether-ai-infrastructure

## Purpose
Infrastructure-as-code, environment provisioning, networking, managed dependencies, and operational baselines.

## Scope
Environment isolation, protected state, least-privilege IAM, secret injection, backup/restore, network policies, cost controls, and deployment safety. No product-domain runtime dependency is owned here.

## Acceptance criteria
Infrastructure plans are reviewed before apply; public exposure is denied by default; state and backups are protected; rollback and restore are tested.

## Status
Documentation only; no infrastructure source, manifests, tests, or CI workflow was found in the inspected default-branch tree.
