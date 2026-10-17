import { Store, Shirt, Coffee, Wrench } from 'lucide-react';

export const PRESETS = {
  warung: {
    id: 'warung',
    namaUsaha: 'Warung Sembako & Kelontong Berkah',
    sektor: 'Perdagangan Eceran (FMCG)',
    pemilik: 'Bpk. H. Sudirman',
    badge: 'Kondisi Sangat Sehat',
    badgeColor: 'emerald',
    icon: Store,
    deskripsi: 'Perputaran barang sangat cepat, transaksi tunai & QRIS kuat, beban utang sangat terkendali.',
    // Neraca (Rp)
    kas: 35000000,
    piutang: 5000000,
    persediaan: 45000000,
    asetTetap: 120000000,
    utangJangkaPendek: 20000000,
    utangJangkaPanjang: 25000000,
    ekuitas: 160000000,
    // Laba Rugi Bulanan (Rp)
    omzetBulanan: 150000000,
    hppBulanan: 123000000,
    biayaOperasional: 10000000,
    cicilanEksisting: 2000000,
    // Rencana Kredit Baru
    plafonDiajukan: 50000000,
    tenorBulan: 24,
    bungaTahunan: 9, // KUR Setara
    // Kualitatif 5C
    lamaUsaha: 6,
    slikOjk: 1, // Kol 1 Lancar
    pencatatan: 'digital', // POS / Aplikasi
    persenDigital: 45,
    statusTempat: 'milik_sendiri'
  },
  konveksi: {
    id: 'konveksi',
    namaUsaha: 'Konveksi & Sablon Nusantara',
    sektor: 'Manufaktur & Tekstil Skala Kecil',
    pemilik: 'Ibu Rina Wijaya',
    badge: 'Perlu Perhatian',
    badgeColor: 'amber',
    icon: Shirt,
    deskripsi: 'Margin laba kotor bagus, namun banyak modal tertahan di piutang pelanggan B2B dan stok kain menumpuk.',
    // Neraca (Rp)
    kas: 18000000,
    piutang: 75000000,
    persediaan: 85000000,
    asetTetap: 140000000,
    utangJangkaPendek: 95000000,
    utangJangkaPanjang: 80000000,
    ekuitas: 143000000,
    // Laba Rugi Bulanan (Rp)
    omzetBulanan: 95000000,
    hppBulanan: 57000000,
    biayaOperasional: 22000000,
    cicilanEksisting: 6800000,
    // Rencana Kredit Baru
    plafonDiajukan: 75000000,
    tenorBulan: 24,
    bungaTahunan: 12,
    // Kualitatif 5C
    lamaUsaha: 3.5,
    slikOjk: 2, // Kol 2 DPK (Pernah telat bayar < 60 hari)
    pencatatan: 'sederhana',
    persenDigital: 35,
    statusTempat: 'sewa'
  },
  kopi: {
    id: 'kopi',
    namaUsaha: 'Kedai Kopi & Roastery Senja',
    sektor: 'Kuliner & F&B',
    pemilik: 'Sdr. Kevin Pratama',
    badge: 'Risiko Tinggi / Kritis',
    badgeColor: 'rose',
    icon: Coffee,
    deskripsi: 'Beban sewa tempat dan cicilan mesin kopi mahal, arus kas bebas sangat sempit untuk menanggung kredit baru.',
    // Neraca (Rp)
    kas: 7500000,
    piutang: 2500000,
    persediaan: 28000000,
    asetTetap: 110000000,
    utangJangkaPendek: 55000000,
    utangJangkaPanjang: 65000000,
    ekuitas: 28000000,
    // Laba Rugi Bulanan (Rp)
    omzetBulanan: 42000000,
    hppBulanan: 21000000,
    biayaOperasional: 16500000,
    cicilanEksisting: 4000000,
    // Rencana Kredit Baru
    plafonDiajukan: 45000000,
    tenorBulan: 18,
    bungaTahunan: 14,
    // Kualitatif 5C
    lamaUsaha: 1.2,
    slikOjk: 3, // Kol 3 Kurang Lancar
    pencatatan: 'manual',
    persenDigital: 65,
    statusTempat: 'sewa'
  },
  bengkel: {
    id: 'bengkel',
    namaUsaha: 'Bengkel Presisi & Sparepart Jaya',
    sektor: 'Jasa & Perdagangan Otomotif',
    pemilik: 'Bpk. Agus Salim',
    badge: 'Pertumbuhan Moderat',
    badgeColor: 'indigo',
    icon: Wrench,
    deskripsi: 'Jasa servis motor & ganti oli stabil, margin tinggi dari oli & suku cadang fast-moving, ekspansi 1 lift motor.',
    // Neraca (Rp)
    kas: 24000000,
    piutang: 8000000,
    persediaan: 38000000,
    asetTetap: 85000000,
    utangJangkaPendek: 18000000,
    utangJangkaPanjang: 30000000,
    ekuitas: 107000000,
    // Laba Rugi Bulanan (Rp)
    omzetBulanan: 65000000,
    hppBulanan: 32000000,
    biayaOperasional: 14000000,
    cicilanEksisting: 2500000,
    // Rencana Kredit Baru
    plafonDiajukan: 35000000,
    tenorBulan: 24,
    bungaTahunan: 10.5,
    // Kualitatif 5C
    lamaUsaha: 4.0,
    slikOjk: 1,
    pencatatan: 'sederhana',
    persenDigital: 50,
    statusTempat: 'sewa'
  }
};
