"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Plant } from "@/lib/types";

/** Ambil nama paling “spesifik” untuk judul kartu:
 *  - kalau ada 2+ common name, pakai indeks [1] (biasanya kultivar/varian, mis. "Amelia")
 *  - kalau tidak ada, fallback ke common[0]
 *  - kalau tidak ada keduanya, fallback ke latin
 */
const preferredCommon = (p: Plant) => {
  const commons = Array.isArray((p as any).common) ? (p as any).common : [];
  return commons[1] ?? commons[0] ?? p.latin;
};

/** Kumpulan kandidat sumber gambar (dicoba berurutan sampai ada yang berhasil) */
const srcCandidates = (p: Plant) =>
  Array.from(
    new Set(
      [
        p.image, // dari loader/data
        `/images/plants/${p.id}.jpg`, // default per id
        `/images/placeholder-plant.jpg`, // placeholder global
      ].filter(Boolean) as string[]
    )
  );

export default function PlantCard({
  plant,
  selected = false,
  onToggleSelect,
}: {
  plant: Plant;
  selected?: boolean;
  onToggleSelect?: (id: number) => void;
}) {
  const candidates = useMemo(() => srcCandidates(plant), [plant]);
  const [src, setSrc] = useState<string>(candidates[0]);

  // Jika gagal load gambar, coba kandidat berikutnya
  const onErr = () => {
    const idx = candidates.indexOf(src);
    const next = candidates[idx + 1];
    if (next) setSrc(next);
  };

  const title = preferredCommon(plant); // ex: "Amelia"
  const subtitle = plant.latin;         // ex: "Aglaonema"

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
            alt={title}
            onError={onErr}
            className="max-h-40 object-contain"
            loading="lazy"
          />
        </div>

        {/* Judul besar: kultivar/common */}
        <div className="font-semibold text-lg text-gray-900">{title}</div>
        {/* Subjudul kecil: nama latin */}
        <div className="text-sm text-gray-500">{subtitle}</div>
      </Link>
    </div>
  );
}
