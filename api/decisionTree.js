/**
 * Decision tree hasil training C4.5 (chefboost), dikonversi otomatis
 * dari outputs/rules/rules.py
 * pakai convert_rules_to_js.py tiap kali retrain.
 * Urutan fitur: obj[0]: jenis_signer, obj[1]: registered_Peruri, obj[2]: success_rate_Peruri, obj[3]: avg_sla_ms_Peruri, obj[4]: registered_Privy, obj[5]: success_rate_Privy, obj[6]: avg_sla_ms_Privy, obj[7]: registered_Vinotek, obj[8]: success_rate_Vinotek, obj[9]: avg_sla_ms_Vinotek, obj[10]: registered_Xignature, obj[11]: success_rate_Xignature, obj[12]: avg_sla_ms_Xignature
 */
export function findDecision(obj) {
  if (obj[8] <= 0.0) {
    if (obj[5] > 0.0) {
      if (obj[11] <= 0.8462) {
        return "Privy";
      } else if (obj[11] > 0.8462) {
        return "Xignature";
      } else {
        return "Privy";
      }
    } else if (obj[5] <= 0.0) {
      if (obj[10] > 0) {
        if (obj[2] <= 0.5914) {
          return "Xignature";
        } else if (obj[2] > 0.5914) {
          return "Peruri";
        } else {
          return "Xignature";
        }
      } else if (obj[10] <= 0) {
        return "Peruri";
      } else {
        return "Xignature";
      }
    } else {
      return "Privy";
    }
  } else if (obj[8] > 0.0) {
    return "Vinotek";
  } else {
    return "Privy";
  }
}