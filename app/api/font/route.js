import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

function resolveFontPath() {
  const candidates = [
    "MangoGrotesque-Regular.ttf",
    "MangoGrotesque-Bold.ttf"
  ];

  for (const fileName of candidates) {
    const filePath = path.join(process.cwd(), fileName);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

export async function GET() {
  const filePath = resolveFontPath();
  if (!filePath) {
    return Response.json({ error: "Police introuvable" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "font/ttf",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
