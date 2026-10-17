import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah, formatPercent } from '../../utils/formatters';
import { TrendingUp, DollarSign, Wallet, ArrowDownRight, Sparkles, AlertTriangle } from 'lucide-react';

export default function LabaRugiTab({ formData, updateField, analysis }) {
  const isHppTooHigh = Number(formData.hppBulanan) >= Number(formData.omzetBulanan) && Number(formData.omzetBulanan) > 0;
  const isOperatingDeficit = analysis.labaOperasional <= 0 && Number(formData.omzetBulanan) > 0;

  return (
    <div className="space-y-4">
      {/* Educational Banner */}
      <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-xs text-indigo-900">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Panduan Laba Rugi:</strong> Catat perputaran penjualan rata-rata per bulan dan biaya kulakan (HPP). Laba Operasional (EBITDA) adalah sumber utama toko Anda untuk membayar cicilan pinjaman baru.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Laba Rugi Bulanan */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Penjualan & Biaya Bulanan
          </span>

          <CurrencyInput
            label="1. Omzet Penjualan Bulanan"
            value={formData.omzetBulanan}
            onChange={(val) => updateField('omzetBulanan', val)}
            helperText="Rata-rata penjualan 3-6 bulan"
            tooltip="Rata-rata penerimaan kotor dari seluruh hasil penjualan barang/jasa per bulan"
            quickChips={[{ label: '+10 Jt', delta: 10000000 }, { label: '+25 Jt', delta: 25000000 }, { label: '+50 Jt', delta: 50000000 }]}
          />

          <CurrencyInput
            label="2. HPP (Biaya Belanja Stok / Kulakan)"
            value={formData.hppBulanan}
            onChange={(val) => updateField('hppBulanan', val)}
            helperText="Biaya modal barang terjual"
            tooltip="Pengeluaran belanja modal barang dagangan atau bahan baku yang habis terjual dalam 1 bulan"
            warning={isHppTooHigh ? 'Biaya kulakan (HPP) menyamai atau melebihi omzet penjualan!' : ''}
            quickChips={[{ label: '+10 Jt', delta: 10000000 }, { label: '+25 Jt', delta: 25000000 }, { label: '+50 Jt', delta: 50000000 }]}
          />

          <CurrencyInput
            label="3. Biaya Operasional Bulanan"
            value={formData.biayaOperasional}
            onChange={(val) => updateField('biayaOperasional', val)}
            helperText="Gaji, listrik, sewa, pulsa, transport"
            tooltip="Seluruh biaya rutin bulanan selain belanja modal barang (misal: gaji karyawan, sewa kios, tagihan PLN/PDAM)"
            quickChips={[{ label: '+2 Jt', delta: 2000000 }, { label: '+5 Jt', delta: 5000000 }, { label: '+10 Jt', delta: 10000000 }]}
          />

          <CurrencyInput
            label="4. Cicilan Utang Eksisting Bulanan"
            value={formData.cicilanEksisting}
            onChange={(val) => updateField('cicilanEksisting', val)}
            helperText="Angsuran pinjaman aktif saat ini"
            tooltip="Total angsuran pinjaman bank, leasing, atau koperasi yang sedang berjalan saat ini per bulan"
            quickChips={[{ label: '+1 Jt', delta: 1000000 }, { label: '+2.5 Jt', delta: 2500000 }, { label: '+5 Jt', delta: 5000000 }]}
          />
        </div>

        {/* Live Calculation Preview Cards */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
            Hasil Laba Bersih & Margin Otomatis
          </span>

          <div className="space-y-2.5">
            {/* Laba Kotor */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Kotor (Omzet - HPP)</span>
                <span className="text-sm font-extrabold text-slate-900">{formatRupiah(analysis.labaKotor)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Margin Kotor</span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {formatPercent(analysis.gpm)}
                </span>
              </div>
            </div>

            {/* Laba Operasional */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Operasional (EBITDA)</span>
                <span className={`text-base font-black ${analysis.labaOperasional > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {formatRupiah(analysis.labaOperasional)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Kapasitas Cicilan</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    analysis.labaOperasional > 0
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {analysis.labaOperasional > 0 ? 'Surplus' : 'Defisit Operasional'}
                </span>
              </div>
            </div>

            {/* Sisa Laba Bersih Saat Ini */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Bersih Sebelum Kredit Baru</span>
                <span className="text-sm font-extrabold text-slate-900">
                  {formatRupiah(analysis.labaBersihSebelumKredit)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Margin Bersih</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {formatPercent(analysis.npm)}
                </span>
              </div>
            </div>
          </div>

          {/* Tips Analis */}
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
            💡 <strong>Prinsip Sehat:</strong> Bank umumnya mensyaratkan cicilan pinjaman bulanan maksimal <strong>33% s/d 40%</strong> dari Laba Operasional agar usaha tidak tercekik saat penjualan sedang sepi.
          </div>
        </div>
      </div>
    </div>
  );
}
