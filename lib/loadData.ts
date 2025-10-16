// lib/loadData.ts
import type { Plant } from "./types";

const normalize = (p: Plant): Plant => ({
  ...p,
  image: p.image ?? `/images/plants/${p.id}.jpg`,
});

function getBaseUrlForServer(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function fetchPlants(): Promise<Plant[]> {
  // SSR: pakai base absolut
  if (typeof window === "undefined") {
    const base = getBaseUrlForServer();
    const res = await fetch(`${base}/api/plants`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error("Gagal memuat data tanaman (SSR)");
    const data = (await res.json()) as Plant[];
    return data.map(normalize);
  }

  // Client: relatif
  const res = await fetch("/api/plants", { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat data tanaman");
  const data = (await res.json()) as Plant[];
  return data.map(normalize);
}
