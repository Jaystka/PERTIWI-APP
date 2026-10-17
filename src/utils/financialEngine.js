import { formatRupiah, formatSingkatRupiah } from './formatters';

/**
 * Mesin kalkulasi rasio keuangan, penilaian 5C, dan credit scoring UMKM
 */
export function calculateFinancialAnalysis(formData) {
  const {
    kas = 0,
    piutang = 0,
    persediaan = 0,
    asetTetap = 0,
    utangJangkaPendek = 0,
    utangJangkaPanjang = 0,
    ekuitas = 0,
    omzetBulanan = 0,
    hppBulanan = 0,
    biayaOperasional = 0,
    cicilanEksisting = 0,
    plafonDiajukan = 0,
    tenorBulan = 12,
    bungaTahunan = 12,
    lamaUsaha = 1,
    slikOjk = 1,
    pencatatan = 'sederhana',
    persenDigital = 30,
    statusTempat = 'sewa'
  } = formData;

  // 1. Agregat Dasar Neraca & Laba Rugi
  const asetLancar = Number(kas) + Number(piutang) + Number(persediaan);
  const totalAset = asetLancar + Number(asetTetap);
  const totalUtang = Number(utangJangkaPendek) + Number(utangJangkaPanjang);
  const modalEkuitas = Number(ekuitas) > 0 ? Number(ekuitas) : Math.max(1, totalAset - totalUtang);

  const labaKotor = Number(omzetBulanan) - Number(hppBulanan);
  const labaOperasional = labaKotor - Number(biayaOperasional); // EBITDA pendekatan UMKM

  // Simulasi Cicilan Kredit Baru (Metode Anuitas / Efektif Bulanan)
  const rateBulanan = (Number(bungaTahunan) / 100) / 12;
  let cicilanBaru = 0;
  if (tenorBulan > 0 && plafonDiajukan > 0) {
    if (rateBulanan > 0) {
      cicilanBaru =
        (plafonDiajukan * rateBulanan * Math.pow(1 + rateBulanan, tenorBulan)) /
        (Math.pow(1 + rateBulanan, tenorBulan) - 1);
    } else {
      cicilanBaru = plafonDiajukan / tenorBulan;
    }
  }

  const totalCicilanSetelahKredit = Number(cicilanEksisting) + cicilanBaru;
  const labaBersihSebelumKredit = labaOperasional - Number(cicilanEksisting);
  const labaBersihSetelahKredit = labaOperasional - totalCicilanSetelahKredit;

  // 2. Perhitungan Rasio Keuangan
  // a) Likuiditas
  const currentRatio = utangJangkaPendek > 0 ? asetLancar / utangJangkaPendek : 5.0;
  const quickRatio = utangJangkaPendek > 0 ? (Number(kas) + Number(piutang)) / utangJangkaPendek : 4.0;
  const cashRatio = utangJangkaPendek > 0 ? Number(kas) / utangJangkaPendek : 3.0;

  // b) Profitabilitas
  const gpm = omzetBulanan > 0 ? (labaKotor / omzetBulanan) * 100 : 0;
  const npm = omzetBulanan > 0 ? (labaBersihSebelumKredit / omzetBulanan) * 100 : 0;
  const npmAfter = omzetBulanan > 0 ? (labaBersihSetelahKredit / omzetBulanan) * 100 : 0;
  // ROE disetahunkan (Annualized)
  const roeTahunan = modalEkuitas > 0 ? ((labaBersihSebelumKredit * 12) / modalEkuitas) * 100 : 0;

  // c) Solvabilitas / Leverage
  const der = modalEkuitas > 0 ? (totalUtang / modalEkuitas) * 100 : 999;
  const dar = totalAset > 0 ? (totalUtang / totalAset) * 100 : 100;

  // d) Kapasitas Bayar Utang (DSCR)
  const dscrEksisting = cicilanEksisting > 0 ? labaOperasional / cicilanEksisting : 5.0;
  const dscrBaru = totalCicilanSetelahKredit > 0 ? labaOperasional / totalCicilanSetelahKredit : 5.0;

  // e) Efisiensi Operasional (Perputaran Persediaan & Piutang dalam Hari)
  const inventoryDays = hppBulanan > 0 ? (persediaan / hppBulanan) * 30 : 0;
  const receivableDays = omzetBulanan > 0 ? (piutang / omzetBulanan) * 30 : 0;

  // 3. Evaluasi Skor Komponen Keuangan (Maks 100 Poin -> Bobot 60%)
  // Likuiditas (Maks 15)
  let scoreLiquidity = 0;
  if (currentRatio >= 1.75) scoreLiquidity += 9;
  else if (currentRatio >= 1.2) scoreLiquidity += 6;
  else if (currentRatio >= 1.0) scoreLiquidity += 3;

  if (quickRatio >= 1.0) scoreLiquidity += 6;
  else if (quickRatio >= 0.7) scoreLiquidity += 4;
  else if (quickRatio >= 0.4) scoreLiquidity += 2;

  // Profitabilitas (Maks 25)
  let scoreProfitability = 0;
  if (npm >= 12) scoreProfitability += 15;
  else if (npm >= 8) scoreProfitability += 12;
  else if (npm >= 5) scoreProfitability += 8;
  else if (npm > 0) scoreProfitability += 4;

  if (roeTahunan >= 25) scoreProfitability += 10;
  else if (roeTahunan >= 15) scoreProfitability += 7;
  else if (roeTahunan >= 8) scoreProfitability += 4;

  // Solvabilitas / Leverage (Maks 20)
  let scoreSolvency = 0;
  if (der <= 70) scoreSolvency += 12;
  else if (der <= 120) scoreSolvency += 9;
  else if (der <= 200) scoreSolvency += 5;
  else scoreSolvency += 1;

  if (dar <= 45) scoreSolvency += 8;
  else if (dar <= 65) scoreSolvency += 5;
  else if (dar <= 80) scoreSolvency += 2;

  // Kapasitas Bayar DSCR Setelah Kredit Baru (Maks 25)
  let scoreDscr = 0;
  if (dscrBaru >= 2.0) scoreDscr = 25;
  else if (dscrBaru >= 1.5) scoreDscr = 20;
  else if (dscrBaru >= 1.25) scoreDscr = 14;
  else if (dscrBaru >= 1.0) scoreDscr = 6;
  else scoreDscr = 0;

  // Efisiensi Modal Kerja (Maks 15)
  let scoreEfficiency = 0;
  if (inventoryDays <= 25) scoreEfficiency += 9;
  else if (inventoryDays <= 45) scoreEfficiency += 6;
  else if (inventoryDays <= 65) scoreEfficiency += 3;

  if (receivableDays <= 10) scoreEfficiency += 6;
  else if (receivableDays <= 25) scoreEfficiency += 4;
  else if (receivableDays <= 45) scoreEfficiency += 2;

  const totalFinancialScore100 = Math.min(
    100,
    scoreLiquidity + scoreProfitability + scoreSolvency + scoreDscr + scoreEfficiency
  );

  // 4. Evaluasi Skor Kualitatif & Karakter 5C (Maks 100 Poin -> Bobot 40%)
  // Riwayat SLIK OJK (Maks 40)
  let scoreSlik = 0;
  if (slikOjk === 1) scoreSlik = 40;
  else if (slikOjk === 2) scoreSlik = 24;
  else if (slikOjk === 3) scoreSlik = 10;
  else if (slikOjk === 4) scoreSlik = 4;
  else scoreSlik = 0;

  // Lama Usaha (Maks 20)
  let scoreLamaUsaha = 0;
  if (lamaUsaha >= 5) scoreLamaUsaha = 20;
  else if (lamaUsaha >= 3) scoreLamaUsaha = 15;
  else if (lamaUsaha >= 1.5) scoreLamaUsaha = 10;
  else scoreLamaUsaha = 4;

  // Pencatatan Keuangan (Maks 20)
  let scorePencatatan = 0;
  if (pencatatan === 'digital') scorePencatatan = 20;
  else if (pencatatan === 'sederhana') scorePencatatan = 12;
  else scorePencatatan = 4;

  // Digitalisasi Transaksi QRIS/Mutasi Rekening & Tempat Usaha (Maks 20)
  let scoreDigitalTempat = 0;
  if (persenDigital >= 40) scoreDigitalTempat += 10;
  else if (persenDigital >= 20) scoreDigitalTempat += 7;
  else scoreDigitalTempat += 3;

  if (statusTempat === 'milik_sendiri') scoreDigitalTempat += 10;
  else scoreDigitalTempat += 6;

  const totalQualitativeScore100 = Math.min(
    100,
    scoreSlik + scoreLamaUsaha + scorePencatatan + scoreDigitalTempat
  );

  // 5. Konversi ke Skor Kredit Skala 300 - 850 (Standar Credit Bureau / FICO-like)
  const compositeIndex100 = totalFinancialScore100 * 0.6 + totalQualitativeScore100 * 0.4;
  let finalCreditScore = Math.round(300 + (compositeIndex100 / 100) * 550);

  // Penalti keras (Hard Knock-out Rule) jika SLIK Kol 4/5 atau Laba Operasional Negatif
  if (slikOjk >= 4) {
    finalCreditScore = Math.min(finalCreditScore, 490);
  }
  if (labaOperasional <= 0) {
    finalCreditScore = Math.min(finalCreditScore, 460);
  }

  // Menentukan Grade & Rekomendasi Keputusan Kredit
  let grade = 'D';
  let gradeLabel = 'Belum Layak / Risiko Tinggi';
  let gradeDesc = 'Pengajuan kredit disarankan ditolak sementara atau direstrukturisasi total.';
  let gradeColor = 'rose';

  if (finalCreditScore >= 750) {
    grade = 'A';
    gradeLabel = 'Sangat Layak (Prime UMKM)';
    gradeDesc = 'Kondisi keuangan dan karakter usaha sangat sehat. Layak disetujui penuh dengan bunga kompetitif.';
    gradeColor = 'emerald';
  } else if (finalCreditScore >= 650) {
    grade = 'B';
    gradeLabel = 'Layak Kredit (Good Standing)';
    gradeDesc = 'Usaha berjalan baik dan mampu menutup kewajiban cicilan. Layak disetujui sesuai plafon aman.';
    gradeColor = 'indigo';
  } else if (finalCreditScore >= 550) {
    grade = 'C';
    gradeLabel = 'Layak dengan Catatan (Watchlist)';
    gradeDesc = 'Terdapat indikator keuangan yang ketat. Disarankan penyesuaian plafon/tenor atau tambahan agunan.';
    gradeColor = 'amber';
  }

  // 6. Perhitungan Rekomendasi Plafon Maksimal yang Aman
  // Standar perbankan: Total cicilan maksimal adalah 35% - 40% dari Laba Operasional (atau DSCR minimal 1.5x)
  const kapasitasCicilanTotalAman = Math.max(0, labaOperasional / 1.5); // Agar DSCR minimal 1.5x
  const sisaKapasitasCicilanBaru = Math.max(0, kapasitasCicilanTotalAman - cicilanEksisting);

  let rekomendasiPlafonAman = 0;
  if (sisaKapasitasCicilanBaru > 0 && tenorBulan > 0) {
    if (rateBulanan > 0) {
      rekomendasiPlafonAman =
        sisaKapasitasCicilanBaru *
        ((Math.pow(1 + rateBulanan, tenorBulan) - 1) /
          (rateBulanan * Math.pow(1 + rateBulanan, tenorBulan)));
    } else {
      rekomendasiPlafonAman = sisaKapasitasCicilanBaru * tenorBulan;
    }
  }

  // 7. Daftar Kartu Rasio Keuangan Interaktif
  const ratios = [
    {
      id: 'dscr',
      kategori: 'Kapasitas Bayar',
      nama: 'DSCR (Setelah Kredit Baru)',
      rumus: 'Laba Operasional / Total Cicilan',
      nilai: `${dscrBaru.toFixed(2)}x`,
      raw: dscrBaru,
      targetText: 'Ideal ≥ 1.50x (Min 1.25x)',
      progress: Math.min(100, (dscrBaru / 2.5) * 100),
      status: dscrBaru >= 1.5 ? 'Sehat' : dscrBaru >= 1.2 ? 'Waspada' : 'Kritis',
      color: dscrBaru >= 1.5 ? 'emerald' : dscrBaru >= 1.2 ? 'amber' : 'rose',
      arti:
        dscrBaru >= 1.5
          ? `Laba usaha ${dscrBaru.toFixed(2)} kali lipat lebih besar dari total beban cicilan bulanan. Arus kas sangat aman.`
          : dscrBaru >= 1.2
          ? `Kapasitas bayar cukup pas-pasan (${dscrBaru.toFixed(2)}x). Jika omzet turun sedikit, pedagang berisiko kesulitan mencicil.`
          : `Bahaya gagal bayar! Laba operasional (${formatSingkatRupiah(labaOperasional)}) terlalu sempit untuk menutup total cicilan (${formatSingkatRupiah(totalCicilanSetelahKredit)}).`
    },
    {
      id: 'current_ratio',
      kategori: 'Likuiditas',
      nama: 'Current Ratio (Rasio Lancar)',
      rumus: 'Aset Lancar / Utang Jangka Pendek',
      nilai: `${currentRatio.toFixed(2)}x`,
      raw: currentRatio,
      targetText: 'Ideal 1.50x – 2.50x',
      progress: Math.min(100, (currentRatio / 2.5) * 100),
      status: currentRatio >= 1.5 ? 'Sehat' : currentRatio >= 1.05 ? 'Waspada' : 'Kritis',
      color: currentRatio >= 1.5 ? 'emerald' : currentRatio >= 1.05 ? 'amber' : 'rose',
      arti:
        currentRatio >= 1.5
          ? 'Aset lancar (kas, piutang, stok) sangat memadai untuk melunasi utang dagang/supplier jatuh tempo.'
          : currentRatio >= 1.05
          ? 'Likuiditas agak ketat. Pedagang harus menjaga perputaran uang tunai agar tidak terlambat bayar supplier.'
          : 'Krisis likuiditas jangka pendek! Utang dagang/jatuh tempo lebih besar daripada aset lancar yang tersedia.'
    },
    {
      id: 'quick_ratio',
      kategori: 'Likuiditas',
      nama: 'Quick Ratio (Acid Test)',
      rumus: '(Kas + Piutang) / Utang Jk. Pendek',
      nilai: `${quickRatio.toFixed(2)}x`,
      raw: quickRatio,
      targetText: 'Ideal ≥ 1.00x',
      progress: Math.min(100, (quickRatio / 1.8) * 100),
      status: quickRatio >= 1.0 ? 'Sehat' : quickRatio >= 0.65 ? 'Waspada' : 'Kritis',
      color: quickRatio >= 1.0 ? 'emerald' : quickRatio >= 0.65 ? 'amber' : 'rose',
      arti:
        quickRatio >= 1.0
          ? 'Tanpa harus menjual stok barang, kas dan piutang sudah mampu menutup kewajiban jangka pendek.'
          : 'Kemampuan bayar instan sangat bergantung pada lakunya stok barang dagangan di gudang/toko.'
    },
    {
      id: 'npm',
      kategori: 'Profitabilitas',
      nama: 'Net Profit Margin (NPM)',
      rumus: 'Laba Bersih / Omzet Bulanan',
      nilai: `${npm.toFixed(1)}%`,
      raw: npm,
      targetText: 'Ideal UMKM ≥ 8.0%',
      progress: Math.min(100, Math.max(0, (npm / 18) * 100)),
      status: npm >= 8 ? 'Sehat' : npm >= 4 ? 'Waspada' : 'Kritis',
      color: npm >= 8 ? 'emerald' : npm >= 4 ? 'amber' : 'rose',
      arti:
        npm >= 8
          ? `Dari setiap Rp 100.000 penjualan, pedagang mengantongi laba bersih Rp ${Math.round(npm * 1000).toLocaleString('id-ID')}. Efisiensi biaya sangat baik.`
          : npm >= 4
          ? 'Margin bersih cukup tipis. Perlu pengendalian biaya operasional atau evaluasi harga jual.'
          : 'Margin laba bersih terlalu rendah atau merugi. Beban operasional dan bunga memakan hampir seluruh laba kotor.'
    },
    {
      id: 'gpm',
      kategori: 'Profitabilitas',
      nama: 'Gross Profit Margin (GPM)',
      rumus: '(Omzet - HPP) / Omzet',
      nilai: `${gpm.toFixed(1)}%`,
      raw: gpm,
      targetText: 'Benchmark Ritel ≥ 15% | Produksi ≥ 30%',
      progress: Math.min(100, Math.max(0, (gpm / 45) * 100)),
      status: gpm >= 18 ? 'Sehat' : gpm >= 10 ? 'Waspada' : 'Kritis',
      color: gpm >= 18 ? 'emerald' : gpm >= 10 ? 'amber' : 'rose',
      arti: `Selisih harga jual dengan modal barang (HPP) adalah ${gpm.toFixed(1)}%. Menunjukkan daya tawar harga produk di pasar.`
    },
    {
      id: 'roe',
      kategori: 'Profitabilitas',
      nama: 'Return on Equity (ROE Tahunan)',
      rumus: '(Laba Bersih Setahun / Modal) x 100%',
      nilai: `${roeTahunan.toFixed(1)}%`,
      raw: roeTahunan,
      targetText: 'Ideal ≥ 15% / tahun',
      progress: Math.min(100, Math.max(0, (roeTahunan / 35) * 100)),
      status: roeTahunan >= 15 ? 'Sehat' : roeTahunan >= 8 ? 'Waspada' : 'Kritis',
      color: roeTahunan >= 15 ? 'emerald' : roeTahunan >= 8 ? 'amber' : 'rose',
      arti:
        roeTahunan >= 15
          ? 'Tingkat pengembalian modal sendiri sangat produktif, jauh di atas bunga deposito/inflasi.'
          : 'Perputaran hasil laba terhadap modal yang ditanamkan pemilik masih tergolong lambat.'
    },
    {
      id: 'der',
      kategori: 'Solvabilitas',
      nama: 'Debt to Equity Ratio (DER)',
      rumus: 'Total Utang / Modal Sendiri',
      nilai: `${der.toFixed(0)}%`,
      raw: der,
      targetText: 'Aman ≤ 100% (Maks 150%)',
      progress: Math.min(100, Math.max(0, 100 - ((der - 40) / 220) * 100)),
      status: der <= 100 ? 'Sehat' : der <= 160 ? 'Waspada' : 'Kritis',
      color: der <= 100 ? 'emerald' : der <= 160 ? 'amber' : 'rose',
      arti:
        der <= 100
          ? 'Modal sendiri pemilik lebih besar daripada total utang. Struktur permodalan usaha sangat kokoh.'
          : der <= 160
          ? 'Beban utang mulai melampaui modal sendiri. Tambahan utang baru harus digunakan murni untuk aset produktif.'
          : 'Over-leveraged! Usaha terlalu bergantung pada utang pihak ketiga dibandingkan modal pemilik.'
    },
    {
      id: 'inventory_days',
      kategori: 'Efisiensi Operasional',
      nama: 'Perputaran Stok (Inventory Days)',
      rumus: '(Persediaan / HPP Bulanan) x 30 Hari',
      nilai: `${Math.round(inventoryDays)} Hari`,
      raw: inventoryDays,
      targetText: 'Sembako ≤ 20 hr | Produksi ≤ 45 hr',
      progress: Math.min(100, Math.max(10, 100 - (inventoryDays / 75) * 100)),
      status: inventoryDays <= 30 ? 'Sehat' : inventoryDays <= 50 ? 'Waspada' : 'Kritis',
      color: inventoryDays <= 30 ? 'emerald' : inventoryDays <= 50 ? 'amber' : 'rose',
      arti:
        inventoryDays <= 30
          ? `Stok barang rata-rata terjual habis dan berganti uang kas setiap ${Math.round(inventoryDays)} hari sekali.`
          : inventoryDays <= 50
          ? `Barang tersimpan sekitar ${Math.round(inventoryDays)} hari sebelum terjual. Waspadai barang lambat laku (slow-moving).`
          : `Stok menumpuk terlalu lama (${Math.round(inventoryDays)} hari)! Banyak modal kerja membeku di gudang.`
    }
  ];

  // 8. Mesin Indikasi Kesehatan Perusahaan (Early Warning System & Actionable Insights)
  const kekuatan = [];
  const peringatan = [];
  const rekomendasi = [];

  // Analisis DSCR
  if (dscrBaru >= 1.6) {
    kekuatan.push({
      judul: 'Kapasitas Arus Kas Sangat Kuat (DSCR Tinggi)',
      detail: `Laba operasional bulanan (${formatRupiah(labaOperasional)}) mampu menutup total cicilan lama dan baru (${formatRupiah(totalCicilanSetelahKredit)}) hingga ${dscrBaru.toFixed(2)} kali lipat.`
    });
  } else if (dscrBaru < 1.25) {
    peringatan.push({
      judul: 'Beban Cicilan Melampaui Batas Aman (DSCR < 1.25x)',
      detail: `Dengan tambahan cicilan baru sebesar ${formatRupiah(cicilanBaru)}/bulan, rasio DSCR turun ke ${dscrBaru.toFixed(2)}x. Risiko gagal bayar tinggi apabila terjadi penurunan penjualan.`
    });
    rekomendasi.push({
      target: 'Struktur Kredit',
      saran: `Turunkan plafon pengajuan ke kisaran ${formatRupiah(rekomendasiPlafonAman)} atau perpanjang tenor pinjaman menjadi ${Math.min(60, tenorBulan + 12)} bulan agar cicilan bulanan lebih ringan.`
    });
  }

  // Analisis Likuiditas & Modal Kerja
  if (currentRatio >= 1.5 && quickRatio >= 0.9) {
    kekuatan.push({
      judul: 'Likuiditas Jangka Pendek Terjaga Baik',
      detail: `Ketersediaan kas dan aset lancar (${formatRupiah(asetLancar)}) sangat aman untuk melunasi kewajiban supplier jangka pendek.`
    });
  } else if (currentRatio < 1.1 || quickRatio < 0.6) {
    peringatan.push({
      judul: 'Ketidakseimbangan Likuiditas (Kas Ketat)',
      detail: `Quick Ratio berada di level ${quickRatio.toFixed(2)}x. Kas dan piutang tidak cukup menutup utang jangka pendek (${formatRupiah(utangJangkaPendek)}) tanpa menjual persediaan.`
    });
    rekomendasi.push({
      target: 'Manajemen Kas',
      saran: 'Negosiasikan perpanjangan tempo pembayaran ke supplier (Utang Dagang) dan tahan pembelian aset tetap secara tunai.'
    });
  }

  // Analisis Perputaran Persediaan & Piutang
  if (inventoryDays <= 25) {
    kekuatan.push({
      judul: 'Perputaran Barang Dagangan Cepat (Fast-Moving)',
      detail: `Rata-rata stok berubah menjadi penjualan dalam ${Math.round(inventoryDays)} hari, menandakan permintaan pasar yang aktif.`
    });
  } else if (inventoryDays > 40) {
    peringatan.push({
      judul: `Penumpukan Stok Barang (${Math.round(inventoryDays)} Hari)`,
      detail: `Persediaan sebesar ${formatRupiah(persediaan)} berputar terlalu lambat dibanding HPP bulanan. Modal kerja tidak produktif.`
    });
    rekomendasi.push({
      target: 'Operasional & Stok',
      saran: 'Lakukan promosi cuci gudang / bundling untuk mencairkan stok lama menjadi kas sebelum menambah utang modal kerja.'
    });
  }

  if (receivableDays > 20) {
    peringatan.push({
      judul: `Modal Tertahan di Piutang Pelanggan (${Math.round(receivableDays)} Hari)`,
      detail: `Piutang usaha mencapai ${formatRupiah(piutang)} (${((piutang / omzetBulanan) * 100).toFixed(0)}% dari omzet bulanan). Berisiko menjadi piutang macet.`
    });
    rekomendasi.push({
      target: 'Penagihan Piutang',
      saran: 'Terapkan syarat uang muka (DP minimal 30%-50%) untuk pesanan B2B/partai besar dan berikan diskon pembayaran tunai.'
    });
  }

  // Analisis Profitabilitas
  if (npm >= 10) {
    kekuatan.push({
      judul: `Margin Keuntungan Bersih Solid (${npm.toFixed(1)}%)`,
      detail: `Usaha mampu membukukan laba bersih ${formatRupiah(labaBersihSebelumKredit)}/bulan sebelum kredit baru, memberi ruang cadangan kas yang sehat.`
    });
  } else if (npm < 5) {
    peringatan.push({
      judul: `Margin Laba Bersih Sangat Tipis (${npm.toFixed(1)}%)`,
      detail: `Beban operasional (${formatRupiah(biayaOperasional)}) dan cicilan eksisting menggerus sebagian besar laba kotor usaha.`
    });
    rekomendasi.push({
      target: 'Efisiensi Biaya',
      saran: 'Evaluasi biaya tetap bulanan (sewa tempat, listrik, tenaga kerja) dan fokuskan penjualan pada produk dengan margin tertinggi.'
    });
  }

  // Analisis Leverage (DER)
  if (der <= 80) {
    kekuatan.push({
      judul: 'Struktur Permodalan Sehat (Beban Utang Rendah)',
      detail: `Rasio utang terhadap modal (DER) hanya ${der.toFixed(0)}%, menunjukkan kemandirian modal pemilik yang kuat.`
    });
  } else if (der > 150) {
    peringatan.push({
      judul: `Beban Utang Tinggi Terhadap Modal (DER ${der.toFixed(0)}%)`,
      detail: `Total utang (${formatRupiah(totalUtang)}) jauh melampaui ekuitas pemilik (${formatRupiah(modalEkuitas)}).`
    });
  }

  // Analisis SLIK & Kualitatif
  if (slikOjk === 1) {
    kekuatan.push({
      judul: 'Rekam Jejak Kredit Bersih (SLIK OJK Kol 1 - Lancar)',
      detail: 'Tidak pernah memiliki tunggakan pembayaran pokok maupun bunga di lembaga keuangan.'
    });
  } else if (slikOjk === 2) {
    peringatan.push({
      judul: 'Catatan SLIK OJK Kolektibilitas 2 (Dalam Perhatian Khusus)',
      detail: 'Terdapat riwayat keterlambatan pembayaran cicilan 1–90 hari. Analis kredit perlu memverifikasi penyebab keterlambatan.'
    });
  } else if (slikOjk >= 3) {
    peringatan.push({
      judul: `Red Flag Utama: SLIK OJK Kolektibilitas ${slikOjk} (Kredit Bermasalah)`,
      detail: 'Terdapat tunggakan kredit aktif di atas 90 hari. Mayoritas bank/lembaga keuangan akan menolak otomatis sebelum diselesaikan.'
    });
    rekomendasi.push({
      target: 'Restrukturisasi Utang',
      saran: 'Selesaikan tunggakan pinjaman eksisting dan mintakan Surat Keterangan Lunas sebelum mengajukan fasilitas kredit baru.'
    });
  }

  if (pencatatan === 'manual') {
    rekomendasi.push({
      target: 'Tata Kelola UMKM',
      saran: 'Mulai gunakan aplikasi kasir (POS) atau pencatatan pembukuan digital serta tingkatkan transaksi QRIS agar arus kas terekam di mutasi bank.'
    });
  }

  // Data Radar Chart untuk Visualisasi 5 Pilar Kesehatan UMKM
  const radarData = [
    { subject: 'Likuiditas', A: Math.round((scoreLiquidity / 15) * 100), fullMark: 100 },
    { subject: 'Profitabilitas', A: Math.round((scoreProfitability / 25) * 100), fullMark: 100 },
    { subject: 'Solvabilitas', A: Math.round((scoreSolvency / 20) * 100), fullMark: 100 },
    { subject: 'Kapasitas Kas (DSCR)', A: Math.round((scoreDscr / 25) * 100), fullMark: 100 },
    { subject: 'Efisiensi Stok', A: Math.round((scoreEfficiency / 15) * 100), fullMark: 100 },
    { subject: 'Karakter 5C', A: Math.round(totalQualitativeScore100), fullMark: 100 }
  ];

  // Data Bar Chart Arus Kas & Kapasitas Cicilan
  const cashflowChartData = [
    {
      name: 'Laba Kotor',
      Nominal: labaKotor,
      fill: '#6366f1'
    },
    {
      name: 'Laba Operasional',
      Nominal: labaOperasional,
      fill: '#10b981'
    },
    {
      name: 'Total Cicilan (Lama+Baru)',
      Nominal: totalCicilanSetelahKredit,
      fill: dscrBaru >= 1.25 ? '#f59e0b' : '#f43f5e'
    },
    {
      name: 'Sisa Kas Bersih',
      Nominal: Math.max(0, labaBersihSetelahKredit),
      fill: '#0ea5e9'
    }
  ];

  return {
    asetLancar,
    totalAset,
    totalUtang,
    modalEkuitas,
    labaKotor,
    labaOperasional,
    cicilanBaru,
    totalCicilanSetelahKredit,
    labaBersihSebelumKredit,
    labaBersihSetelahKredit,
    currentRatio,
    quickRatio,
    cashRatio,
    gpm,
    npm,
    npmAfter,
    roeTahunan,
    der,
    dar,
    dscrEksisting,
    dscrBaru,
    inventoryDays,
    receivableDays,
    scoreLiquidity,
    scoreProfitability,
    scoreSolvency,
    scoreDscr,
    scoreEfficiency,
    totalFinancialScore100,
    totalQualitativeScore100,
    compositeIndex100,
    finalCreditScore,
    grade,
    gradeLabel,
    gradeDesc,
    gradeColor,
    rekomendasiPlafonAman,
    kapasitasCicilanTotalAman,
    sisaKapasitasCicilanBaru,
    ratios,
    kekuatan,
    peringatan,
    rekomendasi,
    radarData,
    cashflowChartData
  };
}

