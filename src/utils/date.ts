export const formatDateTimeUTC = (isoDate: string): string => {
  const date = new Date(isoDate);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
         `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};
