# Engineering Standard — aether-ai-infrastructure

- Use reusable, typed modules with secure defaults.
- Deny public exposure unless explicitly reviewed and approved.
- Never commit credentials, state files, private keys, or customer data.
- Review plan output before applying changes; production apply requires explicit authorization.
- Pin provider/module versions and scan dependencies.
- Separate environments and identities; keep state encrypted and access-controlled.
- Test backup/restore and rollback, not only provisioning.
- Document ownership, alerts, costs, and incident procedures with each environment change.