/**
 * Fitur Simulasi Sensitivitas (Stress Testing)
 * Menguji ketahanan debitur saat terjadi guncangan penjualan, inflasi HPP, atau kenaikan suku bunga
 */
export function calculateStressTest(formData, { omzetDeltaPct = 0, hppDeltaPct = 0, bungaDeltaPct = 0 }) {
  const stressedOmzet = Math.max(0, (formData.omzetBulanan || 0) * (1 + omzetDeltaPct / 100));
  const stressedHpp = Math.max(0, (formData.hppBulanan || 0) * (1 + hppDeltaPct / 100));
  const stressedBunga = Math.max(0, (formData.bungaTahunan || 0) + bungaDeltaPct);

  const stressedFormData = {
    ...formData,
    omzetBulanan: stressedOmzet,
    hppBulanan: stressedHpp,
    bungaTahunan: stressedBunga
  };

  const baselineAnalysis = calculateFinancialAnalysis(formData);
  const stressedAnalysis = calculateFinancialAnalysis(stressedFormData);

  return {
    baseline: baselineAnalysis,
    stressed: stressedAnalysis,
    deltaScore: stressedAnalysis.finalCreditScore - baselineAnalysis.finalCreditScore,
    deltaDscr: stressedAnalysis.dscrBaru - baselineAnalysis.dscrBaru,
    deltaLaba: stressedAnalysis.labaBersihSetelahKredit - baselineAnalysis.labaBersihSetelahKredit,
    isStillFeasible: stressedAnalysis.dscrBaru >= 1.25 && stressedAnalysis.labaOperasional > 0
  };
}
