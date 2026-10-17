import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { Layers } from 'lucide-react';

export default function RadarDimensionChart({ radarData }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Radar 5 Pilar Kesehatan Finansial & 5C</span>
        </span>
        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
          Skor 0 - 100
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-3">
        Pemetaan multi-dimensi likuiditas, efisiensi persediaan, solvabilitas, profit, kapasitas bayar, dan karakter debitur.
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 9 }} />
            <Radar
              name="Skor UMKM"
              dataKey="A"
              stroke="#4f46e5"
              fill="#6366f1"
              fillOpacity={0.45}
            />
            <Tooltip
              formatter={(value) => [`${value} Poin`, 'Nilai Capaian']}
              contentStyle={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Area Luas = Profil Risiko Rendah</span>
        <span className="font-semibold text-indigo-600">Benchmark Sehat ≥ 70 Poin</span>
      </div>
    </div>
  );
}
