import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah, formatRatio } from '../../utils/formatters';
import { Calculator, Clock, Percent, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function KreditTab({ formData, updateField, analysis }) {
  const bungaPresets = [
    { label: 'KUR Mikro (6%)', val: 6 },
    { label: 'KUR Ritel (9%)', val: 9 },
    { label: 'Komersial (12%)', val: 12 },
    { label: 'Mikro / BPR (16%)', val: 16 }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Form Pengajuan Fasilitas Kredit */}
        <div className="space-y-4 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Parameter Simulasi Pembiayaan Baru
          </span>

          <CurrencyInput
            label="Plafon Pinjaman yang Diajukan"
            value={formData.plafonDiajukan}
            onChange={(val) => updateField('plafonDiajukan', val)}
            helperText="Nilai kredit yang dimohon"
            highlight={true}
            tooltip="Jumlah nominal kredit modal kerja atau investasi yang diajukan oleh calon debitur"
          />

          {/* Tenor Pinjaman */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Tenor Jangka Waktu Pinjaman</label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {formData.tenorBulan} Bulan ({(formData.tenorBulan / 12).toFixed(1)} Thn)
              </span>
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
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>6 Bulan</span>
              <span>12 Bln (1 Th)</span>
              <span>24 Bln (2 Th)</span>
              <span>36 Bln (3 Th)</span>
              <span>60 Bln (5 Th)</span>
            </div>
          </div>

          {/* Suku Bunga Tahunan */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Suku Bunga Efektif per Tahun (% p.a.)</label>
              <span className="font-bold text-slate-900">{formData.bungaTahunan}%</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                min="1"
                max="36"
                value={formData.bungaTahunan}
                onChange={(e) => updateField('bungaTahunan', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-1.5 text-sm font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex flex-wrap gap-1">
                {bungaPresets.map((bp) => (
                  <button
                    key={bp.val}
                    type="button"
                    onClick={() => updateField('bungaTahunan', bp.val)}
                    className={`text-[10px] px-2 py-1 rounded-md font-medium border transition-all ${
                      formData.bungaTahunan === bp.val
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {bp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Simulasi Angsuran & Dampak ke Arus Kas */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
            Hasil Simulasi Angsuran & Beban Kas
          </span>

          <div className="space-y-2.5">
            {/* Cicilan Baru per Bulan */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Estimasi Cicilan Kredit Baru</span>
                <span className="text-base font-black text-indigo-700">{formatRupiah(analysis.cicilanBaru)} / bulan</span>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded border border-indigo-200">
                Metode Anuitas
              </span>
            </div>

            {/* Total Cicilan Eksisting + Baru */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Total Beban Cicilan Gabungan</span>
                <span className="text-sm font-bold text-slate-900">{formatRupiah(analysis.totalCicilanSetelahKredit)} / bulan</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Cicilan Lama</span>
                <span className="text-xs font-semibold text-slate-600">{formatRupiah(formData.cicilanEksisting)}</span>
              </div>
            </div>

            {/* Indikator DSCR Setelah Kredit */}
            <div
              className={`p-3 rounded-lg border flex items-center justify-between ${
                analysis.dscrBaru >= 1.5
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : analysis.dscrBaru >= 1.2
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {analysis.dscrBaru >= 1.5 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <div>
                  <span className="text-[11px] font-bold block">Rasio Kecukupan Kas (DSCR)</span>
                  <span className="text-xs">
                    {analysis.dscrBaru >= 1.5
                      ? 'Arus kas sangat aman menutup cicilan'
                      : analysis.dscrBaru >= 1.2
                      ? 'Arus kas pas-pasan, waspadai risiko'
                      : 'Beban cicilan berbahaya bagi kelangsungan usaha'}
                  </span>
                </div>
              </div>
              <span className="text-base font-black">{formatRatio(analysis.dscrBaru)}</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs text-slate-600">
            📊 <strong>Kapasitas Bersih:</strong> Sisa laba setelah seluruh cicilan dibayar adalah{' '}
            <strong className="text-slate-900 font-bold">{formatRupiah(analysis.labaBersihSetelahKredit)}/bulan</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}
