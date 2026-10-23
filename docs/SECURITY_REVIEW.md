# Security Review — aether-ai-infrastructure

Status: checklist only; no infrastructure implementation or test evidence is present.

Threats: public exposure, excessive IAM, state-file leakage, secret leakage, unencrypted backups, environment crossover, and unreviewed destructive changes.

Controls: least privilege, protected/encrypted state, runtime secrets, network segmentation, policy-as-code, peer-reviewed plans, environment isolation, drift detection, and tested restore.

Tests: public exposure defaults, IAM least privilege, state protection, backup encryption/restore, environment isolation, and drift detection.
