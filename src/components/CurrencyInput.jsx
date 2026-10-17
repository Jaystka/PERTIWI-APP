import React from 'react';

export default function CurrencyInput({
  label,
  value,
  onChange,
  helperText,
  highlight = false,
  tooltip = ''
}) {
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(rawValue ? parseInt(rawValue, 10) : 0);
  };

  const formattedDisplay = value ? new Intl.NumberFormat('id-ID').format(value) : '';

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5" title={tooltip}>
          {label}
        </span>
        {helperText && <span className="text-[11px] font-normal text-slate-400">{helperText}</span>}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-xs font-bold text-slate-400 select-none">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={formattedDisplay}
          onChange={handleChange}
          placeholder="0"
          className={`w-full pl-9 pr-3 py-2 text-sm font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 ${
            highlight
              ? 'border-indigo-300 bg-indigo-50/40 text-indigo-950 focus:ring-indigo-500 focus:border-indigo-500'
              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
        />
      </div>
    </div>
  );
}
