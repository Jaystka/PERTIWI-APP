import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah, formatRatio } from '../../utils/formatters';
import { Calculator, Clock, Percent, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

export default function KreditTab({ formData, updateField, analysis }) {
  const bungaPresets = [
    { label: 'KUR Mikro (6%)', val: 6, desc: 'Subsidi Pemerintah' },
    { label: 'KUR Ritel (9%)', val: 9, desc: 'Plafon > Rp 100 Jt' },
    { label: 'Komersial (12%)', val: 12, desc: 'Bunga Umum Bank' },
    { label: 'Mikro / BPR (16%)', val: 16, desc: 'Proses Cepat' }
  ];

  const tenorPresets = [6, 12, 18, 24, 36, 48, 60];

  return (
    <div className="space-y-4">
      {/* Educational Banner */}
      <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-xs text-indigo-900">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Simulasi Kredit Cerdas:</strong> Sesuaikan plafon, tenor, dan suku bunga. Sistem otomatis menghitung cicilan dengan metode anuitas dan mengevaluasi apakah kas toko Anda aman atau berisiko gagal bayar.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Pengajuan Fasilitas Kredit */}
        <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Parameter Simulasi Pinjaman Baru
          </span>

          <CurrencyInput
            label="1. Nominal Plafon yang Dimohon"
            value={formData.plafonDiajukan}
            onChange={(val) => updateField('plafonDiajukan', val)}
            helperText="Nilai kredit yang dimohon"
            highlight={true}
            tooltip="Jumlah nominal kredit modal kerja atau investasi yang diajukan oleh calon nasabah"
            quickChips={[
              { label: '+25 Jt', delta: 25000000 },
              { label: '+50 Jt', delta: 50000000 },
              { label: '+100 Jt', delta: 100000000 }
            ]}
          />

          {/* Tenor Pinjaman */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>2. Jangka Waktu (Tenor)</label>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                {formData.tenorBulan} Bulan ({(formData.tenorBulan / 12).toFixed(1)} Tahun)
              </span>
            </div>

            {/* Tenor Quick Pills */}
            <div className="flex flex-wrap gap-1.5">
              {tenorPresets.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => updateField('tenorBulan', t)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                    formData.tenorBulan === t
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t} Bln
                </button>
              ))}
            </div>

            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={formData.tenorBulan}
              onChange={(e) => updateField('tenorBulan', parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Suku Bunga Tahunan */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>3. Suku Bunga Pinjaman (% per Tahun)</label>
              <span className="font-bold text-slate-900">{formData.bungaTahunan}% p.a.</span>
            </div>

            {/* Bunga Presets */}
            <div className="grid grid-cols-2 gap-1.5">
              {bungaPresets.map((bp) => (
                <button
                  key={bp.val}
                  type="button"
                  onClick={() => updateField('bungaTahunan', bp.val)}
                  className={`text-left p-2 rounded-lg border transition-all flex flex-col ${
                    formData.bungaTahunan === bp.val
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold ring-1 ring-indigo-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold">{bp.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{bp.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simulasi Angsuran & Dampak ke Arus Kas */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
            Beban Angsuran & Daya Tahan Kas
          </span>

          <div className="space-y-2.5">
            {/* Cicilan Baru per Bulan */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Cicilan Baru per Bulan</span>
                <span className="text-lg font-black text-indigo-700">{formatRupiah(analysis.cicilanBaru)}</span>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded border border-indigo-200">
                Anuitas Efektif
              </span>
            </div>

            {/* Total Cicilan Eksisting + Baru */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Total Seluruh Cicilan Bulanan</span>
                <span className="text-sm font-bold text-slate-900">{formatRupiah(analysis.totalCicilanSetelahKredit)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Cicilan Lama</span>
                <span className="text-xs font-semibold text-slate-600">{formatRupiah(formData.cicilanEksisting)}</span>
              </div>
            </div>

            {/* Indikator DSCR Setelah Kredit */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                analysis.dscrBaru >= 1.5
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : analysis.dscrBaru >= 1.2
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {analysis.dscrBaru >= 1.5 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold block">Kecukupan Arus Kas (DSCR)</span>
                  <span className="text-[11px] text-slate-600">
                    {analysis.dscrBaru >= 1.5
                      ? 'Laba sangat aman menutup angsuran'
                      : analysis.dscrBaru >= 1.2
                      ? 'Arus kas pas-pasan (waspada jika omzet turun)'
                      : 'Beban cicilan berbahaya, berisiko kredit macet'}
                  </span>
                </div>
              </div>
              <span className="text-lg font-black">{formatRatio(analysis.dscrBaru)}</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
            📊 <strong>Sisa Kas Bersih:</strong> Setelah seluruh cicilan dibayar, sisa laba bersih toko diperkirakan{' '}
            <strong className="text-slate-900 font-bold">{formatRupiah(analysis.labaBersihSetelahKredit)}/bulan</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
