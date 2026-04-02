const fs = require("fs");
const path = require("path");

let versesCache = null;
let bag = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadVerses() {
  if (versesCache) {
    return versesCache;
  }

  const versesPath = path.join(process.cwd(), "verses.json");
  const raw = fs.readFileSync(versesPath, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("verses.json doit etre un tableau");
  }

  versesCache = parsed;
  bag = shuffle([...versesCache]);
  return versesCache;
}

function pickUniqueVerse() {
  const verses = loadVerses();
  if (!verses.length) {
    return null;
  }

  if (!bag.length) {
    bag = shuffle([...verses]);
  }

  return bag.pop();
}

module.exports = function handler(req, res) {
  try {
    const verse = pickUniqueVerse();
    if (!verse) {
      res.status(404).json({ error: "Aucun verset disponible" });
      return;
    }

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(verse);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
};
