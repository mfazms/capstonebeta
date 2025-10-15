"use client";
import Link from "next/link";
import type { Plant } from "@/lib/types";

/** Ambil nama umum paling spesifik (biasanya kultivar) */
const preferredCommon = (p: Plant) => {
  const commons = Array.isArray((p as any).common) ? (p as any).common : [];
  return commons[1] ?? commons[0] ?? p.latin;
};

export default function PlantCard({
  plant,
  selected = false,
  onToggleSelect,
}: {
  plant: Plant;
  selected?: boolean;
  onToggleSelect?: (id: number) => void;
}) {
  const title = preferredCommon(plant);
  const subtitle = plant.latin;

  return (
    <div className="rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition relative">
      {onToggleSelect && (
        <label className="absolute top-3 right-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(plant.id)}
            aria-label={`Pilih ${title}`}
          />
        </label>
      )}

      <Link href={`/tanaman/${plant.id}`} className="block">
        <div className="w-full h-40 mb-3 flex items-center justify-center bg-white rounded-md overflow-hidden">
          <img
            src={`/api/plant-image?id=${plant.id}`}
            alt={title}
            className="max-h-40 object-contain"
            loading="lazy"
          />
        </div>

        <div className="font-semibold text-lg text-emerald-800">{title}</div>
        <div className="text-sm text-gray-500 italic">{subtitle}</div>
      </Link>
    </div>
  );
}
