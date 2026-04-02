export const dynamic = "force-dynamic";
import { getUniqueVerse } from "../../lib/verseStore";

export default async function CardPage() {
  let verse = null;

  try {
    verse = getUniqueVerse();
  } catch (_error) {
    verse = null;
  }

  return (
    <main className="container">
      <section className="verse-plain" role="region" aria-live="polite">
        <blockquote className="verse-text">
          {verse ? `"${verse.text}"` : "Erreur de chargement des versets."}
        </blockquote>
        <p className="verse-reference">{verse ? verse.reference : ""}</p>
      </section>
    </main>
  );
}
