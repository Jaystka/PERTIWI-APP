import React, { useState, useMemo } from 'react';
import { PRESETS } from './data/presets';
import { calculateFinancialAnalysis } from './utils/financialEngine';

// Components
import Navbar from './components/Navbar';
import PresetCards from './components/PresetCards';
import NeracaTab from './components/InputTabs/NeracaTab';
import LabaRugiTab from './components/InputTabs/LabaRugiTab';
import KreditTab from './components/InputTabs/KreditTab';
import KualitatifTab from './components/InputTabs/KualitatifTab';
import ScoreGauge from './components/ScoreGauge';
import PlafonCard from './components/PlafonCard';
import RadarDimensionChart from './components/Charts/RadarDimensionChart';
import CashflowWaterfallChart from './components/Charts/CashflowWaterfallChart';
import RatioGrid from './components/RatioGrid';
import EarlyWarningSystem from './components/EarlyWarningSystem';
import StressTestModal from './components/StressTestModal';
import CreditMemoModal from './components/CreditMemoModal';
import ProfileManagerModal from './components/ProfileManagerModal';
import MethodologyModal from './components/MethodologyModal';

// Icons
import {
  Building2,
  Calculator,
  Wallet,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  BarChart3,
  Layers,
  Activity,
  FileSpreadsheet,
  Sliders,
  Printer,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState('warung');
  const [formData, setFormData] = useState(PRESETS.warung);
  const [activeInputTab, setActiveInputTab] = useState('neraca');
  const [autoSyncEkuitas, setAutoSyncEkuitas] = useState(true);

  // Active View Tab on Results side: 'overview' | 'charts' | 'ratios' | 'all'
  const [activeResultTab, setActiveResultTab] = useState('overview');

  // Modal States
  const [isStressTestOpen, setIsStressTestOpen] = useState(false);
  const [isCreditMemoOpen, setIsCreditMemoOpen] = useState(false);
  const [isProfileManagerOpen, setIsProfileManagerOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Memuat preset
  const handleLoadPreset = (presetKey) => {
    setSelectedPreset(presetKey);
    if (PRESETS[presetKey]) {
      setFormData({ ...PRESETS[presetKey] });
    }
  };

  // Mengubah field input
  const updateField = (field, value) => {
    setSelectedPreset('custom');
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (
        autoSyncEkuitas &&
        ['kas', 'piutang', 'persediaan', 'asetTetap', 'utangJangkaPendek', 'utangJangkaPanjang'].includes(field)
      ) {
        const totalAset =
          (Number(updated.kas) || 0) +
          (Number(updated.piutang) || 0) +
          (Number(updated.persediaan) || 0) +
          (Number(updated.asetTetap) || 0);
        const totalUtang =
          (Number(updated.utangJangkaPendek) || 0) + (Number(updated.utangJangkaPanjang) || 0);
        updated.ekuitas = Math.max(0, totalAset - totalUtang);
      }
      return updated;
    });
  };

  // Memuat profil tersimpan
  const handleLoadSavedProfile = (loadedProfile) => {
    setSelectedPreset('custom');
    setFormData({ ...loadedProfile });
  };

  // Mesin Analisis Finansial Terpusat
  const analysis = useMemo(() => {
    return calculateFinancialAnalysis(formData);
  }, [formData]);

  // Stepper items
  const steps = [
    {
      id: 'neraca',
      title: 'Neraca Usaha',
      subtitle: 'Aset & Utang',
      icon: Building2
    },
    {
      id: 'labarugi',
      title: 'Laba Rugi',
      subtitle: 'Omzet & Biaya',
      icon: Calculator
    },
    {
      id: 'kredit',
      title: 'Simulasi Kredit',
      subtitle: 'Plafon & Tenor',
      icon: Wallet
    },
    {
      id: 'kualitatif',
      title: 'Karakter 5C',
      subtitle: 'SLIK OJK & Profil',
      icon: ShieldCheck
    }
  ];

  const tabOrder = ['neraca', 'labarugi', 'kredit', 'kualitatif'];
  const currentStepIndex = tabOrder.indexOf(activeInputTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 selection:bg-indigo-500 selection:text-white">
      {/* 1. Header Navbar Fintech */}
      <Navbar
        analysis={analysis}
        onOpenStressTest={() => setIsStressTestOpen(true)}
        onOpenCreditMemo={() => setIsCreditMemoOpen(true)}
        onOpenProfileManager={() => setIsProfileManagerOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-5">
        {/* 2. Preset Profil Realistis UMKM */}
        <PresetCards
          selectedPreset={selectedPreset}
          onSelectPreset={handleLoadPreset}
        />

        {/* 3. Grid Dua Kolom: Form Input (Kiri) & Tabbed Hasil Analisis (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Kolom Kiri: Guided Input Form Wizard (6 Kolom) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
              {/* Stepper Wizard Indicator */}
              <div className="mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Langkah {currentStepIndex + 1} dari 4: {steps[currentStepIndex].title}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {Math.round(((currentStepIndex + 1) / 4) * 100)}% Selesai
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / 4) * 100}%` }}
                  />
                </div>

                {/* Stepper Buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  {steps.map((st, idx) => {
                    const StepIcon = st.icon;
                    const isActive = activeInputTab === st.id;
                    const isPassed = idx < currentStepIndex;

                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setActiveInputTab(st.id)}
                        className={`p-2 rounded-xl text-left transition-all flex flex-col justify-between border ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                            : isPassed
                            ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900 font-semibold'
                            : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70 text-slate-600 font-medium'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <StepIcon
                            className={`w-3.5 h-3.5 ${
                              isActive ? 'text-indigo-600' : isPassed ? 'text-emerald-600' : 'text-slate-400'
                            }`}
                          />
                          {isPassed && <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />}
                        </div>
                        <span className="text-[11px] truncate leading-tight">{st.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Tab View */}
              <div className="min-h-[360px]">
                {activeInputTab === 'neraca' && (
                  <NeracaTab
                    formData={formData}
                    updateField={updateField}
                    autoSyncEkuitas={autoSyncEkuitas}
                    setAutoSyncEkuitas={setAutoSyncEkuitas}
                    analysis={analysis}
                  />
                )}
                {activeInputTab === 'labarugi' && (
                  <LabaRugiTab
                    formData={formData}
                    updateField={updateField}
                    analysis={analysis}
                  />
                )}
                {activeInputTab === 'kredit' && (
                  <KreditTab
                    formData={formData}
                    updateField={updateField}
                    analysis={analysis}
                  />
                )}
                {activeInputTab === 'kualitatif' && (
                  <KualitatifTab
                    formData={formData}
                    updateField={updateField}
                    analysis={analysis}
                  />
                )}
              </div>

              {/* Next & Previous Stepper Navigation */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStepIndex === 0}
                  onClick={() => setActiveInputTab(tabOrder[currentStepIndex - 1])}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                    currentStepIndex === 0
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-100 bg-white shadow-2xs'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1">
                  {tabOrder.map((stepId, sIdx) => (
                    <span
                      key={stepId}
                      className={`w-2 h-2 rounded-full transition-all ${
                        sIdx === currentStepIndex ? 'w-5 bg-indigo-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={currentStepIndex === tabOrder.length - 1}
                  onClick={() => setActiveInputTab(tabOrder[currentStepIndex + 1])}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    currentStepIndex === tabOrder.length - 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
                  }`}
                >
                  <span>Langkah Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Hasil Analisis & Tabbed Dashboard (6 Kolom) */}
          <div className="lg:col-span-6 space-y-4">
            {/* View Switcher Pills */}
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setActiveResultTab('overview')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeResultTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Skor & Plafon</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('charts')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeResultTab === 'charts'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Grafik Arus Kas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('ratios')}
                className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeResultTab === 'ratios'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>7 Rasio & Risiko</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('all')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                  activeResultTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
                title="Tampilkan semua panel hasil analisis sekaligus"
              >
                Semua
              </button>
            </div>

            {/* TAB CONTENT: 1. OVERVIEW (Skor & Plafon) */}
            {(activeResultTab === 'overview' || activeResultTab === 'all') && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <ScoreGauge analysis={analysis} />
                <PlafonCard formData={formData} analysis={analysis} />
              </div>
            )}

            {/* TAB CONTENT: 2. CHARTS (Radar 5C & Waterfall Cashflow) */}
            {(activeResultTab === 'charts' || activeResultTab === 'all') && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <RadarDimensionChart radarData={analysis.radarData} />
                <CashflowWaterfallChart
                  cashflowChartData={analysis.cashflowChartData}
                  dscrBaru={analysis.dscrBaru}
                />
              </div>
            )}

            {/* TAB CONTENT: 3. RATIOS & EARLY WARNING */}
            {(activeResultTab === 'ratios' || activeResultTab === 'all') && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <RatioGrid ratios={analysis.ratios} />
                <EarlyWarningSystem analysis={analysis} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Score Banner on Screen (Sticky at Bottom) */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 rounded-2xl shadow-xl p-2.5 px-4 flex items-center gap-3 sm:gap-4 animate-in slide-in-from-bottom-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              Skor Kredit
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-slate-900">{analysis.finalCreditScore}</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${
                  analysis.grade === 'A'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : analysis.grade === 'B'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : analysis.grade === 'C'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                Grade {analysis.grade}
              </span>
            </div>
          </div>
        </div>

        <div className="h-7 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsStressTestOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-2xs"
            title="Buka simulator stress test"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Stress Test</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreditMemoOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-600/20 transition-all"
            title="Cetak format memorandum analisis kredit"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Cetak Memo</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <StressTestModal
        isOpen={isStressTestOpen}
        onClose={() => setIsStressTestOpen(false)}
        formData={formData}
      />

      <CreditMemoModal
        isOpen={isCreditMemoOpen}
        onClose={() => setIsCreditMemoOpen(false)}
        formData={formData}
        analysis={analysis}
      />

      <ProfileManagerModal
        isOpen={isProfileManagerOpen}
        onClose={() => setIsProfileManagerOpen(false)}
        currentFormData={formData}
        onLoadProfile={handleLoadSavedProfile}
        analysis={analysis}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-600">
          PERTIWI FinScore © {new Date().getFullYear()} • Sistem Analitik & Credit Scoring Terpadu Pedagang UMKM Indonesia
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Diformulasikan berdasarkan regulasi perbankan (POJK No. 40/2019, POJK No. 18/2017 & 11/2024, SAK EMKM) serta model ilmiah Hybrid Credit Scoring.</span>
          <button
            type="button"
            onClick={() => setIsMethodologyOpen(true)}
            className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Pelajari Landasan Regulasi & Literatur Lengkap
          </button>
        </p>
      </footer>
    </div>
  );
}
