const fs = require("fs");

const STYLE_PATH = "style.txt";
const MAX_CHARS = 4000; // prevent massive prompt size

function getStyle() {
  try {
    if (!fs.existsSync(STYLE_PATH)) {
      return "";
    }

    let style = fs.readFileSync(STYLE_PATH, "utf-8");

    if (!style) return "";

    style = style.trim();

    // 🧠 prevent huge style prompts
    if (style.length > MAX_CHARS) {
      style = style.slice(0, MAX_CHARS);
    }

    return style;

  } catch (err) {
    console.log("Style read error:", err);
    return "";
  }
}

module.exports = { getStyle };