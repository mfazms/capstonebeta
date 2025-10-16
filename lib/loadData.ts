// lib/loadData.ts
import type { Plant } from "./types";

/**
 * Baca data tanaman.
 * - SSR (Node): baca file public/data/PlantsData.json
 * - Client: fetch /api/plants
 * - Set path gambar default => /images/plants/{id}.(jpg|jpeg|png) akan dipilih otomatis di komponen
 */
export async function fetchPlants(): Promise<Plant[]> {
  const normalize = (p: Plant): Plant => ({
    ...p,
    image: p.image ?? `/images/plants/${p.id}.jpg`,
  });

  // SSR (Node.js)
  if (typeof window === "undefined") {
    const { readFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const file = await readFile(
      join(process.cwd(), "public", "data", "PlantsData.json"),
      "utf-8"
    );
    const data: unknown = JSON.parse(file);
    const arr = Array.isArray(data) ? (data as Plant[]) : [];
    return arr.map(normalize);
  }

  // Client
  const res = await fetch("/api/plants", { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal memuat data tanaman");
  const data = (await res.json()) as Plant[];
  return data.map(normalize);
}
