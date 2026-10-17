import { formatRupiah, formatRatio, formatPercent } from './formatters';

/**
 * Generator narasi evaluasi kredit UMKM otomatis untuk komite kredit / analis perbankan
 */
export function generateCreditNarrative(formData, analysis) {
  const {
    namaUsaha,
    pemilik,
    sektor,
    plafonDiajukan,
    tenorBulan,
    bungaTahunan,
    slikOjk,
    lamaUsaha
  } = formData;

  const {
    finalCreditScore,
    grade,
    gradeLabel,
    dscrBaru,
    currentRatio,
    npm,
    rekomendasiPlafonAman,
    cicilanBaru,
    totalCicilanSetelahKredit,
    labaOperasional
  } = analysis;

  // 1. Keputusan Komite
  let keputusan = 'DISETUJUI PENUH';
  let statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let rekomendasiPlafonFinal = plafonDiajukan;

  if (grade === 'A') {
    keputusan = 'DISETUJUI PENUH (PRIME BORROWER)';
    statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    rekomendasiPlafonFinal = plafonDiajukan;
  } else if (grade === 'B') {
    if (plafonDiajukan > rekomendasiPlafonAman) {
      keputusan = 'DISETUJUI DENGAN PENYESUAIAN PLAFON';
      statusBadge = 'bg-indigo-100 text-indigo-800 border-indigo-300';
      rekomendasiPlafonFinal = Math.min(plafonDiajukan, Math.round(rekomendasiPlafonAman / 1000000) * 1000000);
    } else {
      keputusan = 'DISETUJUI SESUAI PENGAJUAN';
      statusBadge = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  } else if (grade === 'C') {
    keputusan = 'PERTIMBANGKAN DENGAN MITIGASI / AGUNAN TAMBAHAN';
    statusBadge = 'bg-amber-100 text-amber-800 border-amber-300';
    rekomendasiPlafonFinal = Math.min(plafonDiajukan, Math.round(rekomendasiPlafonAman / 1000000) * 1000000);
  } else {
    keputusan = 'TIDAK DIREKOMENDASIKAN / DITOLAK SEMENTARA';
    statusBadge = 'bg-rose-100 text-rose-800 border-rose-300';
    rekomendasiPlafonFinal = 0;
  }

  // 2. Ringkasan Eksekutif Naratif
  const executiveSummary = `Berdasarkan telaah finansial kuantitatif (bobot 60%) dan kualitatif 5C (bobot 40%), usaha "${namaUsaha}" milik ${pemilik} yang bergerak di sektor ${sektor} memperoleh skor kredit ${finalCreditScore} dari skala 850 (Grade ${grade} - ${gradeLabel}). Usaha telah beroperasi selama ${lamaUsaha} tahun dengan riwayat kolektibilitas SLIK OJK Kol-${slikOjk}. Kemampuan membayar angsuran pasca kredit baru terproyeksi pada rasio DSCR sebesar ${formatRatio(dscrBaru)}, dengan perkiraan cicilan baru ${formatRupiah(cicilanBaru)} per bulan pada tingkat suku bunga ${bungaTahunan}% p.a.`;

  // 3. Evaluasi 5C
  const fiveCEvaluation = [
    {
      pilar: 'Character (Karakter)',
      keterangan: slikOjk === 1 
        ? 'Rekam jejak SLIK OJK Kol-1 Lancar tanpa histori gagal bayar. Integritas debitur dinilai sangat baik.'
        : slikOjk === 2
        ? 'Riwayat SLIK OJK Kol-2 (Dalam Perhatian Khusus). Perlu klarifikasi penyebab keterlambatan masa lalu.'
        : `SLIK OJK Kolektibilitas ${slikOjk} (NPL aktif). Mengindikasikan risiko moral hazard / kesulitan likuiditas berat.`
    },
    {
      pilar: 'Capacity (Kapasitas Membayar)',
      keterangan: `Laba operasional bulanan tercatat ${formatRupiah(labaOperasional)} menghasilkan DSCR ${formatRatio(dscrBaru)} terhadap total angsuran bulanan ${formatRupiah(totalCicilanSetelahKredit)}. Sisa kapasitas angsuran aman berkisar ${formatRupiah(analysis.sisaKapasitasCicilanBaru)}/bulan.`
    },
    {
      pilar: 'Capital (Struktur Permodalan)',
      keterangan: `Ekuitas modal sendiri tercatat ${formatRupiah(analysis.modalEkuitas)} dengan rasio solvabilitas DER sebesar ${formatPercent(analysis.der, 0)}. ${analysis.der <= 100 ? 'Struktur permodalan tergolong sehat dan mandiri.' : 'Beban utang relatif mendominasi struktur neraca.'}`
    },
    {
      pilar: 'Condition (Kondisi Usaha & Sektor)',
      keterangan: `Margin keuntungan bersih (NPM) berada di angka ${formatPercent(npm)}. Perputaran stok persediaan rata-rata ${Math.round(analysis.inventoryDays)} hari dan perputaran piutang ${Math.round(analysis.receivableDays)} hari.`
    },
    {
      pilar: 'Collateral (Aset & Tempat Usaha)',
      keterangan: `Aset tetap yang dimiliki bernilai ${formatRupiah(formData.asetTetap)}. Tempat usaha berstatus "${formData.statusTempat === 'milik_sendiri' ? 'Milik Sendiri' : 'Sewa/Kontrak'}" dengan proporsi transaksi digital QRIS sekitar ${formData.persenDigital}%.`
    }
  ];

  return {
    keputusan,
    statusBadge,
    rekomendasiPlafonFinal,
    executiveSummary,
    fiveCEvaluation
  };
}
