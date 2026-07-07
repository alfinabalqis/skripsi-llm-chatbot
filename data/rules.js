// data/rules.js

export function evaluateC45Tree(attributes) {
  const { jenis_layanan, harga_maksimal, jenis_dokumen } = attributes;

  // Contoh pohon keputusan C4.5 berdasarkan kriteria skripsi Anda
  if (jenis_layanan === "sign-ematerai") {
    if (harga_maksimal >= 15000) {
      return {
        vendor: "Vinotek",
        alasan_c45: "Berdasarkan pola historis transaksi DSA, Vinotek mendominasi volume transaksi sign-ematerai dengan profit margin optimal bagi platform."
      };
    } else {
      return {
        vendor: "Peruri",
        alasan_c45: "Peruri dipilih karena memenuhi batas anggaran untuk layanan bermeterai elektronik sesuai parameter input."
      };
    }
  } 
  
  if (jenis_layanan === "signing") {
    const docLower = jenis_dokumen.toLowerCase();
    if (docLower.includes("nota dinas") || docLower.includes("internal")) {
      return {
        vendor: "Xignature",
        alasan_c45: "Xignature direkomendasikan untuk dokumen internal korporasi dengan efisiensi biaya signing standar."
      };
    } else {
      return {
        vendor: "Privy",
        alasan_c45: "Privy dipilih karena keunggulan fitur autentikasi tambahan yang kuat untuk dokumen eksternal."
      };
    }
  }

  // Fallback default jika tidak masuk ke percabangan spesifik
  return {
    vendor: "Vinotek",
    alasan_c45: "Vinotek dipilih sebagai rekomendasi umum karena memiliki kestabilan SLA dan volume record tertinggi di platform DSA."
  };
}