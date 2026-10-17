import React from 'react';
import { PRESETS } from '../data/presets';
import { ChevronRight, RefreshCw, Sparkles } from 'lucide-react';

export default function PresetCards({ selectedPreset, onSelectPreset, onResetCurrent }) {
  const badgeStyles = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Preset Profil Realistis UMKM Indonesia</span>
        </h2>
        {selectedPreset === 'custom' && (
          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
            Mode Kustom Aktif (Data Dimodifikasi)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.values(PRESETS).map((preset) => {
          const IconComponent = preset.icon;
          const isSelected = selectedPreset === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
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

                <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1">{preset.namaUsaha}</h3>
                <span className="text-[11px] font-medium text-slate-500 block mb-1.5">{preset.sektor}</span>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{preset.deskripsi}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Pemilik: <strong className="text-slate-700 font-semibold">{preset.pemilik}</strong></span>
                <span className={`font-semibold flex items-center ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {isSelected ? 'Aktif' : 'Pilih'} <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
