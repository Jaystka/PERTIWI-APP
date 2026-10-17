import React, { useState, useMemo } from 'react';
import { calculateStressTest } from '../utils/financialEngine';
import { formatRupiah, formatRatio } from '../utils/formatters';
import { X, Sliders, AlertTriangle, CheckCircle2, TrendingDown, Percent, RotateCcw } from 'lucide-react';

export default function StressTestModal({ isOpen, onClose, formData }) {
  const [omzetDeltaPct, setOmzetDeltaPct] = useState(-15);
  const [hppDeltaPct, setHppDeltaPct] = useState(5);
  const [bungaDeltaPct, setBungaDeltaPct] = useState(0);

  const stressResult = useMemo(() => {
    return calculateStressTest(formData, {
      omzetDeltaPct,
      hppDeltaPct,
      bungaDeltaPct
    });
  }, [formData, omzetDeltaPct, hppDeltaPct, bungaDeltaPct]);

  if (!isOpen) return null;

  const handleReset = () => {
    setOmzetDeltaPct(-15);
    setHppDeltaPct(5);
    setBungaDeltaPct(0);
  };

  const { baseline, stressed, deltaScore, deltaDscr, deltaLaba, isStillFeasible } = stressResult;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Simulator Sensitivitas & Stress Testing</h3>
              <p className="text-[11px] text-slate-400">
                Uji daya tahan arus kas nasabah terhadap potensi krisis penjualan dan inflasi biaya
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders Input */}
        <div className="p-6 space-y-5">
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {/* Slider 1: Penurunan Omzet */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                  <span>Skenario Perubahan Omzet Penjualan</span>
                </span>
                <span className={`font-bold px-2 py-0.5 rounded ${omzetDeltaPct < 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {omzetDeltaPct > 0 ? `+${omzetDeltaPct}%` : `${omzetDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-40"
                max="10"
                step="5"
                value={omzetDeltaPct}
                onChange={(e) => setOmzetDeltaPct(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-40% (Krisis Berat)</span>
                <span>-15% (Penurunan Wajar)</span>
                <span>0% (Stabil)</span>
                <span>+10% (Tumbuh)</span>
              </div>
            </div>

            {/* Slider 2: Kenaikan HPP */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-amber-500" />
                  <span>Kenaikan Harga Bahan Baku / Kulakan (HPP)</span>
                </span>
                <span className="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  +{hppDeltaPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="5"
                value={hppDeltaPct}
                onChange={(e) => setHppDeltaPct(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0% (Tetap)</span>
                <span>+10% (Inflasi Ringan)</span>
                <span>+25% (Lonjakan Bahan Baku)</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* DSCR Comparison */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Rasio DSCR
              </span>
              <div className="text-xs text-slate-400 line-through">
                {baseline.dscrBaru.toFixed(2)}x
              </div>
              <div className={`text-base font-black ${stressed.dscrBaru >= 1.25 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {stressed.dscrBaru.toFixed(2)}x
              </div>
              <span className="text-[10px] text-slate-500 block">
                ({deltaDscr >= 0 ? '+' : ''}{deltaDscr.toFixed(2)}x)
              </span>
            </div>

            {/* Score Comparison */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Skor Kredit
              </span>
              <div className="text-xs text-slate-400 line-through">
                {baseline.finalCreditScore} (Grade {baseline.grade})
              </div>
              <div className="text-base font-black text-slate-900">
                {stressed.finalCreditScore} (Grade {stressed.grade})
              </div>
              <span className={`text-[10px] block ${deltaScore >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {deltaScore >= 0 ? '+' : ''}{deltaScore} Poin
              </span>
            </div>

            {/* Laba Bersih Comparison */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Sisa Laba Bersih
              </span>
              <div className="text-xs text-slate-400 line-through truncate">
                {formatRupiah(baseline.labaBersihSetelahKredit)}
              </div>
              <div className={`text-sm font-black truncate ${stressed.labaBersihSetelahKredit >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                {formatRupiah(stressed.labaBersihSetelahKredit)}
              </div>
              <span className="text-[10px] text-slate-500 block">
                / bulan
              </span>
            </div>
          </div>

          {/* Feasibility Verdict Box */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              isStillFeasible
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            {isStillFeasible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                {isStillFeasible ? 'Resiliensi Baik: Usaha Tetap Mampu Mencicil' : 'Risiko Tinggi: Berpotensi Gagal Bayar (Default)'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isStillFeasible
                  ? `Meskipun terjadi guncangan omzet (${omzetDeltaPct}%) dan kenaikan HPP (+${hppDeltaPct}%), rasio DSCR tetap di angka ${formatRatio(stressed.dscrBaru)} (≥ 1.25x). Kas debitur masih aman melunasi angsuran.`
                  : `Pada skenario stres ini, rasio DSCR jatuh ke level ${formatRatio(stressed.dscrBaru)}. Laba operasional tidak lagi memadai untuk menutup cicilan pinjaman. Komite kredit wajib mensyaratkan mitigasi tambahan atau menurunkan limit kredit.`}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default (-15% Omzet, +5% HPP)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white"
          >
            Tutup Simulator
          </button>
        </div>
      </div>
    </div>
  );
}
