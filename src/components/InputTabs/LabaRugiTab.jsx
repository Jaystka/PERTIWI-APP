import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah, formatPercent } from '../../utils/formatters';
import { TrendingUp, DollarSign, Wallet, ArrowDownRight } from 'lucide-react';

export default function LabaRugiTab({ formData, updateField, analysis }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Laba Rugi Bulanan */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Penjualan & Biaya Usaha Bulanan
          </span>

          <CurrencyInput
            label="Omzet Penjualan Bulanan"
            value={formData.omzetBulanan}
            onChange={(val) => updateField('omzetBulanan', val)}
            helperText="Rata-rata omzet 3-6 bln terakhir"
            tooltip="Rata-rata total penerimaan kotor per bulan"
          />

          <CurrencyInput
            label="HPP (Harga Pokok Penjualan)"
            value={formData.hppBulanan}
            onChange={(val) => updateField('hppBulanan', val)}
            helperText="Biaya modal beli stok / bahan baku"
            tooltip="Total belanja barang dagangan atau bahan baku yang habis terjual dlm 1 bulan"
          />

          <CurrencyInput
            label="Biaya Operasional Bulanan"
            value={formData.biayaOperasional}
            onChange={(val) => updateField('biayaOperasional', val)}
            helperText="Gaji, listrik, sewa tempat, transport"
            tooltip="Seluruh pengeluaran rutin operasional selain modal belanja stok"
          />

          <CurrencyInput
            label="Cicilan Kredit Eksisting Bulanan"
            value={formData.cicilanEksisting}
            onChange={(val) => updateField('cicilanEksisting', val)}
            helperText="Angsuran pinjaman aktif saat ini"
            tooltip="Total angsuran pinjaman bank, leasing, atau koperasi yang sedang berjalan"
          />
        </div>

        {/* Live Calculation Preview Cards */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 shadow-2xs flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
            Struktur Arus Kas & Margin Real-Time
          </span>

          <div className="space-y-2.5">
            {/* Laba Kotor */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Kotor Bulanan</span>
                <span className="text-sm font-extrabold text-slate-900">{formatRupiah(analysis.labaKotor)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Margin Kotor (GPM)</span>
                <span className="text-xs font-bold text-indigo-600">{formatPercent(analysis.gpm)}</span>
              </div>
            </div>

            {/* Laba Operasional */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Operasional (EBITDA)</span>
                <span className="text-sm font-extrabold text-emerald-700">{formatRupiah(analysis.labaOperasional)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Kapasitas Bayar Utang</span>
                <span className={`text-xs font-bold ${analysis.labaOperasional > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {analysis.labaOperasional > 0 ? 'Surplus' : 'Defisit'}
                </span>
              </div>
            </div>

            {/* Laba Bersih Sebelum Kredit Baru */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Laba Bersih Saat Ini</span>
                <span className="text-sm font-extrabold text-slate-900">{formatRupiah(analysis.labaBersihSebelumKredit)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Margin Bersih (NPM)</span>
                <span className="text-xs font-bold text-slate-700">{formatPercent(analysis.npm)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
            💡 <strong>Rekomendasi Analis:</strong> Beban angsuran pinjaman bulanan yang sehat disarankan tidak melebihi <strong>30% - 40%</strong> dari Laba Operasional pedagang.
          </div>
        </div>
      </div>
    </div>
  );
}
