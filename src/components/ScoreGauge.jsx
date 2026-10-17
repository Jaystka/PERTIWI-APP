import React from 'react';
import { Award, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function ScoreGauge({ analysis }) {
  const {
    finalCreditScore,
    grade,
    gradeLabel,
    gradeDesc,
    gradeColor,
    totalFinancialScore100,
    totalQualitativeScore100
  } = analysis;

  // Skor 300 s/d 850 (range 550)
  const scorePercent = Math.max(0, Math.min(100, ((finalCreditScore - 300) / 550) * 100));
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scorePercent / 100) * circumference;

  const colorThemes = {
    emerald: {
      ring: 'text-emerald-500',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      text: 'text-emerald-600',
      bgGlow: 'from-emerald-500/15 via-emerald-500/5 to-transparent'
    },
    indigo: {
      ring: 'text-indigo-600',
      badge: 'bg-indigo-50 text-indigo-800 border-indigo-300',
      text: 'text-indigo-600',
      bgGlow: 'from-indigo-500/15 via-indigo-500/5 to-transparent'
    },
    amber: {
      ring: 'text-amber-500',
      badge: 'bg-amber-50 text-amber-800 border-amber-300',
      text: 'text-amber-600',
      bgGlow: 'from-amber-500/15 via-amber-500/5 to-transparent'
    },
    rose: {
      ring: 'text-rose-500',
      badge: 'bg-rose-50 text-rose-800 border-rose-300',
      text: 'text-rose-600',
      bgGlow: 'from-rose-500/15 via-rose-500/5 to-transparent'
    }
  };

  const theme = colorThemes[gradeColor] || colorThemes.indigo;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Background Glow */}
      <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${theme.bgGlow} blur-2xl pointer-events-none`} />

      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Skor Kelayakan Kredit (FICO Scale)</span>
          </span>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${theme.badge}`}>
            Grade {grade} • {gradeLabel}
          </span>
        </div>

        {/* Circular Gauge Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-2">
          <div className="relative w-40 h-40 flex items-center justify-center select-none">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="text-slate-100"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="90"
                cy="90"
                r={radius}
                className={`${theme.ring} transition-all duration-1000 ease-out`}
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                {finalCreditScore}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                Skala 300 - 850
              </span>
              <span className={`text-[11px] font-extrabold mt-0.5 ${theme.text}`}>
                {scorePercent.toFixed(0)}% Indeks
              </span>
            </div>
          </div>

          {/* Breakdown Bobot */}
          <div className="w-full sm:w-56 space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Kuantitatif Finansial (60%)</span>
                <span className="font-bold text-slate-900">{totalFinancialScore100} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${totalFinancialScore100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Kualitatif Karakter 5C (40%)</span>
                <span className="font-bold text-slate-900">{totalQualitativeScore100} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${totalQualitativeScore100}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              {gradeDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Decision Footer Banner */}
      <div className={`mt-3 p-3 rounded-xl border flex items-center gap-3 text-xs ${theme.badge}`}>
        {grade === 'A' || grade === 'B' ? (
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
        ) : grade === 'C' ? (
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
        ) : (
          <XCircle className="w-5 h-5 shrink-0 text-rose-600" />
        )}
        <div className="leading-snug">
          <strong className="block font-bold">
            {grade === 'A'
              ? 'Rekomendasi: Disetujui Penuh (Fasilitas Prioritas)'
              : grade === 'B'
              ? 'Rekomendasi: Disetujui Sesuai Limit Plafon Aman'
              : grade === 'C'
              ? 'Rekomendasi: Disetujui Bersyarat (Agunan Tambahan / Penyesuaian Tenor)'
              : 'Rekomendasi: Pengajuan Ditolak Sementara (Restrukturisasi Utang)'}
          </strong>
          <span className="text-[11px] opacity-90">{gradeDesc}</span>
        </div>
      </div>
    </div>
  );
}
