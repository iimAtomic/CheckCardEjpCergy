const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const rootDir = __dirname;
const versesPath = path.join(rootDir, "verses.json");

let verses = [];
let bag = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadVerses() {
  const raw = fs.readFileSync(versesPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("verses.json doit etre un tableau");
  }
  verses = parsed;
  bag = shuffle([...verses]);
}

function pickUniqueVerse() {
  if (!verses.length) {
    return null;
  }

  if (!bag.length) {
    bag = shuffle([...verses]);
  }

  return bag.pop();
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".png") return "image/png";
  return "application/octet-stream";
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
    res.end(data);
  });
}

loadVerses();

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/verse") {
    const verse = pickUniqueVerse();
    if (!verse) {
      sendJson(res, 404, { error: "Aucun verset disponible" });
      return;
    }
    sendJson(res, 200, verse);
    return;
  }

  const safePath = requestUrl.pathname === "/" ? "index.html" : requestUrl.pathname.slice(1);
  const normalizedPath = path.normalize(safePath);
  let filePath = path.join(rootDir, normalizedPath);
  if (requestUrl.pathname === "/") {
    filePath = path.join(rootDir, "index.html");
  }

  // Simple protection contre les acces en dehors du projet.
  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Serveur pret: http://localhost:${PORT}`);
});
