import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "Versets Template.jpg.jpeg");
    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (_error) {
    return Response.json({ error: "Image introuvable" }, { status: 404 });
  }
}
