// lib/loadData.ts
import type { Plant } from "./types";

/** ubah nilai apapun → array string aman */
const toList = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.filter((x) => x != null && String(x).trim() !== "").map(String)
    : v == null || String(v).trim() === ""
    ? []
    : [String(v)];

/** normalisasi satu entri Plant */
function normalizePlant(raw: any): Plant {
  const p = raw as Plant;
  return {
    ...p,
    image: p.image ?? `/images/plants/${p.id}.jpg`,
    // pastikan tiga field ini selalu array string:
    insects: toList((raw as any).insects),
    diseases: toList((raw as any).diseases),
    use: toList((raw as any).use),
  };
}

/**
 * Baca data tanaman.
 * - SSR: pakai fs dari /public/data/PlantsData.json (paling stabil)
 * - Client: fetch ke /data/PlantsData.json
 * - Set path gambar default => /images/plants/{id}.jpg
 * - Normalisasi insects/diseases/use ⇒ selalu string[]
 */
export async function fetchPlants(): Promise<Plant[]> {
  const mapNormalize = (arr: any[]) => arr.map(normalizePlant);

  if (typeof window === "undefined") {
    // Server (SSR)
    const fs = await import("fs/promises");
    const path = await import("path");
    const file = await fs.readFile(
      path.join(process.cwd(), "public", "data", "PlantsData.json"),
      "utf-8"
    );
    const data = JSON.parse(file) as any[];
    return mapNormalize(data);
  }

  // Client
  const res = await fetch("/data/PlantsData.json", { cache: "no-store" });
  const data = (await res.json()) as any[];
  return mapNormalize(data);
}
