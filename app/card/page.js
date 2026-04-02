export const dynamic = "force-dynamic";

async function getVerse() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/verse`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Impossible de charger un verset");
  }
  return res.json();
}

export default async function CardPage() {
  let verse = null;

  try {
    verse = await getVerse();
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
