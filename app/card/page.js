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
      <article className="verse-card" role="region" aria-live="polite">
        <img src="/api/fond" alt="" className="card-background" />
        <div className="verse-overlay">
          <blockquote className="verse-text">
            {verse ? `"${verse.text}"` : "Erreur de chargement des versets."}
          </blockquote>
          <p className="verse-reference">{verse ? verse.reference : ""}</p>
        </div>
      </article>
    </main>
  );
}
