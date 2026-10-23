# Dependencies and Contracts — aether-ai-infrastructure

Dependencies are reviewed infrastructure-provider modules and environment foundations, not product-domain services.

Contracts: module inputs/outputs are typed and versioned; network exposure, IAM, secret injection, state backend, backup policy, and cost bounds are explicit. Environment promotion must not copy secrets between environments. Module changes require plan review and rollback notes.
