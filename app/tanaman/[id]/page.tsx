import { fetchPlants } from "@/lib/loadData";
import { displayName } from "@/lib/types";
import PlantImage from "@/components/PlantImage";
import ExportPDFButton from "@/components/ExportPDFButton";

const toList = (v: unknown) =>
  Array.isArray(v) ? v.map(String) : v == null ? [] : [String(v)];

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plants = await fetchPlants();
  const plant = plants.find((p) => p.id === Number(id));

  if (!plant)
    return (
      <main className="max-w-3xl mx-auto p-8 bg-white text-gray-900">
        Tanaman tidak ditemukan.
      </main>
    );

  const plantForPdf = { ...plant, image: `/api/plant-image?id=${plant.id}` };

  return (
    <main className="min-h-[100dvh] bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header actions */}
        <div className="flex items-center justify-between gap-4">
          <a
            href="/rekomendasi"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
          >
            <span aria-hidden>←</span> Kembali
          </a>

          <ExportPDFButton
            plants={[plantForPdf]}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
            label="Export PDF"
            icon
          />
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-8">
          {/* Gambar: container rasio 4:3 */}
          <div className="w-full">
            <div className="relative w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
              <div className="pt-[75%]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlantImage
                  id={plant.id}
                  alt={plant.latin}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Detail tanaman */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800">
              {displayName(plant)}
            </h1>
            <p className="mt-1 text-lg md:text-xl italic text-emerald-700/80">
              {plant.latin}
            </p>

            <dl className="mt-6 space-y-3 text-base md:text-lg leading-7">
              <div>
                <dt className="font-semibold text-emerald-900 inline">Family:</dt>{" "}
                <dd className="inline text-gray-800">{plant.family ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Kategori:</dt>{" "}
                <dd className="inline text-gray-800">{plant.category ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Asal/Origin:</dt>{" "}
                <dd className="inline text-gray-800">{plant.origin ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Iklim:</dt>{" "}
                <dd className="inline text-gray-800">{plant.climate ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Suhu ideal:</dt>{" "}
                <dd className="inline text-gray-800">
                  {plant.tempmin?.celsius ?? "-"}°C — {plant.tempmax?.celsius ?? "-"}°C (
                  {plant.tempmin?.fahrenheit ?? "-"}–{plant.tempmax?.fahrenheit ?? "-"}°F )
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Cahaya ideal:</dt>{" "}
                <dd className="inline text-gray-800">{plant.ideallight ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Cahaya toleran:</dt>{" "}
                <dd className="inline text-gray-800">{plant.toleratedlight ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Penyiraman:</dt>{" "}
                <dd className="inline text-gray-800">{plant.watering ?? "-"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Hama:</dt>{" "}
                <dd className="inline text-gray-800">
                  {toList(plant.insects).join(", ") || "-"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Penyakit:</dt>{" "}
                <dd className="inline text-gray-800">
                  {toList(plant.diseases).join(", ") || "-"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-emerald-900 inline">Penggunaan:</dt>{" "}
                <dd className="inline text-gray-800">
                  {toList(plant.use).join(", ") || "-"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Branding aplikasi */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          © 2025 <span className="text-emerald-700 font-semibold">Plantify</span> — Smart Plant Recommender Application
        </div>
      </div>
    </main>
  );
}
