import { getUniqueVerse } from "../../../lib/verseStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const verse = getUniqueVerse();
    if (!verse) {
      return Response.json({ error: "Aucun verset disponible" }, { status: 404 });
    }
    return Response.json(verse, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
