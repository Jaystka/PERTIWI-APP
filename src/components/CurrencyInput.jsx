import React from 'react';
import { formatSingkatRupiah } from '../utils/formatters';
import { HelpCircle } from 'lucide-react';

export default function CurrencyInput({
  label,
  value,
  onChange,
  helperText,
  highlight = false,
  tooltip = '',
  quickChips = [], // Contoh: [10000000, 25000000, 50000000] atau [{ label: '+10 Jt', delta: 10000000 }]
  warning = ''
}) {
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue ? parseInt(rawValue, 10) : 0);
  };

  const formattedDisplay = value ? new Intl.NumberFormat('id-ID').format(value) : '';
  const singkatText = value > 0 ? formatSingkatRupiah(value) : null;

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          {tooltip && (
            <span
              className="text-slate-400 hover:text-indigo-600 cursor-help transition-colors"
              title={tooltip}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </label>
        {helperText && (
          <span className="text-[11px] text-slate-400 font-normal">{helperText}</span>
        )}
      </div>

      <div className="relative flex items-center">
        <span className="absolute left-3 text-xs font-bold text-slate-400 select-none">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={formattedDisplay}
          onChange={handleChange}
          placeholder="0"
          className={`w-full pl-9 ${singkatText ? 'pr-20' : 'pr-3'} py-2 text-sm font-semibold rounded-xl border transition-all focus:outline-none focus:ring-2 ${
            warning
              ? 'border-amber-300 bg-amber-50/30 text-amber-950 focus:ring-amber-500'
              : highlight
              ? 'border-indigo-300 bg-indigo-50/40 text-indigo-950 focus:ring-indigo-500 focus:border-indigo-500'
              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs'
          }`}
        />
        {singkatText && (
          <span className="absolute right-3 text-[11px] font-bold text-indigo-600/80 bg-indigo-50/80 px-2 py-0.5 rounded-md pointer-events-none border border-indigo-100">
            {singkatText}
          </span>
        )}
      </div>

      {/* Quick Chips Selection */}
      {quickChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          <span className="text-[10px] text-slate-400 font-medium mr-1">Pintas:</span>
          {quickChips.map((chip, idx) => {
            const isDelta = typeof chip === 'object' && chip.delta !== undefined;
            const labelText = isDelta ? chip.label : formatSingkatRupiah(chip);
            const targetVal = isDelta ? (value || 0) + chip.delta : chip;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(Math.max(0, targetVal))}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 transition-colors"
              >
                {labelText}
              </button>
            );
          })}
        </div>
      )}

      {/* Inline Warning Text */}
      {warning && (
        <span className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
          ⚠️ {warning}
        </span>
      )}
    </div>
  );
}
