import React from 'react';
import { Activity, Info } from 'lucide-react';

export default function RatioGrid({ ratios }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Matriks 7 Rasio Finansial & Indikator Kinerja Usaha</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kombinasi analisis likuiditas, efisiensi modal kerja, profitabilitas, leverage, dan kapasitas bayar pinjaman.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sehat
          </span>
          <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Waspada
          </span>
          <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Kritis
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratios.map((item) => {
          const badgeStyle =
            item.color === 'emerald'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : item.color === 'amber'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-rose-100 text-rose-800 border-rose-200';

          const barColor =
            item.color === 'emerald'
              ? 'bg-emerald-500'
              : item.color === 'amber'
              ? 'bg-amber-500'
              : 'bg-rose-500';

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all bg-slate-50/40 hover:bg-white flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {item.kategori}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between my-1">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.nama}</h4>
                  <span className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {item.nilai}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span className="truncate pr-1">Rumus: {item.rumus}</span>
                  <span className="font-medium text-slate-600 whitespace-nowrap">{item.targetText}</span>
                </div>

                {/* Progress Bar Benchmark */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.max(8, Math.min(100, item.progress))}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/70">
                  {item.arti}
                </p>
                {item.referensi && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                    <span className="font-semibold text-slate-500">Acuan:</span>
                    <span className="truncate text-indigo-600/80 font-medium">{item.referensi}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
