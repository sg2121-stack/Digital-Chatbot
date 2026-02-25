const fs = require("fs");

const PATH = "memory.json";
const MAX_MESSAGES = 200; // prevent unlimited growth

function loadMemory() {
  try {
    if (!fs.existsSync(PATH)) {
      fs.writeFileSync(PATH, JSON.stringify([], null, 2));
      return [];
    }

    const raw = fs.readFileSync(PATH, "utf8").trim();

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed;

  } catch (err) {
    console.log("Memory read error. Resetting memory.");
    fs.writeFileSync(PATH, JSON.stringify([], null, 2));
    return [];
  }
}

function saveMemory(memory) {
  try {

    // 🧠 keep only recent messages
    if (memory.length > MAX_MESSAGES) {
      memory = memory.slice(-MAX_MESSAGES);
    }

    fs.writeFileSync(PATH, JSON.stringify(memory, null, 2));

  } catch (err) {
    console.log("Memory save error:", err);
  }
}

module.exports = { loadMemory, saveMemory };