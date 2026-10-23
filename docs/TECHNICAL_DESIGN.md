# Technical Design — aether-ai-infrastructure

Proposed layers: provider configuration, reusable network/identity/storage modules, environment stacks, policy checks, plan artifacts, controlled apply, drift monitoring, backup/restore, and runbooks.

Security invariants: deny public exposure by default; least privilege; no secrets in repository state; encrypted and access-controlled state; reviewed plans; separated environments; protected backups; and tested rollback/restore.

Open decisions: provider, state backend, secret manager, network architecture, and deployment target require ADRs.
