import React from 'react';
import { ShieldCheck, Activity, Sliders, Printer, FolderDown, BookOpen } from 'lucide-react';

export default function Navbar({
  analysis,
  onOpenStressTest,
  onOpenCreditMemo,
  onOpenProfileManager,
  onOpenMethodology
}) {
  const grade = analysis?.grade || 'C';

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Branding & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>PERTIWI</span>
                <span className="text-indigo-400">FinScore</span>
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Credit Engine v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sistem Credit Scoring & Deteksi Indikasi Kesehatan Keuangan Pedagang UMKM
            </p>
          </div>
        </div>

        {/* Quick Header Indicators & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-auto">
          {/* Quick Stats Pill */}
          <div className="bg-slate-800/95 border border-slate-700/80 rounded-lg px-3 py-1.5 flex items-center gap-2.5 shadow-xs">
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Skor Kredit</span>
              <span className="text-sm font-black text-white">{analysis.finalCreditScore}</span>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-black rounded-md ${
                grade === 'A'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : grade === 'B'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : grade === 'C'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              Grade {grade}
            </span>
          </div>

          <div className="hidden lg:flex bg-slate-800/95 border border-slate-700/80 rounded-lg px-3 py-1.5 items-center gap-2 shadow-xs">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold">DSCR Baru</span>
              <span className="text-sm font-bold text-white">{analysis.dscrBaru.toFixed(2)}x</span>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            onClick={onOpenMethodology}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 hover:border-slate-600 transition-all shadow-xs"
            title="Buka rujukan POJK, regulasi perbankan, dan literatur ilmiah"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Regulasi & Sumber</span>
          </button>

          <button
            type="button"
            onClick={onOpenStressTest}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-xs"
            title="Uji ketahanan kredit terhadap guncangan omzet atau biaya"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Stress Test</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreditMemo}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all"
            title="Cetak format resmi Memorandum Analisis Kredit untuk komite perbankan"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-100" />
            <span>Cetak Memo</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfileManager}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all shadow-xs"
            title="Simpan / Muat profil UMKM tersimpan"
          >
            <FolderDown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Kelola Profil</span>
          </button>
        </div>
      </div>
    </header>
  );
}
