// lib/loadData.ts
import type { Plant } from "./types";

/** Normalisasi 1 tanaman */
const normalize = (p: Plant): Plant => ({
  ...p,
  // biar komponen gambar bisa fallback otomatis
  image: p.image ?? `/images/plants/${p.id}.jpg`,
});

/** Ambil base URL untuk SSR (Vercel/Local) */
function getBaseUrlForServer(): string {
  // Jika kamu set NEXT_PUBLIC_SITE_URL di Vercel (mis. https://capstonebeta.vercel.app)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  // VERCEL_URL ada di runtime Vercel (tanpa protokol)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // fallback local dev
  return "http://localhost:3000";
}

/**
 * Baca data tanaman:
 * - SSR (Node/Vercel): fetch ke /api/plants dengan base URL absolut
 * - Client: fetch relatif ke /api/plants
 */
export async function fetchPlants(): Promise<Plant[]> {
  // SSR
  if (typeof window === "undefined") {
    const base = getBaseUrlForServer();
    const res = await fetch(`${base}/api/plants`, {
      cache: "no-store",
      // penting untuk Next.js 15 supaya request tidak di-reuse antar render
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error("Gagal memuat data tanaman (SSR)");
    const data = (await res.json()) as Plant[];
    return data.map(normalize);
  }

  // Client
  const res = await fetch("/api/plants", { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat data tanaman");
  const data = (await res.json()) as Plant[];
  return data.map(normalize);
}
