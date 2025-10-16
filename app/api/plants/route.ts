// app/api/plants/route.ts
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Plant } from "@/lib/types";

// Pastikan route ini dieksekusi dinamis (tidak di-cache build)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const file = await readFile(
      join(process.cwd(), "public", "data", "PlantsData.json"),
      "utf-8"
    );
    const data: unknown = JSON.parse(file);

    // Validasi ringan supaya tidak pakai `any`
    const list = Array.isArray(data) ? (data as Plant[]) : [];

    // Normalisasi fallback image (dipakai komponen bila perlu)
    const normalized = list.map((p) => ({
      ...p,
      image: p.image ?? `/images/plants/${p.id}.jpg`,
    }));

    return NextResponse.json(normalized, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
