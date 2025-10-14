"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Plant, UserFilter } from "@/lib/types";
import { fetchPlants } from "@/lib/loadData";
import { recommend } from "@/lib/recommend";
import FiltersPanel from "@/components/FiltersPanel";
import PlantList from "@/components/PlantList";
import ExportPDFButton from "@/components/ExportPDFButton";

export default function RekomendasiPage() {
  const [all, setAll] = useState<Plant[]>([]);
  const [shown, setShown] = useState<Plant[]>([]);
  const [filter, setFilter] = useState<UserFilter>({});
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    fetchPlants().then((data) => {
      setAll(data);
      setShown(data);
    });
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(all, {
        includeScore: false,
        threshold: 0.3,
        keys: ["latin", "common", "category", "climate", "use"],
      }),
    [all]
  );

  const onGenerate = () => {
    const scored = recommend(all, filter).map((s) => s.plant);
    const afterSearch =
      query.trim().length === 0
        ? scored
        : fuse
            .search(query)
            .map((r) => r.item)
            .filter((p) => scored.some((x) => x.id === p.id));
    setShown(afterSearch);
  };

  const onSearchChange = (val: string) => {
    setQuery(val);
    if (val.trim().length === 0) {
      const scored = recommend(all, filter).map((s) => s.plant);
      setShown(scored.length ? scored : all);
      return;
    }
    setShown(fuse.search(val).map((r) => r.item));
  };

  const toggleSelect = (id: number) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const selectedPlants = shown.filter((p) => selected.includes(p.id));

  return (
    <main className="min-h-[100dvh] bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-[340px_1fr]">
        {/* SIDEBAR — sticky, tidak ikut scroll konten */}
        <aside className="bg-emerald-900 p-6 md:sticky md:top-0 md:h-[100dvh] md:overflow-y-auto">
          <div className="mb-6 text-2xl font-semibold">Plantify Garden</div>
          <FiltersPanel
            filter={filter}
            onChange={setFilter}
            onGenerate={onGenerate}
            allPlants={all}
          />
          <div className="mt-6">
            <ExportPDFButton
              plants={selectedPlants}
              disabled={selectedPlants.length === 0}
            />
          </div>
        </aside>

        {/* CONTENT */}
        <section className="p-6 md:p-8 bg-black">
          <div className="mx-auto max-w-6xl">
            <input
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search plants..."
              className="mb-6 w-full rounded-xl border border-white/10 bg-emerald-950/30 px-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <PlantList
              plants={shown}
              selectedIds={selected}
              onToggleSelect={toggleSelect}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
