// lib/loadData.ts
import type { Plant } from "./types";

/**
 * Baca data tanaman.
 * - SSR: pakai fs dari /public/data/PlantsData.json (paling stabil)
 * - Client: fetch ke /data/PlantsData.json
 * - Set path gambar default => /images/plants/{id}.jpg
 *   (nanti kartu handle fallback ke placeholder saat 404)
 */
export async function fetchPlants(): Promise<Plant[]> {
  const mapImage = (p: Plant): Plant => ({
    ...p,
    image: p.image ?? `/images/plants/${p.id}.jpg`,
  });

  if (typeof window === "undefined") {
    // Server (SSR)
    const fs = await import("fs/promises");
    const path = await import("path");
    const file = await fs.readFile(
      path.join(process.cwd(), "public", "data", "PlantsData.json"),
      "utf-8"
    );
    const data: Plant[] = JSON.parse(file);
    return data.map(mapImage);
  }

  // Client
  const res = await fetch("/data/PlantsData.json", { cache: "no-store" });
  const data: Plant[] = await res.json();
  return data.map(mapImage);
}
