const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "data", "tags.json");

app.use(express.json());
app.use(express.static(__dirname));

function readTags() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeTags(tags) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(tags, null, 2), "utf8");
}

app.get("/api/tags/:id", (req, res) => {
  const tags = readTags();
  const tag = tags[req.params.id];
  if (!tag) return res.status(404).json({ error: "not_found" });
  res.json(tag);
});

app.post("/api/tags/:id", (req, res) => {
  const { ownerName, phone, petName } = req.body || {};
  if (!ownerName || !phone || !petName) {
    return res.status(400).json({ error: "missing_fields" });
  }

  const tags = readTags();
  if (tags[req.params.id]) {
    return res.status(409).json({ error: "already_registered", tag: tags[req.params.id] });
  }

  const tag = {
    ownerName: String(ownerName).trim(),
    phone: String(phone).trim(),
    petName: String(petName).trim(),
    createdAt: Date.now(),
  };

  tags[req.params.id] = tag;
  writeTags(tags);
  res.status(201).json(tag);
});

app.get("/newuser", (req, res) => {
  res.sendFile(path.join(__dirname, "newuser", "index.html"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "user", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Petty running at http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin.html`);
});
