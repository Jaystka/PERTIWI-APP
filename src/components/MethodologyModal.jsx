import React, { useState } from 'react';
import { X, BookOpen, ShieldCheck, Scale, GraduationCap, Calculator, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function MethodologyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('regulasi'); // 'regulasi' | 'literatur' | 'threshold'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-white text-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Scale className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Landasan Regulasi & Metodologi Ilmiah</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                  Hybrid Credit Scoring
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kerangka acuan perbankan nasional (OJK & BI), standar akuntansi SAK EMKM, dan literatur akademik
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 rounded-lg p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('regulasi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'regulasi'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1. Regulasi OJK, BI & SAK</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('literatur')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'literatur'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>2. Literatur Akademik & Jurnal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('threshold')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'threshold'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>3. Ambang Batas & Rumus Anuitas</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* TAB 1: REGULASI PERBANKAN */}
          {activeTab === 'regulasi' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 leading-relaxed">
                Logika penentuan kelayakan kredit, status kolektibilitas, dan struktur laporan keuangan pada aplikasi PERTIWI FinScore mengacu langsung pada regulasi resmi perbankan nasional Republik Indonesia:
              </div>

              <div className="space-y-3.5">
                {/* Item 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      POJK Nomor 40/POJK.03/2019 tentang Penilaian Kualitas Aset Bank Umum
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      OJK
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-4">
                    <strong>Penerapan di Aplikasi:</strong> Menjadi dasar utama penilaian 3 pilar kelayakan kredit: <strong>Prospek Usaha</strong>, <strong>Kinerja Debitur (Performance)</strong>, dan <strong>Kemampuan Membayar (Repayment Capacity)</strong>. Aturan ini juga menjadi dasar klasifikasi <strong>Kolektibilitas 1 hingga 5</strong> (Lancar, DPK, Kurang Lancar, Diragukan, Macet) serta aturan <em>knock-out</em> (penalti otomatis jika debitur berstatus Kol 3–5).
                  </p>
                </div>

                {/* Item 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      POJK No. 18/POJK.03/2017 & POJK No. 11 Tahun 2024 (Pelaporan SLIK/iDeb)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      SLIK OJK
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-4">
                    <strong>Penerapan di Aplikasi:</strong> Menjadi dasar penggunaan variabel riwayat kredit historis (<em>Character</em>) pada tab Kualitatif 5C sebagai penentu apakah pengajuan kredit layak diproses lebih lanjut atau ditolak otomatis.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      POJK No. 43/POJK.04/2020 & Pedoman Biro Kredit (Pefindo / IdScore & CBI)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      Biro Kredit
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-4">
                    <strong>Penerapan di Aplikasi:</strong> Menjadi referensi transformasi skor tertimbang (skala 0–100) ke dalam rentang skor kredit standar industri biro kredit (<strong>300–850</strong> beserta pengelompokan tingkat risiko <strong>Grade A hingga D</strong>).
                  </p>
                </div>

                {/* Item 4 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM)
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      IAI
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-4">
                    <strong>Penerapan di Aplikasi:</strong> Menjadi acuan penyusunan struktur input <strong>Laporan Posisi Keuangan (Neraca)</strong> dan <strong>Laporan Laba Rugi</strong> yang disederhanakan khusus untuk skala UMKM, serta pemberian bobot nilai lebih pada UMKM yang memiliki pencatatan keuangan terstandar (POS/digital).
                  </p>
                </div>

                {/* Item 5 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      Peraturan Pemerintah (PP) No. 7 Tahun 2021 tentang Kemudahan & Perlindungan UMKM
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                      Pemerintah RI
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-4">
                    <strong>Penerapan di Aplikasi:</strong> Menjadi acuan pengelompokan skala modal dan omzet usaha pada skenario <em>preset</em> pedagang UMKM (Mikro, Kecil, dan Menengah).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LITERATUR AKADEMIK & JURNAL */}
          {activeTab === 'literatur' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 leading-relaxed">
                Algoritma penilaian kesehatan perusahaan dan deteksi <em>Red Flags</em> dalam aplikasi ini mengadaptasi model-model ilmiah empiris dari jurnal manajemen risiko dan perbankan internasional:
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 w-48">Model / Literatur</th>
                      <th className="py-2.5 px-3 w-40">Peneliti & Jurnal</th>
                      <th className="py-2.5 px-3">Konsep Teoretis & Penerapan dalam Rumus Aplikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-white">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        Altman Z-Score for Private & Non-Manufacturing Firms
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Edward I. Altman (1968; revisi 1995 & 2000)
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">
                        Model klasik prediksi kebangkrutan (<em>financial distress</em>). Diadaptasi ke dalam aplikasi melalui penggabungan indikator <strong>Modal Kerja thd Aset (Likuiditas)</strong>, <strong>Profitabilitas Operasional (EBITDA)</strong>, dan <strong>Solvabilitas (Ekuitas thd Total Kewajiban/DER)</strong> untuk mendeteksi apakah usaha berada di zona aman atau bahaya.
                      </td>
                    </tr>

                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        SME Default Prediction Model (Hybrid Model)
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Altman, E. I., & Sabato, G. (2007) – <em>Abacus Journal</em>
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">
                        Membuktikan bahwa laporan keuangan UMKM sering kali kurang lengkap (<em>opaque</em>), sehingga penggabungan <strong>rasio kas/profitabilitas (60%)</strong> dengan <strong>variabel kualitatif (40%)</strong> meningkatkan akurasi prediksi gagal bayar UMKM secara signifikan dibanding rasio akuntansi murni.
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        Relationship Lending & Soft Information in SME Scoring
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Berger, A. N., & Udell, G. F. (2006) – <em>Journal of Banking & Finance</em>
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">
                        Menjadi dasar pembobotan aspek kualitatif <strong>5C</strong>, seperti <strong>lama usaha berdiri (<em>business age/vintage</em>)</strong> dan transparansi arus kas, sebagai pengganti keterbatasan agunan fisik pada pedagang mikro-kecil.
                      </td>
                    </tr>

                    <tr className="bg-slate-50/50">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        Digital Footprint & Alternative Data Credit Scoring
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Berg, T., Burg, V., Gombović, A., & Puri, M. (2020) – <em>Review of Financial Studies</em>
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">
                        Menunjukkan bahwa jejak transaksi digital (<em>digital payment footprint</em>) berkorelasi kuat dengan rendahnya risiko gagal bayar. Diterapkan pada variabel <strong>Persentase Transaksi Non-Tunai (QRIS/Transfer)</strong> karena mutasi digital lebih valid dan sulit dimanipulasi dibanding klaim kas fisik.
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        Analisis Rasio Keuangan & Prinsip 5C Kredit UMKM
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        Kasmir (2019/2022) & Subramanyam – <em>Analisis Laporan Keuangan</em>
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed">
                        Menjadi rujukan rumus baku <strong>Current Ratio</strong>, <strong>Quick Ratio</strong>, <strong>DER</strong>, <strong>NPM</strong>, <strong>GPM</strong>, <strong>ROE</strong>, serta kerangka <strong>5C (Character, Capacity, Capital, Collateral, Condition)</strong> yang dipakai analis kredit bank umum (seperti penyaluran KUR & kredit modal kerja).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AMBANG BATAS & RUMUS MATEMATIKA */}
          {activeTab === 'threshold' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 leading-relaxed">
                Batas indikator warna <strong>Hijau (Sehat)</strong>, <strong>Kuning (Waspada)</strong>, dan <strong>Merah (Red Flag)</strong> pada aplikasi ini mengacu pada standar <em>Best Practice Commercial Credit Underwriting</em> perbankan Indonesia:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">
                    1. DSCR (Debt Service Coverage Ratio)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Batas Aman:</strong> &ge; 1.25x (Ideal &ge; 1.50x).<br />
                    <em>Sumber:</em> Standar Credit Risk Management perbankan nasional & Basel II/III SME. Bank mensyaratkan cadangan kas minimal 20%–25% di atas beban angsuran untuk mengantisipasi penurunan omzet musiman. Jika DSCR &lt; 1.0x, arus kas dipastikan defisit.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">
                    2. Current Ratio & Quick Ratio
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Batas Aman:</strong> Current Ratio 1.5x–2.0x; Quick Ratio &ge; 1.0x.<br />
                    <em>Sumber:</em> Subramanyam & Kasmir. Current Ratio &lt; 1.0x menandakan Net Working Capital negatif. Quick Ratio &lt; 0.5x mengindikasikan risiko likuiditas akut karena kas terkunci di persediaan barang dagangan.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">
                    3. Debt to Equity Ratio (DER)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Batas Aman:</strong> &le; 100% (Maksimal Peringatan 150%–200%).<br />
                    <em>Sumber:</em> Praktik leverage perbankan UMKM. Beban utang yang melebihi dua kali lipat modal sendiri (DER &gt; 200%) meningkatkan risiko kebangkrutan secara drastis saat terjadi penurunan penjualan.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">
                    4. Inventory Turnover Days
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Batas Aman:</strong> Sembako/Ritel &le; 30 hari; Manufaktur &le; 45–60 hari.<br />
                    <em>Sumber:</em> Working Capital Management (Cash Conversion Cycle). Semakin cepat persediaan berputar menjadi kas, semakin rendah kebutuhan utang modal kerja pedagang.
                  </p>
                </div>
              </div>

              {/* Formula Anuitas */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Rumus Matematika Keuangan: Rekomendasi Plafon Maksimal
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Perhitungan limit plafon kredit yang aman menggunakan rumus <strong>Nilai Sekarang Anuitas Biasa (Present Value of Ordinary Annuity)</strong> berdasarkan kapasitas angsuran kas aman bulanan (agar DSCR tetap &ge; 1.50x):
                </p>
                <div className="bg-white border border-indigo-200 p-3 rounded-lg text-center font-mono text-xs sm:text-sm text-indigo-700 font-bold overflow-x-auto shadow-2xs">
                  Plafon Maksimal = Kapasitas Angsuran Aman × [ (1 - (1 + r)^-n) / r ]
                </div>
                <p className="text-[11px] text-slate-500">
                  Di mana <em>r</em> adalah suku bunga efektif per bulan (bunga tahunan / 12) dan <em>n</em> adalah jangka waktu tenor pinjaman dalam bulan.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Sumber Terverifikasi: Otoritas Jasa Keuangan (OJK), Bank Indonesia, IAI & Jurnal Ilmiah Internasional.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
