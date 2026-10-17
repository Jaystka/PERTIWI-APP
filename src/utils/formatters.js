/**
 * Format angka menjadi format Rupiah standar (contoh: Rp 50.000.000)
 */
export const formatRupiah = (angka) => {
  if (angka === null || angka === undefined || isNaN(angka)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(angka));
};

/**
 * Format angka Rupiah ringkas untuk grafik & kartu ringkasan (contoh: Rp 50 Jt, Rp 1.2 M)
 */
export const formatSingkatRupiah = (angka) => {
  if (!angka || isNaN(angka)) return 'Rp 0';
  const abs = Math.abs(angka);
  const sign = angka < 0 ? '-' : '';
  if (abs >= 1e9) return `${sign}Rp ${(abs / 1e9).toFixed(1)} M`;
  if (abs >= 1e6) return `${sign}Rp ${(abs / 1e6).toFixed(1)} Jt`;
  if (abs >= 1e3) return `${sign}Rp ${(abs / 1e3).toFixed(0)} Rb`;
  return `${sign}Rp ${abs.toLocaleString('id-ID')}`;
};

/**
 * Format persentase dengan 1 desimal
 */
export const formatPercent = (angka, decimals = 1) => {
  if (angka === null || angka === undefined || isNaN(angka)) return '0%';
  return `${Number(angka).toFixed(decimals)}%`;
};

/**
 * Format rasio x (contoh: 1.75x)
 */
export const formatRatio = (angka, decimals = 2) => {
  if (angka === null || angka === undefined || isNaN(angka)) return '0.00x';
  return `${Number(angka).toFixed(decimals)}x`;
};
