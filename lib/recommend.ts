// lib/recommend.ts
import type { Plant, UserFilter } from "./types";

export type Scored = { plant: Plant; score: number };

// lower/contains helpers that are null-safe
const lc = (s?: string) => (s ?? "").toLowerCase();
const contains = (hay?: string, needle?: string) =>
  lc(hay).includes(lc(needle));

/**
 * Map watering description (EN) to 3 UI levels
 * → returns "Light" | "Moderate" | "Frequent"
 */
function mapWatering(desc?: string): "Light" | "Moderate" | "Frequent" {
  const d = lc(desc);
  if (d.includes("water only") || d.includes("must be dry")) return "Light";
  if (d.includes("can be dry") || d.includes("half dry")) return "Moderate";
  if (d.includes("keep moist") || d.includes("must not be dry")) return "Frequent";
  return "Moderate";
}

/** Simple & robust recommendation scoring */
export function recommend(plants: Plant[], f: UserFilter): Scored[] {
  // keep backward-compat if you still pass "placement" somewhere
  const wantLocation = f.location ?? f.placement;

  // 1) light pre-filtering is kept inside scoring; here we just do quick filters
  const candidates = plants.filter((p) => {
    const okClimate = !f.climate || contains(p.climate, f.climate);
    const okWater =
      !f.watering || mapWatering(p.watering) === (f.watering as any);
    return okClimate && okWater;
  });

  // 2) score
  return candidates
    .map((p) => {
      let score = 0;

      // Light: ideal (+2) or tolerated (+1)
      if (f.light) {
        if (contains(p.ideallight, f.light)) score += 2;
        else if (contains(p.toleratedlight, f.light)) score += 1;
      }

      // Location → map roughly to "use" array (legacy support)
      if (wantLocation) {
        const uses = (p.use ?? []).map((u) => lc(u));
        const locMap: Record<string, string[]> = {
          indoor: ["potted plant", "table top"],
          outdoor: ["ground cover"],
          balcony: ["hanging"],
        };
        const keys = locMap[lc(wantLocation)] ?? [];
        if (keys.some((k) => uses.includes(k))) score += 1;
      }

      // Aesthetic: "Table top" | "Hanging" | "Colors / forms"
      if (f.aesthetic) {
        const aeMap: Record<string, string> = {
          "table top": "table top",
          hanging: "hanging",
          "colors / forms": "colors / forms",
        };
        const key = aeMap[lc(f.aesthetic)] ?? lc(f.aesthetic);
        if ((p.use ?? []).some((u) => lc(u) === key)) score += 1;
      }

      // Category exact match
      if (f.category && lc(p.category) === lc(f.category)) score += 1;

      // Small bonus for precise climate match
      if (f.climate && contains(p.climate, f.climate)) score += 0.5;

      return { plant: p, score };
    })
    .sort((a, b) => b.score - a.score);
}
