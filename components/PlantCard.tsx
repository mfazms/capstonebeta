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
    <div
      className="
        group relative rounded-2xl bg-slate-50 ring-1 ring-emerald-100
        shadow-sm hover:shadow-[0_6px_20px_rgba(16,185,129,0.12)]
        transition
      "
    >
      {/* checkbox pilih */}
      {onToggleSelect && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSelect?.(plant.id);
          }}
          className="
            absolute top-3 right-3 z-10
            flex items-center justify-center w-5 h-5 rounded-md
            bg-white/90 hover:bg-emerald-50 border border-emerald-300
            text-emerald-700 focus:outline-none
          "
          title={selected ? "Hapus dari pilihan" : "Pilih tanaman ini"}
        >
          {selected ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 13.5L3.5 9.5L4.91 8.09L7.5 10.67L15.09 3.09L16.5 4.5L7.5 13.5Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3.5"
                y="3.5"
                width="13"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      )}

      <Link href={`/tanaman/${plant.id}`} className="block p-4">
        {/* area gambar dengan padding agar tidak terlalu besar */}
        <div
          className="
            relative mb-4 rounded-xl overflow-hidden bg-white
            ring-1 ring-gray-100 flex items-center justify-center
          "
        >
          {/* aspect ratio 4:3 */}
          <div className="relative w-full">
            <div className="pt-[75%]" />
            <img
              src={`/api/plant-image?id=${plant.id}`}
              alt={title}
              className="
                absolute inset-0 w-full h-full object-contain
                p-3 transition-transform duration-300 group-hover:scale-[1.05]
              "
              loading="lazy"
            />
          </div>
        </div>

        {/* teks */}
        <div className="font-semibold text-lg text-emerald-800 leading-tight">
          {title}
        </div>
        <div className="text-sm text-gray-500 italic mt-0.5">{subtitle}</div>
      </Link>
    </div>
  );
}
