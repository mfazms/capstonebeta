// app/api/plants/route.ts
import { NextResponse } from "next/server";
import type { Plant } from "@/lib/types";

export const dynamic = "force-static"; // data jarang berubah → boleh static
export const runtime = "nodejs";

export async function GET() {
  try {
    const data = (await import("@/public/data/PlantsData.json")).default as Plant[];
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[/api/plants] load error:", err);
    return NextResponse.json({ error: "Failed to load plants" }, { status: 500 });
  }
}
