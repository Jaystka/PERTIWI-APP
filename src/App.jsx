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

// Icons
import {
  Building2,
  Calculator,
  Wallet,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Printer,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState('warung');
  const [formData, setFormData] = useState(PRESETS.warung);
  const [activeInputTab, setActiveInputTab] = useState('neraca');
  const [autoSyncEkuitas, setAutoSyncEkuitas] = useState(true);

  // Modal States
  const [isStressTestOpen, setIsStressTestOpen] = useState(false);
  const [isCreditMemoOpen, setIsCreditMemoOpen] = useState(false);
  const [isProfileManagerOpen, setIsProfileManagerOpen] = useState(false);

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

  // Tab Navigation items
  const tabs = [
    {
      id: 'neraca',
      label: '1. Neraca Keuangan',
      desc: 'Aset, Utang & Modal',
      icon: Building2
    },
    {
      id: 'labarugi',
      label: '2. Laba Rugi Bulanan',
      desc: 'Omzet, HPP & Biaya',
      icon: Calculator
    },
    {
      id: 'kredit',
      label: '3. Simulasi Kredit',
      desc: 'Plafon, Tenor & Bunga',
      icon: Wallet
    },
    {
      id: 'kualitatif',
      label: '4. Kualitatif 5C',
      desc: 'SLIK OJK & Profil',
      icon: ShieldCheck
    }
  ];

  const tabOrder = ['neraca', 'labarugi', 'kredit', 'kualitatif'];
  const currentTabIndex = tabOrder.indexOf(activeInputTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 selection:bg-indigo-500 selection:text-white">
      {/* 1. Header Navbar */}
      <Navbar
        analysis={analysis}
        onOpenStressTest={() => setIsStressTestOpen(true)}
        onOpenCreditMemo={() => setIsCreditMemoOpen(true)}
        onOpenProfileManager={() => setIsProfileManagerOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 2. Preset Profil Realistis UMKM */}
        <PresetCards
          selectedPreset={selectedPreset}
          onSelectPreset={handleLoadPreset}
        />

        {/* 3. Grid Dua Kolom: Form Input (Kiri) & Ringkasan Skor & Plafon (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Tabbed Input Forms (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
              {/* Tab Navigation Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 mb-4 border-b border-slate-100">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const active = activeInputTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveInputTab(tab.id)}
                      className={`p-2.5 rounded-xl text-left transition-all flex flex-col justify-between border ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 text-indigo-950 font-bold'
                          : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70 text-slate-600 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <TabIcon
                          className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`}
                        />
                        <span className="text-xs truncate">{tab.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal truncate block">
                        {tab.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab View */}
              <div className="min-h-[380px]">
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

              {/* Next & Previous Tab Navigation */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentTabIndex === 0}
                  onClick={() => setActiveInputTab(tabOrder[currentTabIndex - 1])}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    currentTabIndex === 0
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  Langkah {currentTabIndex + 1} dari 4
                </span>

                <button
                  type="button"
                  disabled={currentTabIndex === tabOrder.length - 1}
                  onClick={() => setActiveInputTab(tabOrder[currentTabIndex + 1])}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    currentTabIndex === tabOrder.length - 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  }`}
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Hasil Skor Kredit & Plafon (5 Kolom) */}
          <div className="lg:col-span-5 space-y-5">
            <ScoreGauge analysis={analysis} />
            <PlafonCard formData={formData} analysis={analysis} />
          </div>
        </div>

        {/* 4. Baris Visualisasi Grafik Multi-Dimensi (2 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RadarDimensionChart radarData={analysis.radarData} />
          <CashflowWaterfallChart
            cashflowChartData={analysis.cashflowChartData}
            dscrBaru={analysis.dscrBaru}
          />
        </div>

        {/* 5. Matriks 7 Rasio Keuangan Lengkap */}
        <RatioGrid ratios={analysis.ratios} />

        {/* 6. Early Warning System, Red Flags & Rekomendasi */}
        <EarlyWarningSystem analysis={analysis} />
      </main>

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

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
        <p className="font-semibold text-slate-600">
          PERTIWI FinScore © {new Date().getFullYear()} • Sistem Analitik & Credit Scoring Terpadu Pedagang UMKM Indonesia
        </p>
        <p className="mt-1">
          Diformulasikan berdasarkan prinsip kehati-hatian perbankan (Prudential Banking) & POJK tentang Penilaian Kualitas Aset Lembaga Keuangan.
        </p>
      </footer>
    </div>
  );
}
