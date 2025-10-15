// app/api/plant-image/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "id query is required" }, { status: 400 });
  }

  const base = path.join(process.cwd(), "public", "images", "plants");
  const exts = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

  for (const ext of exts) {
    try {
      await fs.access(path.join(base, `${id}${ext}`));
      return NextResponse.redirect(new URL(`/images/plants/${id}${ext}`, req.url));
    } catch { /* try next */ }
  }
  return NextResponse.redirect(new URL("/images/placeholder-plant.jpg", req.url));
}
