export function formatNumber(
  value: number | string,
  decimals: number = 0
): string {
  if (value === null || value === undefined || value === '') {
    return '0';
  }

  const num = Number(value);

  if (isNaN(num)) {
    return '0';
  }

  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatSpendingRate(value: number | string): string {
  return formatNumber(value, 1);
}
