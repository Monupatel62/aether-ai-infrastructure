const ID = /^[a-z][a-z0-9-]{1,62}$/;
const SECRET_KEY = /(secret|password|token|private.?key|api.?key|credential)/i;

export function validateEnvironmentManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return Object.freeze({ valid: false, errors: Object.freeze(["manifest must be an object"]) });
  }
  if (!ID.test(manifest.environment ?? "")) errors.push("environment must be a lowercase DNS-style identifier");
  if (!["development", "staging", "production"].includes(manifest.stage)) errors.push("stage must be development, staging, or production");
  if (!Array.isArray(manifest.services) || manifest.services.length === 0) errors.push("services must be a non-empty array");
  const seen = new Set();
  for (const [index, service] of (Array.isArray(manifest.services) ? manifest.services : []).entries()) {
    const prefix = `services[${index}]`;
    if (!service || typeof service !== "object" || Array.isArray(service)) { errors.push(`${prefix} must be an object`); continue; }
    if (!ID.test(service.name ?? "")) errors.push(`${prefix}.name is invalid`);
    else if (seen.has(service.name)) errors.push(`${prefix}.name is duplicated`);
    else seen.add(service.name);
    if (service.publiclyExposed === true && service.ingressPolicy !== "approved") errors.push(`${prefix} public exposure requires approved ingress policy`);
    if (service.stateful === true && service.backupPolicy !== "encrypted-and-tested") errors.push(`${prefix} stateful service requires encrypted-and-tested backups`);
    if (service.identity && (!Array.isArray(service.identity.permissions) || service.identity.permissions.length === 0)) errors.push(`${prefix}.identity must declare least-privilege permissions`);
    if (service.environment && typeof service.environment === "object") {
      for (const [key, value] of Object.entries(service.environment)) {
        if (SECRET_KEY.test(key) && typeof value === "string" && value.length > 0 && !/^\\$?\\{?secret:\\/\\//i.test(value)) errors.push(`${prefix}.environment.${key} must reference a secret manager, not contain a value`);
      }
    }
  }
  if (manifest.stateBackend?.protected !== true) errors.push("state backend must be marked protected");
  if (manifest.stateBackend?.encryption !== "enabled") errors.push("state backend encryption must be enabled");
  return Object.freeze({ valid: errors.length === 0, errors: Object.freeze(errors) });
}

export function assertSafePlan(plan) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) throw new TypeError("plan must be an object");
  if (plan.environment === "production" && plan.approval !== "approved") throw new Error("production plans require explicit approval");
  if (plan.destroyAll === true) throw new Error("destroy-all plans are blocked by policy");
  if (plan.containsSecretValues === true) throw new Error("plans must not contain secret values");
  return Object.freeze({ accepted: true, environment: plan.environment, changeId: plan.changeId ?? null });
}
