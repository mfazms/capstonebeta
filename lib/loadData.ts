// lib/loadData.ts
import type { Plant } from "./types";

const normalize = (p: Plant): Plant => ({
  ...p,
  image: p.image ?? `/images/plants/${p.id}.jpg`,
});

/**
 * Baca data tanaman.
 * - SSR: langsung import JSON (dibundel saat build) → TANPA network
 * - Client: fetch ke /api/plants
 */
export async function fetchPlants(): Promise<Plant[]> {
  // Server (SSR / RSC / Route Handlers)
  if (typeof window === "undefined") {
    try {
      const raw = (await import("@/public/data/PlantsData.json")).default as Plant[];
      return raw.map(normalize);
    } catch (err) {
      // Biar gampang trace kalau masih ada masalah
      console.error("[fetchPlants][SSR] gagal import JSON:", err);
      throw new Error("Gagal memuat data tanaman (SSR)");
    }
  }

  // Client
  const res = await fetch("/api/plants", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Gagal memuat data tanaman (Client): ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as Plant[];
  return data.map(normalize);
}
