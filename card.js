function displayVerse(verse) {
  const verseText = document.getElementById("verse-text");
  const verseReference = document.getElementById("verse-reference");

  verseText.textContent = `"${verse.text}"`;
  verseReference.textContent = verse.reference;
}

async function loadVerseFromApi() {
  const response = await fetch("./api/verse");
  if (!response.ok) {
    throw new Error("Impossible de charger un verset");
  }

  return response.json();
}

async function initCard() {
  const verseText = document.getElementById("verse-text");
  const verseReference = document.getElementById("verse-reference");

  try {
    const verse = await loadVerseFromApi();
    if (!verse || !verse.text || !verse.reference) {
      verseText.textContent = "Aucun verset disponible.";
      verseReference.textContent = "";
      return;
    }

    displayVerse(verse);
  } catch (error) {
    verseText.textContent = "Erreur de chargement des versets.";
    verseReference.textContent = "";
    console.error(error);
  }
}

initCard();
