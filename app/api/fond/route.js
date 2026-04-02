import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "Versets Template.jpg.jpeg");
    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    });
  } catch (_error) {
    return Response.json({ error: "Image introuvable" }, { status: 404 });
  }
}
