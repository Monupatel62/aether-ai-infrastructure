# Architecture — aether-ai-infrastructure

## Boundary
Own environment and platform provisioning; do not encode product-domain behavior in infrastructure modules.

## Environment layers
1. Reusable reviewed modules.
2. Environment-specific configuration with no committed secrets.
3. Plan/policy validation and peer review.
4. Controlled apply using least-privilege identities.
5. Drift detection, monitoring, backup, and recovery.

State is sensitive and must use approved protected storage, encryption, locking, and access auditing.
