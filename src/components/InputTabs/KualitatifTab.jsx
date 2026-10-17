import React from 'react';
import { Award, Briefcase, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function KualitatifTab({ formData, updateField, analysis }) {
  const slikOptions = [
    { kol: 1, label: 'Kol 1 - Lancar', desc: 'Tidak pernah menunggak, pembayaran tepat waktu' },
    { kol: 2, label: 'Kol 2 - DPK', desc: 'Dalam Perhatian Khusus (Pernah telat bayar 1–90 hari)' },
    { kol: 3, label: 'Kol 3 - Kurang Lancar', desc: 'Tunggakan aktif 91–120 hari' },
    { kol: 4, label: 'Kol 4 - Diragukan', desc: 'Tunggakan aktif 121–180 hari' },
    { kol: 5, label: 'Kol 5 - Macet', desc: 'Tunggakan aktif > 180 hari (NPL)' }
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Identitas & Legalitas Usaha */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Identitas Debitur & Karakter 5C
          </span>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Nama Usaha / Toko</label>
            <input
              type="text"
              value={formData.namaUsaha || ''}
              onChange={(e) => updateField('namaUsaha', e.target.value)}
              placeholder="Contoh: Toko Sembako Berkah"
              className="w-full px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Nama Pemilik</label>
              <input
                type="text"
                value={formData.pemilik || ''}
                onChange={(e) => updateField('pemilik', e.target.value)}
                placeholder="Bpk / Ibu..."
                className="w-full px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Sektor Usaha</label>
              <input
                type="text"
                value={formData.sektor || ''}
                onChange={(e) => updateField('sektor', e.target.value)}
                placeholder="Perdagangan, Jasa, F&B..."
                className="w-full px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Lama Usaha Berjalan */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Lama Usaha Berjalan (Tahun)</label>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {formData.lamaUsaha} Tahun
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={formData.lamaUsaha}
              onChange={(e) => updateField('lamaUsaha', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>6 Bulan</span>
              <span>2 Tahun</span>
              <span>5+ Tahun (Matang)</span>
            </div>
          </div>

          {/* Sistem Pencatatan & Tempat Usaha */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Pembukuan</label>
              <select
                value={formData.pencatatan}
                onChange={(e) => updateField('pencatatan', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="digital">POS / Aplikasi Digital</option>
                <option value="sederhana">Buku Tulis Sederhana</option>
                <option value="manual">Manual / Ingatan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Status Tempat</label>
              <select
                value={formData.statusTempat}
                onChange={(e) => updateField('statusTempat', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="milik_sendiri">Milik Sendiri</option>
                <option value="sewa">Sewa / Kontrak</option>
              </select>
            </div>
          </div>

          {/* Proporsi QRIS & Digital */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Transaksi Digital (QRIS / Transfer Bank)</label>
              <span className="font-bold text-slate-800">{formData.persenDigital}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.persenDigital}
              onChange={(e) => updateField('persenDigital', parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Riwayat SLIK OJK (Bi-Checking) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
              Riwayat Kolektibilitas SLIK OJK (iDeb)
            </span>
            <p className="text-xs text-slate-500 my-2">
              Kolektibilitas perbankan/leasing merupakan faktor penentu utama (bobot hingga 40 poin kualitatif).
            </p>

            <div className="space-y-2 mt-3">
              {slikOptions.map((opt) => (
                <label
                  key={opt.kol}
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.slikOjk === opt.kol
                      ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="slikOjk"
                    checked={formData.slikOjk === opt.kol}
                    onChange={() => updateField('slikOjk', opt.kol)}
                    className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{opt.label}</span>
                    <span className="text-[11px] text-slate-500">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-600">Skor Kualitatif 5C:</span>
            <span className="font-extrabold text-indigo-700 text-sm">
              {analysis.totalQualitativeScore100} / 100 Poin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
