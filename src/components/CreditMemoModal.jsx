import React from 'react';
import { generateCreditNarrative } from '../utils/creditNarrative';
import { formatRupiah, formatRatio, formatPercent } from '../utils/formatters';
import { X, Printer, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function CreditMemoModal({ isOpen, onClose, formData, analysis }) {
  if (!isOpen) return null;

  const narrative = generateCreditNarrative(formData, analysis);
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const docNumber = `MEMO/UMKM/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="bg-white text-slate-800 px-6 py-3.5 flex items-center justify-between no-print shrink-0 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-sm text-slate-900">Pratinjau Memorandum Analisis Kredit</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 rounded-lg p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-800 text-xs leading-normal font-sans bg-white">
          {/* Header Lembaga / FinTech */}
          <div className="border-b-2 border-slate-800 pb-4 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-black text-xl">
                <ShieldCheck className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-base font-black text-slate-900 uppercase tracking-tight">
                  PERTIWI FINANCING & CREDIT ANALYTICS
                </h1>
                <p className="text-[11px] text-slate-600 font-medium">
                  Komite Penilai Kelayakan Pembiayaan & Analisis Risiko Usaha Mikro Kecil Menengah
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Dokumen Resmi Analisis Kredit • Terverifikasi Mesin Credit Scoring v2.5
                </p>
              </div>
            </div>
            <div className="text-right text-[11px]">
              <div className="font-bold text-slate-900">No. Dokumen: {docNumber}</div>
              <div className="text-slate-500">Tanggal Telaah: {todayStr}</div>
              <div className="text-indigo-600 font-semibold">Status: RAHASIA / CONFIDENTIAL</div>
            </div>
          </div>

          <div className="text-center py-1">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 underline underline-offset-4">
              MEMORANDUM KELAYAKAN PEMBIAYAAN USAHA (SPK)
            </h2>
          </div>

          {/* 1. Ringkasan Pengajuan & Profil Debitur */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                A. Identitas Calon Debitur
              </span>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="text-slate-500 py-0.5 w-32">Nama Usaha</td>
                    <td className="font-bold text-slate-900">: {formData.namaUsaha || '-'}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Nama Pemilik</td>
                    <td className="font-semibold text-slate-800">: {formData.pemilik || '-'}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Sektor Industri</td>
                    <td className="text-slate-700">: {formData.sektor || '-'}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Lama Beroperasi</td>
                    <td className="text-slate-700">: {formData.lamaUsaha} Tahun</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Status Tempat Usaha</td>
                    <td className="text-slate-700">: {formData.statusTempat === 'milik_sendiri' ? 'Milik Sendiri' : 'Sewa / Kontrak'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                B. Fasilitas yang Dimohon
              </span>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="text-slate-500 py-0.5 w-36">Plafon Pengajuan</td>
                    <td className="font-bold text-slate-900">: {formatRupiah(formData.plafonDiajukan)}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Tenor Dimohon</td>
                    <td className="font-semibold text-slate-800">: {formData.tenorBulan} Bulan</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Suku Bunga Ekspektasi</td>
                    <td className="text-slate-700">: {formData.bungaTahunan}% per tahun</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Perkiraan Angsuran</td>
                    <td className="font-bold text-indigo-700">: {formatRupiah(analysis.cicilanBaru)} / bulan</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Kolektibilitas SLIK</td>
                    <td className="font-bold text-slate-800">: Kol {formData.slikOjk}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Keputusan & Rekomendasi Komite */}
          <div className="p-3.5 rounded-lg border border-indigo-200 bg-indigo-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-indigo-900">
                C. Rekomendasi & Keputusan Komite Pembiayaan
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${narrative.statusBadge}`}>
                {narrative.keputusan}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="text-[10px] text-slate-400 block">Skor Kredit</span>
                <span className="text-sm font-black text-slate-900">{analysis.finalCreditScore}</span>
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="text-[10px] text-slate-400 block">Grade Kategori</span>
                <span className="text-sm font-black text-indigo-700">Grade {analysis.grade}</span>
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="text-[10px] text-slate-400 block">Plafon Rekomendasi</span>
                <span className="text-sm font-black text-emerald-700">
                  {formatRupiah(narrative.rekomendasiPlafonFinal)}
                </span>
              </div>
              <div className="bg-white p-2 rounded border border-indigo-100">
                <span className="text-[10px] text-slate-400 block">Proyeksi DSCR</span>
                <span className="text-sm font-black text-slate-900">{analysis.dscrBaru.toFixed(2)}x</span>
              </div>
            </div>
          </div>

          {/* 3. Ringkasan Eksekutif Naratif */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              D. Ringkasan Telaah Analis (Executive Credit Summary)
            </span>
            <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed text-justify">
              {narrative.executiveSummary}
            </p>
          </div>

          {/* 4. Matriks Evaluasi Prinsip 5C */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              E. Penilaian Komprehensif Prinsip 5C
            </span>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 w-40">Pilar 5C</th>
                    <th className="py-2 px-3">Ulasan Hasil Verifikasi Lapangan & Analisis Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {narrative.fiveCEvaluation.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-bold text-slate-800">{item.pilar}</td>
                      <td className="py-2 px-3 text-slate-600 leading-relaxed">{item.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Ikhtisar Keuangan & Rasio Kunci */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                F. Posisi Neraca & Laba Rugi
              </span>
              <table className="w-full text-[11px]">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-1 text-slate-500">Total Aset Lancar</td>
                    <td className="py-1 text-right font-bold">{formatRupiah(analysis.asetLancar)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">Total Liabilitas (Utang)</td>
                    <td className="py-1 text-right font-bold">{formatRupiah(analysis.totalUtang)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">Omzet Bulanan</td>
                    <td className="py-1 text-right font-bold">{formatRupiah(formData.omzetBulanan)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">Laba Operasional (EBITDA)</td>
                    <td className="py-1 text-right font-bold text-emerald-700">{formatRupiah(analysis.labaOperasional)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                G. Matriks Rasio Utama
              </span>
              <table className="w-full text-[11px]">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-1 text-slate-500">Current Ratio (Likuiditas)</td>
                    <td className="py-1 text-right font-bold">{analysis.currentRatio.toFixed(2)}x</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">DSCR Pasca Kredit Baru</td>
                    <td className="py-1 text-right font-bold text-indigo-700">{analysis.dscrBaru.toFixed(2)}x</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">Net Profit Margin (NPM)</td>
                    <td className="py-1 text-right font-bold">{formatPercent(analysis.npm)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-500">Debt to Equity Ratio (DER)</td>
                    <td className="py-1 text-right font-bold">{analysis.der.toFixed(0)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* H. Dasar Hukum & Metodologi Penilaian */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 uppercase block">
              H. Dasar Hukum & Rujukan Metodologi Penilaian Kredit
            </span>
            <p className="leading-relaxed">
              Analisis kelayakan kredit ini disusun berdasarkan regulasi perbankan Republik Indonesia: <strong>POJK No. 40/POJK.03/2019</strong> (Penilaian Kualitas Aset & Repayment Capacity), <strong>POJK No. 18/POJK.03/2017 & POJK No. 11/2024</strong> (SLIK OJK), <strong>SAK EMKM (Ikatan Akuntan Indonesia)</strong>, serta mengadaptasi model ilmiah <strong>Hybrid Credit Scoring Altman & Sabato (2007)</strong> dan <strong>Digital Footprint Berg et al. (2020)</strong>.
            </p>
          </div>

          {/* 6. Kolom Tanda Tangan Komite & Persetujuan */}
          <div className="pt-4 border-t border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-3 text-center">
              Lembar Otorisasi & Keputusan Komite Pembiayaan
            </span>
            <div className="grid grid-cols-3 gap-6 text-center text-xs">
              <div className="space-y-12">
                <span className="text-slate-500 font-medium">Diajukan Oleh: (Analis Kredit)</span>
                <div>
                  <div className="border-b border-slate-400 w-3/4 mx-auto mb-1" />
                  <span className="font-bold text-slate-800">Credit Analyst / RM</span>
                </div>
              </div>

              <div className="space-y-12">
                <span className="text-slate-500 font-medium">Diverifikasi & Disetujui:</span>
                <div>
                  <div className="border-b border-slate-400 w-3/4 mx-auto mb-1" />
                  <span className="font-bold text-slate-800">Unit Head / Komite Kredit</span>
                </div>
              </div>

              <div className="space-y-12">
                <span className="text-slate-500 font-medium">Mengetahui Debitur:</span>
                <div>
                  <div className="border-b border-slate-400 w-3/4 mx-auto mb-1" />
                  <span className="font-bold text-slate-800">{formData.pemilik || 'Calon Debitur'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar (Hidden in Print) */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between no-print shrink-0">
          <span className="text-[11px] text-slate-500">
            💡 Tips: Gunakan opsi cetak browser untuk menyimpan langsung sebagai dokumen PDF berformat A4.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
