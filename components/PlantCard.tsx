"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Plant, displayName } from "@/lib/types";

export default function PlantCard({
  plant,
  selected = false,
  onToggleSelect,
}: {
  plant: Plant;
  selected?: boolean;
  onToggleSelect?: (id: number) => void;
}) {
  // src awal → image dari loader atau default /images/plants/{id}.jpg
  const initialSrc = useMemo(
    () => plant.image ?? `/images/plants/${plant.id}.jpg`,
    [plant.image, plant.id]
  );
  const [src, setSrc] = useState(initialSrc);

  return (
    <div className="rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition relative">
      {/* Checkbox pilih */}
      {onToggleSelect && (
        <label className="absolute top-3 right-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(plant.id)}
          />
          Pilih
        </label>
      )}

      {/* Klik card => ke halaman detail */}
      <Link href={`/tanaman/${plant.id}`} className="block">
        <div className="w-full h-40 mb-3 flex items-center justify-center bg-white rounded-md overflow-hidden">
          <img
            src={src}
            alt={plant.latin}
            onError={() => setSrc("/images/plants/placeholder-plant.jpg")}
            className="max-h-40 object-contain"
            loading="lazy"
          />
        </div>
        <div className="font-semibold">{displayName(plant)}</div>
        <div className="text-sm text-gray-500">{plant.latin}</div>
      </Link>
    </div>
  );
}
