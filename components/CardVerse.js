"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ejp-card-verse";

export default function CardVerse() {
  const [verse, setVerse] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.text && parsed?.reference) {
          setVerse(parsed);
          setStatus("ready");
          return;
        }
      }
    } catch {
      // ignore
    }

    fetch("/api/verse")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data?.text && data?.reference) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setVerse(data);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const showError = status === "error";
  const showLoading = status === "loading";

  return (
    <main className="container">
      <section className="verse-plain" role="region" aria-live="polite">
        <blockquote className="verse-text">
          {showError
            ? "Erreur de chargement des versets."
            : showLoading
              ? "Chargement du verset..."
              : `"${verse.text}"`}
        </blockquote>
        <p className="verse-reference">
          {showError || showLoading ? "" : verse.reference}
        </p>
      </section>
    </main>
  );
}
