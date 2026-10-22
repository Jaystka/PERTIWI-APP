import React, { useState, useEffect } from 'react';
import {
  getSavedProfiles,
  saveProfile,
  deleteProfile,
  exportProfileToJson
} from '../utils/storage';
import { formatRupiah } from '../utils/formatters';
import { X, Save, FolderOpen, Trash2, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function ProfileManagerModal({
  isOpen,
  onClose,
  currentFormData,
  onLoadProfile,
  analysis
}) {
  const [profiles, setProfiles] = useState([]);
  const [saveName, setSaveName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProfiles(getSavedProfiles());
      setSaveName(currentFormData.namaUsaha || '');
      setFeedbackMsg('');
    }
  }, [isOpen, currentFormData]);

  if (!isOpen) return null;

  const handleSaveCurrent = (e) => {
    e.preventDefault();
    if (!saveName.trim()) return;

    const toSave = {
      ...currentFormData,
      id: `profile_${Date.now()}`,
      namaUsaha: saveName.trim(),
      savedScore: analysis.finalCreditScore,
      savedGrade: analysis.grade
    };

    saveProfile(toSave);
    setProfiles(getSavedProfiles());
    setFeedbackMsg(`Profil "${saveName}" berhasil disimpan!`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus profil "${nama}"?`)) {
      deleteProfile(id);
      setProfiles(getSavedProfiles());
    }
  };

  const handleSelectProfile = (item) => {
    onLoadProfile(item);
    onClose();
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          saveProfile(parsed);
          setProfiles(getSavedProfiles());
          onLoadProfile(parsed);
          setFeedbackMsg('Profil dari file JSON berhasil dimuat!');
          setTimeout(() => setFeedbackMsg(''), 3000);
        }
      } catch (err) {
        alert('File JSON tidak valid atau rusak.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-white text-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Profil & Penyimpanan Lokal UMKM</h3>
              <p className="text-[11px] text-slate-500">
                Simpan beberapa nasabah di peramban, unduh backup JSON, atau muat data lama
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 rounded-lg p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Feedback alert */}
          {feedbackMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Form Simpan Profil Aktif */}
          <form onSubmit={handleSaveCurrent} className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Simpan Profil Nasabah Saat Ini:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Nama Usaha / Nasabah..."
                className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
            </div>
          </form>

          {/* Quick Import / Export JSON */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">Backup File JSON:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => exportProfileToJson(currentFormData)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold"
              >
                <Download className="w-3 h-3 text-indigo-600" />
                <span>Ekspor JSON</span>
              </button>

              <label className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer">
                <Upload className="w-3 h-3 text-emerald-600" />
                <span>Impor JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Daftar Profil Tersimpan */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Profil Tersimpan di Browser ({profiles.length})
              </span>
            </div>

            {profiles.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                Belum ada profil UMKM yang disimpan di penyimpanan lokal browser.
              </div>
            ) : (
              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {profiles.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg border border-slate-200 hover:border-indigo-300 bg-white flex items-center justify-between gap-3 text-xs shadow-2xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">{p.namaUsaha || 'Tanpa Nama'}</h4>
                      <p className="text-[11px] text-slate-400">
                        {p.sektor || 'Sektor belum ditentukan'} • Omzet: {formatRupiah(p.omzetBulanan)}
                      </p>
                      {p.savedScore && (
                        <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded mt-0.5">
                          Skor: {p.savedScore} (Grade {p.savedGrade})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectProfile(p)}
                        className="px-3 py-1.5 text-xs font-bold rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                      >
                        Buka
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.namaUsaha)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                        title="Hapus profil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
