import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { formatRupiah } from '../../utils/formatters';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';

export default function NeracaTab({
  formData,
  updateField,
  autoSyncEkuitas,
  setAutoSyncEkuitas,
  analysis
}) {
  const totalAset = (Number(formData.kas) || 0) + (Number(formData.piutang) || 0) + (Number(formData.persediaan) || 0) + (Number(formData.asetTetap) || 0);
  const totalUtangDanModal = (Number(formData.utangJangkaPendek) || 0) + (Number(formData.utangJangkaPanjang) || 0) + (Number(formData.ekuitas) || 0);
  const isBalanced = Math.abs(totalAset - totalUtangDanModal) < 100;

  return (
    <div className="space-y-4">
      {/* Educational Banner */}
      <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-xs text-indigo-900">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Panduan Neraca:</strong> Masukkan posisi harta (aset) dan kewajiban (utang) toko saat ini. Fitur <em>Auto-Sync</em> akan otomatis menyelaraskan modal sendiri (ekuitas) Anda agar neraca selalu seimbang.
        </div>
      </div>

      {/* Auto-sync Ekuitas Toggle & Status Neraca */}
      <div className="p-3 bg-white border border-slate-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 shadow-2xs">
        <label className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoSyncEkuitas}
            onChange={(e) => setAutoSyncEkuitas(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <span>Hitung Otomatis Modal Sendiri (Ekuitas = Aset - Utang)</span>
        </label>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Status Neraca:</span>
          {isBalanced ? (
            <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Seimbang ({formatRupiah(totalAset)})
            </span>
          ) : (
            <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5" /> Selisih {formatRupiah(Math.abs(totalAset - totalUtangDanModal))}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom Kiri: Sisi Aset (Aktiva) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span>Harta / Aset Usaha</span>
            </span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              Total: {formatRupiah(totalAset)}
            </span>
          </div>

          <CurrencyInput
            label="1. Kas & Saldo Rekening"
            value={formData.kas}
            onChange={(val) => updateField('kas', val)}
            helperText="Uang fisik & di bank"
            tooltip="Uang tunai di laci kasir dan saldo rekening tabungan/giro operasional toko"
            quickChips={[{ label: '+5 Jt', delta: 5000000 }, { label: '+10 Jt', delta: 10000000 }, { label: '+25 Jt', delta: 25000000 }]}
          />

          <CurrencyInput
            label="2. Piutang Pelanggan (Bon)"
            value={formData.piutang}
            onChange={(val) => updateField('piutang', val)}
            helperText="Tagihan belum lunas"
            tooltip="Tagihan tempo atau bon langganan yang belum dibayarkan konsumen ke toko"
            quickChips={[{ label: '+2 Jt', delta: 2000000 }, { label: '+5 Jt', delta: 5000000 }, { label: '+10 Jt', delta: 10000000 }]}
          />

          <CurrencyInput
            label="3. Stok Barang Dagangan"
            value={formData.persediaan}
            onChange={(val) => updateField('persediaan', val)}
            helperText="Nilai kulakan barang di toko"
            tooltip="Total modal belanja stok barang siap jual yang masih tersedia di etalase dan gudang"
            quickChips={[{ label: '+10 Jt', delta: 10000000 }, { label: '+25 Jt', delta: 25000000 }, { label: '+50 Jt', delta: 50000000 }]}
          />

          <CurrencyInput
            label="4. Aset Tetap & Peralatan Usaha"
            value={formData.asetTetap}
            onChange={(val) => updateField('asetTetap', val)}
            helperText="Mesin, etalase, kendaraan, toko"
            tooltip="Nilai pasar peralatan kerja, mesin produksi, kendaraan operasional, atau bangunan toko milik sendiri"
            quickChips={[{ label: '+25 Jt', delta: 25000000 }, { label: '+50 Jt', delta: 50000000 }]}
          />
        </div>

        {/* Kolom Kanan: Sisi Utang & Ekuitas (Pasiva) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>Kewajiban Utang & Modal</span>
            </span>
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              Total: {formatRupiah(totalUtangDanModal)}
            </span>
          </div>

          <CurrencyInput
            label="5. Utang Supplier (Jatuh Tempo)"
            value={formData.utangJangkaPendek}
            onChange={(val) => updateField('utangJangkaPendek', val)}
            helperText="Jatuh tempo < 1 tahun"
            tooltip="Utang dagang ke agen/distributor/supplier barang yang harus dibayar dalam waktu dekat"
            quickChips={[{ label: '+5 Jt', delta: 5000000 }, { label: '+15 Jt', delta: 15000000 }]}
          />

          <CurrencyInput
            label="6. Utang Jangka Panjang"
            value={formData.utangJangkaPanjang}
            onChange={(val) => updateField('utangJangkaPanjang', val)}
            helperText="Sisa pinjaman bank/leasing"
            tooltip="Sisa pokok pinjaman bank atau leasing usaha yang tenornya lebih dari 12 bulan"
            quickChips={[{ label: '+20 Jt', delta: 20000000 }, { label: '+50 Jt', delta: 50000000 }]}
          />

          <CurrencyInput
            label="7. Modal Sendiri (Ekuitas Pemilik)"
            value={formData.ekuitas}
            onChange={(val) => updateField('ekuitas', val)}
            helperText={autoSyncEkuitas ? 'Dihitung otomatis' : 'Ditetapkan manual'}
            highlight={autoSyncEkuitas}
            tooltip="Modal awal yang ditanamkan pemilik usaha ditambah akumulasi keuntungan yang ditahan"
          />

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-700 font-semibold">
              <span>Total Beban Utang:</span>
              <span className="text-slate-900 font-bold">{formatRupiah((formData.utangJangkaPendek || 0) + (formData.utangJangkaPanjang || 0))}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Rasio Utang vs Modal (DER):</span>
              <span className={`font-bold ${analysis.der <= 100 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {analysis.der.toFixed(0)}% ({analysis.der <= 100 ? 'Sehat' : 'Cukup Tinggi'})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
