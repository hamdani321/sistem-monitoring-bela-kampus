export function FormatDate(date: string = "2026-09-01 00:00:00") {
  const tanggal = new Date(date);

  const hasil = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(tanggal);

  return hasil;
}
