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
    <header className="bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Branding & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-600/20 ring-2 ring-indigo-50">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>PERTIWI</span>
                <span className="text-indigo-600">FinScore</span>
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Credit Engine v2.5
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Sistem Credit Scoring & Deteksi Indikasi Kesehatan Keuangan Pedagang UMKM
            </p>
          </div>
        </div>

        {/* Quick Header Indicators & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-auto">
          {/* Quick Stats Pill */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 shadow-2xs">
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Skor Kredit</span>
              <span className="text-sm font-black text-slate-900">{analysis.finalCreditScore}</span>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-black rounded-md border ${
                grade === 'A'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : grade === 'B'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : grade === 'C'
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-rose-50 text-rose-700 border-rose-300'
              }`}
            >
              Grade {grade}
            </span>
          </div>

          <div className="hidden lg:flex bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-1.5 items-center gap-2 shadow-2xs">
            <Activity className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">DSCR Baru</span>
              <span className="text-sm font-black text-slate-900">{analysis.dscrBaru.toFixed(2)}x</span>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            onClick={onOpenMethodology}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-2xs"
            title="Buka rujukan POJK, regulasi perbankan, dan literatur ilmiah"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Regulasi & Sumber</span>
          </button>

          <button
            type="button"
            onClick={onOpenStressTest}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-2xs"
            title="Uji ketahanan kredit terhadap guncangan omzet atau biaya"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Stress Test</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreditMemo}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-600/20 transition-all"
            title="Cetak format resmi Memorandum Analisis Kredit untuk komite perbankan"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Cetak Memo</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfileManager}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-2xs"
            title="Simpan / Muat profil UMKM tersimpan"
          >
            <FolderDown className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Kelola Profil</span>
          </button>
        </div>
      </div>
    </header>
  );
}
