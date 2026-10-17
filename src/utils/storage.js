const STORAGE_KEY = 'pertiwi_finscore_profiles_v1';

/**
 * Mengambil daftar seluruh profil tersimpan dari localStorage
 */
export function getSavedProfiles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Gagal membaca profil dari localStorage:', err);
    return [];
  }
}

/**
 * Menyimpan profil usaha baru atau memperbarui yang lama
 */
export function saveProfile(profileData) {
  try {
    const profiles = getSavedProfiles();
    const id = profileData.id || `profile_${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const index = profiles.findIndex((p) => p.id === id);
    const updatedProfile = {
      ...profileData,
      id,
      updatedAt: timestamp
    };

    if (index >= 0) {
      profiles[index] = updatedProfile;
    } else {
      profiles.unshift(updatedProfile);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return updatedProfile;
  } catch (err) {
    console.error('Gagal menyimpan profil ke localStorage:', err);
    return null;
  }
}

/**
 * Menghapus profil berdasarkan id
 */
export function deleteProfile(id) {
  try {
    const profiles = getSavedProfiles().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (err) {
    console.error('Gagal menghapus profil:', err);
    return false;
  }
}

/**
 * Ekspor data profil sebagai file JSON yang dapat diunduh
 */
export function exportProfileToJson(profileData) {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(profileData, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const cleanName = (profileData.namaUsaha || 'profil_umkm').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  downloadAnchor.setAttribute('download', `${cleanName}_finscore_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
