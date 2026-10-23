import test from "node:test";
import assert from "node:assert/strict";
import { validateEnvironmentManifest, assertSafePlan } from "../src/index.js";

const safe = () => ({
  environment: "prod-east", stage: "production",
  stateBackend: { protected: true, encryption: "enabled" },
  services: [{ name: "api", publiclyExposed: true, ingressPolicy: "approved", stateful: false,
    identity: { permissions: ["logs:write"] }, environment: { DATABASE_PASSWORD: "${secret://db-password}" } }]
});

test("accepts a policy-compliant environment manifest", () => {
  assert.deepEqual(validateEnvironmentManifest(safe()), { valid: true, errors: [] });
});

test("rejects unapproved public ingress, unsafe state, and literal secrets", () => {
  const manifest = safe();
  manifest.services[0].ingressPolicy = "open";
  manifest.services[0].environment.DATABASE_PASSWORD = "dont-commit-this";
  manifest.stateBackend.encryption = "disabled";
  const result = validateEnvironmentManifest(manifest);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("approved ingress")));
  assert.ok(result.errors.some((e) => e.includes("secret manager")));
  assert.ok(result.errors.some((e) => e.includes("encryption")));
});

test("rejects malformed and duplicated services", () => {
  const manifest = safe();
  manifest.services.push({ name: "api" });
  assert.ok(validateEnvironmentManifest(manifest).errors.some((e) => e.includes("duplicated")));
  assert.equal(validateEnvironmentManifest(null).valid, false);
});

test("production plans require approval and destructive plans are blocked", () => {
  assert.throws(() => assertSafePlan({ environment: "production" }), /approval/);
  assert.throws(() => assertSafePlan({ environment: "staging", destroyAll: true }), /destroy-all/);
  assert.deepEqual(assertSafePlan({ environment: "production", approval: "approved", changeId: "chg-1" }), { accepted: true, environment: "production", changeId: "chg-1" });
});
