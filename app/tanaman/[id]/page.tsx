// app/tanaman/[id]/page.tsx
import { fetchPlants } from "@/lib/loadData";
import Image from "next/image";
import { displayName } from "@/lib/types";

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plants = await fetchPlants();
  const plant = plants.find((p) => p.id === Number(id));
  if (!plant) return <main className="max-w-3xl mx-auto p-8">Tanaman tidak ditemukan.</main>;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <a href="/rekomendasi" className="text-emerald-700 hover:underline">&larr; Kembali</a>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-[320px] md:h-[420px]">
          <Image
            src={plant.image ?? `/images/plants/${plant.id}.jpg`}
            alt={plant.latin}
            fill
            className="object-contain rounded-lg bg-white"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{displayName(plant)}</h1>
          <p className="text-gray-600 italic">{plant.latin}</p>

          <dl className="mt-5 space-y-2 text-sm leading-6">
            <div><dt className="font-semibold inline">Family:</dt> <dd className="inline text-gray-800">{plant.family ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Kategori:</dt> <dd className="inline text-gray-800">{plant.category ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Asal/Origin:</dt> <dd className="inline text-gray-800">{plant.origin ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Iklim:</dt> <dd className="inline text-gray-800">{plant.climate ?? "-"}</dd></div>
            <div>
              <dt className="font-semibold inline">Suhu ideal:</dt>{" "}
              <dd className="inline text-gray-800">
                {plant.tempmin?.celsius ?? "-"}°C — {plant.tempmax?.celsius ?? "-"}°C
                {" "}( {plant.tempmin?.fahrenheit ?? "-"}–{plant.tempmax?.fahrenheit ?? "-"}°F )
              </dd>
            </div>
            <div><dt className="font-semibold inline">Cahaya ideal:</dt> <dd className="inline text-gray-800">{plant.ideallight ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Cahaya toleran:</dt> <dd className="inline text-gray-800">{plant.toleratedlight ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Penyiraman:</dt> <dd className="inline text-gray-800">{plant.watering ?? "-"}</dd></div>
            <div><dt className="font-semibold inline">Hama:</dt> <dd className="inline text-gray-800">{(plant.insects ?? []).join(", ") || "-"}</dd></div>
            <div><dt className="font-semibold inline">Penyakit:</dt> <dd className="inline text-gray-800">{(plant.diseases ?? []).join(", ") || "-"}</dd></div>
            <div><dt className="font-semibold inline">Penggunaan:</dt> <dd className="inline text-gray-800">{(plant.use ?? []).join(", ") || "-"}</dd></div>
          </dl>
        </div>
      </div>
    </main>
  );
}
