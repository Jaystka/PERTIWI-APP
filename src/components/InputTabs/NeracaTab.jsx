import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah } from '../../utils/formatters';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NeracaTab({
  formData,
  updateField,
  autoSyncEkuitas,
  setAutoSyncEkuitas,
  analysis
}) {
  const totalAset = (formData.kas || 0) + (formData.piutang || 0) + (formData.persediaan || 0) + (formData.asetTetap || 0);
  const totalUtangDanModal = (formData.utangJangkaPendek || 0) + (formData.utangJangkaPanjang || 0) + (formData.ekuitas || 0);
  const isBalanced = Math.abs(totalAset - totalUtangDanModal) < 100;

  return (
    <div className="space-y-5">
      {/* Auto-sync Ekuitas Toggle & Status Neraca */}
      <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoSyncEkuitas}
            onChange={(e) => setAutoSyncEkuitas(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
          <span>Auto-Sync Modal Sendiri (Ekuitas = Total Aset - Total Utang)</span>
        </label>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Keseimbangan Neraca:</span>
          {isBalanced ? (
            <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Seimbang (Rp {formatRupiah(totalAset)})
            </span>
          ) : (
            <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5" /> Selisih {formatRupiah(Math.abs(totalAset - totalUtangDanModal))}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kolom Kiri: Sisi Aset (Aktiva) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span>Aset / Harta Usaha</span>
            </span>
            <span className="text-xs font-bold text-slate-900">{formatRupiah(totalAset)}</span>
          </div>

          <CurrencyInput
            label="Kas & Saldo Bank"
            value={formData.kas}
            onChange={(val) => updateField('kas', val)}
            helperText="Uang tunai & di rekening"
            tooltip="Kas fisik di toko, saldo rekening giro/tabungan usaha"
          />

          <CurrencyInput
            label="Piutang Usaha (Pelanggan)"
            value={formData.piutang}
            onChange={(val) => updateField('piutang', val)}
            helperText="Tagihan belum terbayar"
            tooltip="Tagihan tempo yang belum dilunasi konsumen atau mitra"
          />

          <CurrencyInput
            label="Persediaan Barang Dagangan (Stok)"
            value={formData.persediaan}
            onChange={(val) => updateField('persediaan', val)}
            helperText="Nilai kulakan barang di toko"
            tooltip="Nilai stok barang siap jual yang masih ada di etalase / gudang"
          />

          <CurrencyInput
            label="Aset Tetap Usaha"
            value={formData.asetTetap}
            onChange={(val) => updateField('asetTetap', val)}
            helperText="Kendaraan, mesin, tanah/toko"
            tooltip="Peralatan kerja, mesin produksi, kendaraan angkut, atau tempat usaha milik sendiri"
          />
        </div>

        {/* Kolom Kanan: Sisi Utang & Ekuitas (Pasiva) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span>Liabilitas & Modal</span>
            </span>
            <span className="text-xs font-bold text-slate-900">{formatRupiah(totalUtangDanModal)}</span>
          </div>

          <CurrencyInput
            label="Utang Lancar (Supplier / Jangka Pendek)"
            value={formData.utangJangkaPendek}
            onChange={(val) => updateField('utangJangkaPendek', val)}
            helperText="Jatuh tempo < 12 bulan"
            tooltip="Utang dagang ke pemasok/distributor, tagihan tempo bulanan"
          />

          <CurrencyInput
            label="Utang Jangka Panjang"
            value={formData.utangJangkaPanjang}
            onChange={(val) => updateField('utangJangkaPanjang', val)}
            helperText="Sisa pokok kredit bank/leasing"
            tooltip="Sisa pokok pinjaman bank atau leasing usaha dengan tenor > 1 tahun"
          />

          <CurrencyInput
            label="Modal Sendiri (Ekuitas Pemilik)"
            value={formData.ekuitas}
            onChange={(val) => updateField('ekuitas', val)}
            helperText={autoSyncEkuitas ? 'Dihitung otomatis' : 'Ditetapkan manual'}
            highlight={autoSyncEkuitas}
            tooltip="Modal awal yang disetor dan akumulasi laba ditahan"
          />

          <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-xs space-y-1">
            <div className="flex justify-between text-indigo-900 font-semibold">
              <span>Total Liabilitas (Utang):</span>
              <span>{formatRupiah((formData.utangJangkaPendek || 0) + (formData.utangJangkaPanjang || 0))}</span>
            </div>
            <div className="flex justify-between text-indigo-700">
              <span>Rasio Utang thd Modal (DER):</span>
              <span className="font-bold">{analysis.der.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
