// app/api/plants/route.ts
import { NextResponse } from "next/server";
import type { Plant } from "@/lib/types";

// Gunakan dynamic import agar tidak perlu mengubah tsconfig.
// (Next akan membundel JSON ini saat build)
export const dynamic = "force-static"; // aman di edge/lambda
export const runtime = "nodejs";       // atau 'edge' juga oke di sini

export async function GET() {
  try {
    const json = (await import("@/public/data/PlantsData.json")).default as Plant[];
    // Optional: normalisasi ringan bila perlu
    const plants: Plant[] = json.map((p) => ({ ...p }));

    return NextResponse.json(plants, {
      headers: {
        // Cache di CDN saja; data jarang berubah
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[/api/plants] load error:", err);
    return NextResponse.json({ error: "Failed to load plants" }, { status: 500 });
  }
}
