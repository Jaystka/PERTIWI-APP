import React from 'react';
import { PRESETS } from '../data/presets';
import { Check, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

export default function PresetCards({ selectedPreset, onSelectPreset }) {
  const badgeStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pilih Simulasi Kasus Nyata UMKM</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Pilih salah satu profil pedagang di bawah ini untuk melihat contoh analisis kesehatan finansial langsung:
          </p>
        </div>

        {selectedPreset === 'custom' && (
          <span className="self-start sm:self-auto text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 shadow-2xs">
            ✍️ Mode Kustom (Data Telah Diubah)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.values(PRESETS).map((preset) => {
          const IconComponent = preset.icon;
          const isSelected = selectedPreset === preset.id;

          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-md transform -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      badgeStyles[preset.badgeColor] || badgeStyles.indigo
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight line-clamp-1">
                  {preset.namaUsaha}
                </h3>
                <span className="text-[11px] font-semibold text-indigo-600/90 block mb-1">
                  {preset.sektor}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {preset.deskripsi}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Pemilik: <strong className="text-slate-700 font-semibold">{preset.pemilik}</strong>
                </span>

                <span
                  className={`font-bold flex items-center gap-1 text-[11px] ${
                    isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" /> Aktif
                    </>
                  ) : (
                    <>
                      Pilih <ArrowRight className="w-3 h-3 ml-0.5" />
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
