/**
 * Decision tree hasil training C4.5 (chefboost), dikonversi otomatis
 * dari outputs/rules/rules.py oleh convert_rules_to_js.py pada 2026-07-14.
 *
 * findDecision(obj) mengembalikan objek:
 *   provider : label vendor hasil klasifikasi C4.5
 *   rulePath : daftar kondisi if-then yang dilalui dari akar ke daun
 */
export const FEATURE_NAMES = [
  "jenis_signer",
  "registered_Peruri",
  "success_rate_Peruri",
  "avg_sla_ms_Peruri",
  "registered_Privy",
  "success_rate_Privy",
  "avg_sla_ms_Privy",
  "registered_Vinotek",
  "success_rate_Vinotek",
  "avg_sla_ms_Vinotek",
  "registered_Xignature",
  "success_rate_Xignature",
  "avg_sla_ms_Xignature",
];

export function findDecision(obj) {
  const rulePath = [];
  const leaf = (provider) => ({ provider, rulePath });

  if (obj[8] <= 0.0) {
    rulePath.push("success_rate_Vinotek <= 0.0");
    if (obj[5] > 0.0) {
      rulePath.push("success_rate_Privy > 0.0");
      if (obj[11] <= 0.8462) {
        rulePath.push("success_rate_Xignature <= 0.8462");
        return leaf("Privy");
      } else if (obj[11] > 0.8462) {
        rulePath.push("success_rate_Xignature > 0.8462");
        return leaf("Xignature");
      } else {
        return leaf("Privy");
      }
    } else if (obj[5] <= 0.0) {
      rulePath.push("success_rate_Privy <= 0.0");
      if (obj[10] > 0) {
        rulePath.push("registered_Xignature > 0");
        if (obj[2] <= 0.5914) {
          rulePath.push("success_rate_Peruri <= 0.5914");
          return leaf("Xignature");
        } else if (obj[2] > 0.5914) {
          rulePath.push("success_rate_Peruri > 0.5914");
          return leaf("Peruri");
        } else {
          return leaf("Xignature");
        }
      } else if (obj[10] <= 0) {
        rulePath.push("registered_Xignature <= 0");
        return leaf("Peruri");
      } else {
        return leaf("Xignature");
      }
    } else {
      return leaf("Privy");
    }
  } else if (obj[8] > 0.0) {
    rulePath.push("success_rate_Vinotek > 0.0");
    return leaf("Vinotek");
  } else {
    return leaf("Privy");
  }
}

// Kompatibilitas mundur: pemanggil lama yang hanya butuh label string.
export function findDecisionLabel(obj) {
  return findDecision(obj).provider;
}