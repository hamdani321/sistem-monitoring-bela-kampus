type PortalStatus = "aktif" | "akan-datang" | "selesai";

export const getPortalStatus = (
  waktuMulai: string,
  waktuSelesai: string
): PortalStatus => {
  const now = Date.now();
  const start = new Date(waktuMulai).getTime();
  const end = new Date(waktuSelesai).getTime();

  if (now < start) return "akan-datang";
  if (now > end) return "selesai";

  return "aktif";
};
