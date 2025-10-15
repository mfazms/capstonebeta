// app/api/plants/route.ts
export const runtime = "nodejs"; // pastikan pakai runtime Node (bukan Edge)
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// daftar kemungkinan nama file yang akan dicoba
const CANDIDATES = [
  "PlantsData.json",
  "Plants Data.json",
  "plantsData.json",
  "plants_data.json",
];

/** Helper untuk ubah nilai jadi array string aman */
const toList = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.filter((x) => x != null && String(x).trim() !== "").map(String)
    : v == null || String(v).trim() === ""
    ? []
    : [String(v)];

/** Normalisasi data tiap tanaman */
function normalizePlant(raw: any) {
  const id = raw?.id ?? 0;
  const image = raw?.image ?? `/images/plants/${id}.jpg`;
  return {
    ...raw,
    image,
    insects: toList(raw?.insects),
    diseases: toList(raw?.diseases),
    use: toList(raw?.use),
  };
}

/** GET handler */
export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), "public", "data");

    // coba baca tiap kemungkinan nama file sampai ada yang berhasil
    for (const name of CANDIDATES) {
      const filePath = path.join(baseDir, name);
      try {
        const content = await fs.readFile(filePath, "utf-8");
        const json = JSON.parse(content);
        if (Array.isArray(json)) {
          const normalized = json.map(normalizePlant);
          return NextResponse.json(normalized, {
            headers: { "Cache-Control": "no-store" },
          });
        }
      } catch {
        // lanjut ke kandidat berikutnya
      }
    }

    return NextResponse.json(
      {
        error:
          "File data tanaman tidak ditemukan di /public/data. Gunakan salah satu nama: " +
          CANDIDATES.join(", "),
      },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
