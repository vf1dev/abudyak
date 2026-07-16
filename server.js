require("dotenv").config();

const path = require("path");
const express = require("express");
const { findTag, createTag } = require("./lib/tagsDb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/tags/:id", async (req, res) => {
  try {
    const tag = await findTag(req.params.id);
    if (!tag) return res.status(404).json({ error: "not_found" });
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

app.post("/api/tags/:id", async (req, res) => {
  try {
    const { ownerName, phone, petName } = req.body || {};
    if (!ownerName || !phone || !petName) {
      return res.status(400).json({ error: "missing_fields" });
    }

    const result = await createTag(req.params.id, { ownerName, phone, petName });
    if (result.conflict) {
      return res.status(409).json({ error: "already_registered", tag: result.tag });
    }
    res.status(201).json(result.tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
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
