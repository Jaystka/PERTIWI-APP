import React from 'react';
import { formatRupiah } from '../utils/formatters';
import { Wallet, Scale, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PlafonCard({ formData, analysis }) {
  const { plafonDiajukan } = formData;
  const { rekomendasiPlafonAman, sisaKapasitasCicilanBaru, cicilanBaru } = analysis;

  const isSafe = plafonDiajukan <= (rekomendasiPlafonAman * 1.05); // toleransi 5%
  const ratioPlafon = rekomendasiPlafonAman > 0 ? (plafonDiajukan / rekomendasiPlafonAman) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Kapasitas Plafon & Toleransi Risiko</span>
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isSafe
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {isSafe ? 'Plafon Dalam Batas Aman' : 'Melebihi Kapasitas'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          {/* Plafon Diajukan */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Plafon Diajukan Debitur
            </span>
            <span className="text-xl font-black text-slate-900 block">
              {formatRupiah(plafonDiajukan)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Cicilan: {formatRupiah(cicilanBaru)} / bln
            </span>
          </div>

          {/* Rekomendasi Plafon Maksimal */}
          <div
            className={`p-4 rounded-xl border ${
              isSafe
                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/50 border-amber-200 text-amber-950'
            }`}
          >
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Plafon Maksimal Aman (DSCR ≥ 1.5x)
            </span>
            <span className="text-xl font-black text-emerald-700 block">
              {formatRupiah(rekomendasiPlafonAman)}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Sisa Kapasitas Cicilan: {formatRupiah(sisaKapasitasCicilanBaru)} / bln
            </span>
          </div>
        </div>

        {/* Progress perbandingan */}
        <div className="my-3 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Rasio Pengajuan thd Kapasitas Maksimal</span>
            <span className={isSafe ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
              {ratioPlafon.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isSafe ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, ratioPlafon)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
        {isSafe ? (
          <span>
            ✅ <strong>Arus kas memadai:</strong> Usaha memiliki bantalan laba operasional yang cukup untuk membayar cicilan tanpa mengganggu operasional belanja stok harian.
          </span>
        ) : (
          <span>
            ⚠️ <strong>Saran Penyesuaian:</strong> Pengajuan pinjaman melampaui kemampuan kas aman. Disarankan menurunkan plafon menjadi <strong>{formatRupiah(rekomendasiPlafonAman)}</strong> atau memperpanjang tenor kredit.
          </span>
        )}
      </div>
    </div>
  );
}
