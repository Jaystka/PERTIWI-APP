import React from 'react';
import { Award, Briefcase, Store, ShieldCheck, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export default function KualitatifTab({ formData, updateField, analysis }) {
  const slikOptions = [
    {
      kol: 1,
      badge: 'Kol 1 - Lancar',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'Tidak pernah menunggak, pembayaran bunga & pokok selalu tepat waktu',
      scoreImpact: '+40 Poin (Maksimal)'
    },
    {
      kol: 2,
      badge: 'Kol 2 - DPK',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'Dalam Perhatian Khusus (Pernah telat bayar 1–90 hari)',
      scoreImpact: '+24 Poin (Perlu Klarifikasi)'
    },
    {
      kol: 3,
      badge: 'Kol 3 - Kurang Lancar',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      desc: 'Tunggakan aktif 91–120 hari di lembaga keuangan',
      scoreImpact: '+10 Poin (Risiko Tinggi)'
    },
    {
      kol: 4,
      badge: 'Kol 4 - Diragukan',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      desc: 'Tunggakan aktif 121–180 hari',
      scoreImpact: 'Penalti Keras (Hard Knock-Out)'
    },
    {
      kol: 5,
      badge: 'Kol 5 - Macet',
      badgeColor: 'bg-rose-200 text-rose-900 border-rose-400',
      desc: 'Tunggakan aktif > 180 hari (NPL Akut)',
      scoreImpact: 'Otomatis Ditolak'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Educational Banner */}
      <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-start gap-2.5 text-xs text-indigo-900">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Analisis Kualitatif 5C (Bobot 40%):</strong> Menilai rekam jejak integritas nasabah (SLIK OJK), kematangan usaha, kesiapan pembukuan digital, dan kepemilikan agunan/tempat usaha.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identitas & Legalitas Usaha */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block pb-2 border-b border-slate-100">
            Identitas Usaha & Kesiapan Digital
          </span>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Nama Usaha / Toko</label>
            <input
              type="text"
              value={formData.namaUsaha || ''}
              onChange={(e) => updateField('namaUsaha', e.target.value)}
              placeholder="Contoh: Toko Sembako Berkah"
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
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
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Sektor Usaha</label>
              <input
                type="text"
                value={formData.sektor || ''}
                onChange={(e) => updateField('sektor', e.target.value)}
                placeholder="Perdagangan, Jasa..."
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Lama Usaha Berjalan */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Lama Usaha Beroperasi</label>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
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
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>6 Bulan (Baru)</span>
              <span>3 Tahun (Stabil)</span>
              <span>5+ Tahun (Matang)</span>
            </div>
          </div>

          {/* Sistem Pencatatan & Tempat Usaha */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Metode Pembukuan</label>
              <select
                value={formData.pencatatan}
                onChange={(e) => updateField('pencatatan', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer shadow-2xs"
              >
                <option value="digital">POS / Aplikasi Kasir Digital</option>
                <option value="sederhana">Buku Tulis Sederhana</option>
                <option value="manual">Manual / Mengandalkan Ingatan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Status Tempat Usaha</label>
              <select
                value={formData.statusTempat}
                onChange={(e) => updateField('statusTempat', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer shadow-2xs"
              >
                <option value="milik_sendiri">Milik Sendiri (Bebas Sewa)</option>
                <option value="sewa">Sewa / Kontrak Tahunan</option>
              </select>
            </div>
          </div>

          {/* Proporsi QRIS & Digital */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <label>Transaksi Non-Tunai (QRIS & Transfer Bank)</label>
              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{formData.persenDigital}%</span>
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
            <span className="text-[10px] text-slate-400 block">
              Semakin tinggi transaksi QRIS, semakin mudah mutasi rekening diverifikasi analis perbankan.
            </span>
          </div>
        </div>

        {/* Riwayat SLIK OJK (Bi-Checking) */}
        <div className="space-y-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block pb-2 border-b border-slate-200">
              Riwayat Kolektibilitas SLIK OJK (iDeb)
            </span>
            <p className="text-xs text-slate-500 my-2">
              Kolektibilitas perbankan/leasing adalah faktor integritas utama dengan bobot hingga 40 poin.
            </p>

            <div className="space-y-2 mt-2">
              {slikOptions.map((opt) => (
                <label
                  key={opt.kol}
                  className={`p-2.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
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
                    className="mt-1 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${opt.badgeColor}`}>
                        {opt.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{opt.scoreImpact}</span>
                    </div>
                    <span className="text-[11px] text-slate-600 block leading-tight">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between shadow-2xs">
            <span className="text-slate-600 font-medium">Skor Kualitatif Karakter 5C:</span>
            <span className="font-black text-indigo-700 text-sm">
              {analysis.totalQualitativeScore100} / 100 Poin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
