// lib/loadData.ts
import type { Plant } from "./types";

/** Helper: ubah nilai apapun jadi array string aman */
const toList = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.filter((x) => x != null && String(x).trim() !== "").map(String)
    : v == null || String(v).trim() === ""
    ? []
    : [String(v)];

/**
 * Dapatkan URL gambar dengan format fleksibel (jpg/jpeg/png)
 * tanpa pakai fs (client-safe).
 */
function getImageUrl(id: number): string {
  // urutan prioritas fallback
  const exts = ["jpg", "jpeg", "png"];
  // browser akan langsung pilih yang tersedia karena semua di public/
  // (tidak perlu fetch manual satu per satu)
  return `/images/plants/${id}.jpg`; // default → loader PlantCard akan ganti ke jpeg/png jika jpg gagal
}

/** Normalisasi data tanaman */
function normalizePlant(raw: any): Plant {
  const p = raw as Plant;
  return {
    ...p,
    image: p.image ?? getImageUrl(p.id),
    insects: toList((raw as any).insects),
    diseases: toList((raw as any).diseases),
    use: toList((raw as any).use),
  };
}

/**
 * Fetch data tanaman dari API route (client & server safe)
 */
export async function fetchPlants(): Promise<Plant[]> {
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
      : "";
  const res = await fetch(base + "/api/plants", { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Gagal memuat data tanaman: ${res.statusText}`);

  const data = (await res.json()) as Plant[];
  return data.map(normalizePlant);
}
