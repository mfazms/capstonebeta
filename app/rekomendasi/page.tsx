"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Plant, UserFilter } from "@/lib/types";
import { fetchPlants } from "@/lib/loadData";
import { recommend } from "@/lib/recommend";
import FiltersPanel from "@/components/FiltersPanel";
import PlantList from "@/components/PlantList";
import ExportPDFButton from "@/components/ExportPDFButton";

/* ===== UI: Search bar dengan tombol di kanan ===== */
function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search plants...",
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-stretch gap-0">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-12 px-5 rounded-l-full bg-white text-gray-900
          ring-1 ring-emerald-200 focus:ring-2 focus:ring-emerald-400
          outline-none placeholder:text-gray-400
        "
      />
      <button
        onClick={onSubmit}
        className="
          h-12 px-5 rounded-r-full bg-emerald-600 text-white
          hover:bg-emerald-700 active:bg-emerald-800
          ring-1 ring-emerald-600
          inline-flex items-center justify-center gap-2
        "
        aria-label="Search"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}

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

  const onSearchSubmit = () => {
    // klik tombol search → jalankan filter yang sama dengan typing
    onSearchChange(query);
  };

  const toggleSelect = (id: number) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const selectedPlants = shown.filter((p) => selected.includes(p.id));

  return (
    <main className="min-h-[100dvh] bg-white text-gray-900">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 md:grid-cols-[340px_1fr]">
        {/* SIDEBAR */}
        <aside className="bg-emerald-800 text-white p-6 md:sticky md:top-0 md:h-[100dvh] md:overflow-y-auto">
          {/* Tombol kembali ke landing page (lebih kecil) */}
          <div className="mb-4">
            <a
              href="/"
              className="
                inline-flex items-center gap-1.5 rounded-md px-3 py-1.5
                bg-white/10 hover:bg-white/20 transition text-sm font-medium
              "
            >
              <span aria-hidden>←</span>
              <span>Kembali</span>
            </a>
          </div>


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
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2
                         bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm
                         disabled:opacity-50"
              label="Export PDF"
            />
          </div>
        </aside>

        {/* CONTENT */}
        <section className="p-6 md:p-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <div
              className="sticky top-4 z-10 rounded-2xl bg-white/90 backdrop-blur px-5 py-4
                         ring-1 ring-emerald-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-6"
            >
              <SearchBar
                value={query}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
              />
            </div>

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
