// lib/recommend.ts
import type { Plant, UserFilter } from "./types";

export type Scored = { plant: Plant; score: number };

/** Skor sederhana sesuai filter user */
export function recommend(all: Plant[], f: UserFilter): Scored[] {
  const trimmed = {
    light: f.light?.trim(),
    climate: f.climate?.trim(),
    aesthetic: f.aesthetic?.trim(),
    category: f.category?.trim(),
    watering: f.watering?.trim(),
  };

  const list: Scored[] = all.map((p) => {
    let s = 0;

    if (trimmed.category && p.category === trimmed.category) s += 3;

    if (trimmed.climate && p.climate?.toLowerCase() === trimmed.climate.toLowerCase()) s += 2;

    if (trimmed.light) {
      const ideal = (p.ideallight ?? "").toLowerCase();
      const toleran = (p.toleratedlight ?? "").toLowerCase();
      if (ideal.includes(trimmed.light.toLowerCase())) s += 2;
      else if (toleran.includes(trimmed.light.toLowerCase())) s += 1;
    }

    if (trimmed.aesthetic) {
      const uses = Array.isArray(p.use) ? p.use.map(String) : [];
      if (uses.some((u) => u.toLowerCase().includes(trimmed.aesthetic!.toLowerCase()))) s += 1;
    }

    if (trimmed.watering) {
      const w = String(p.watering ?? "").toLowerCase();
      if (w.includes(trimmed.watering.toLowerCase())) s += 1;
    }

    return { plant: p, score: s };
  });

  // urutkan by skor desc, lalu nama latin asc
  return list
    .sort((a, b) => (b.score - a.score) || a.plant.latin.localeCompare(b.plant.latin));
}
