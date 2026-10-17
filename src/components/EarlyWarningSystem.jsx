import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Info, ShieldAlert } from 'lucide-react';

export default function EarlyWarningSystem({ analysis }) {
  const { kekuatan = [], peringatan = [], rekomendasi = [] } = analysis;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Early Warning System: Diagnosis Kesehatan Usaha & Mitigasi Risiko</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Deteksi otomatis kekuatan struktural, red flags potensi kredit macet, dan langkah penyehatan usaha.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Indikasi Positif / Kekuatan */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kekuatan Finansial & Operasional ({kekuatan.length})</span>
          </div>

          {kekuatan.length === 0 ? (
            <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-emerald-100">
              Belum ditemukan indikator kekuatan finansial yang menonjol pada konfigurasi data saat ini.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {kekuatan.map((item, idx) => (
                <li key={idx} className="bg-white p-3 rounded-lg border border-emerald-100 shadow-2xs">
                  <div className="font-bold text-xs text-emerald-950 mb-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item.judul}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">{item.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Peringatan Dini / Red Flags */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Red Flags / Indikasi Kurang Sehat ({peringatan.length})</span>
          </div>

          {peringatan.length === 0 ? (
            <div className="bg-white p-3.5 rounded-lg border border-emerald-200 text-xs text-emerald-800 font-medium">
              🎉 <strong>Kondisi Prima:</strong> Tidak ditemukan Red Flag kritis! Seluruh indikator likuiditas, margin keuntungan, dan kapasitas bayar berada dalam rentang aman.
            </div>
          ) : (
            <ul className="space-y-2.5">
              {peringatan.map((item, idx) => (
                <li key={idx} className="bg-white p-3 rounded-lg border border-rose-100 shadow-2xs">
                  <div className="font-bold text-xs text-rose-950 mb-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{item.judul}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-3">{item.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Actionable Insights / Rekomendasi Tindakan */}
      {rekomendasi.length > 0 && (
        <div className="rounded-xl bg-slate-900 text-white p-4 sm:p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Rekomendasi Penyehatan Usaha & Solusi bagi Analis Kredit</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rekomendasi.map((rek, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 mb-1">
                  {rek.target}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{rek.saran}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
