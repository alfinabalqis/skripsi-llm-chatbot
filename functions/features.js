// shared/features.js
export const VALID_JENIS_SIGNER = ['Sign', 'Sign + E-Materai'];
export const PROVIDERS = ['Peruri', 'Privy', 'Vinotek', 'Xignature'];

const CAPABILITY_MAP = {
  Peruri: { supportsSignOnly: true, supportsSignEmaterai: true },
  Privy: { supportsSignOnly: true, supportsSignEmaterai: true },
  Vinotek: { supportsSignOnly: true, supportsSignEmaterai: true },
  Xignature: { supportsSignOnly: true, supportsSignEmaterai: true },
};

const SENTINEL_SUCCESS_RATE = 0.0;
const SENTINEL_SLA_MS = 999999.0;

export function buildFeatureArray(jenisSigner, providerTerdaftar, metricsSnapshot) {
  const featureArray = [jenisSigner];
  const metricsUsed = {};

  for (const provider of PROVIDERS) {
    const isRegistered = providerTerdaftar.includes(provider);
    const capability = CAPABILITY_MAP[provider];
    const supports = jenisSigner === 'Sign'
      ? capability.supportsSignOnly
      : capability.supportsSignEmaterai;

    const metric = metricsSnapshot[provider];
    const eligible = isRegistered && supports && metric != null;

    const successRate = eligible ? metric.successRate : SENTINEL_SUCCESS_RATE;
    const avgSlaMs = eligible ? metric.avgSlaMs : SENTINEL_SLA_MS;

    featureArray.push(isRegistered ? 1 : 0, successRate, avgSlaMs);
    metricsUsed[provider] = { registered: isRegistered, success_rate: successRate, avg_sla_ms: avgSlaMs };
  }

  return { featureArray, metricsUsed };
}