const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "tags.json");

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

async function findTag(id) {
  const tags = readTags();
  return tags[id] || null;
}

async function createTag(id, data) {
  const tags = readTags();
  if (tags[id]) {
    return { conflict: true, tag: tags[id] };
  }

  const tag = {
    ownerName: String(data.ownerName).trim(),
    phone: String(data.phone).trim(),
    petName: String(data.petName).trim(),
    createdAt: Date.now(),
  };

  tags[id] = tag;
  writeTags(tags);
  return { conflict: false, tag };
}

module.exports = { findTag, createTag };
