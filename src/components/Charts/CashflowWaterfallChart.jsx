import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { formatSingkatRupiah, formatRupiah } from '../../utils/formatters';
import { BarChart3 } from 'lucide-react';

export default function CashflowWaterfallChart({ cashflowChartData, dscrBaru }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Arus Kas & Beban Angsuran Bulanan</span>
        </span>
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
            dscrBaru >= 1.5
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          DSCR: {dscrBaru.toFixed(2)}x
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-3">
        Membandingkan kemampuan laba operasional dalam menyerap total cicilan utang baru dan sisa kas bersih pedagang.
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashflowChartData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={10}
              interval={0}
              angle={-10}
              textAnchor="end"
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickFormatter={(val) => formatSingkatRupiah(val)}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [formatRupiah(value), 'Nominal']}
              contentStyle={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
                fontWeight: 600
              }}
            />
            <Bar dataKey="Nominal" radius={[6, 6, 0, 0]}>
              {cashflowChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" /> Laba Kotor
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Laba Operasional
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Cicilan Utang
          </span>
        </div>
        <span className="font-semibold text-slate-700">Arus Kas Bulanan</span>
      </div>
    </div>
  );
}
