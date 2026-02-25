const fs = require("fs");
const { saveMemory } = require("./services/memoryService");

const raw = fs.readFileSync("chat.txt", "utf-8");
const lines = raw.split("\n");

let memory = [];
let styleSamples = [];

let lastOtherMessage = null;

lines.forEach(line => {

  // OTHER PERSON → becomes user
  if (line.includes("Nandini Call:")) {
    const msg = line.split("Nandini Call:")[1].trim();

    if (msg.length > 1) {
      lastOtherMessage = msg;
    }
  }

  // YOU → becomes assistant
  if (line.includes("Soumyadip:")) {
    const msg = line.split("Soumyadip:")[1].trim();

    if (msg.length > 1 && lastOtherMessage) {

      memory.push({
        role: "user",
        content: lastOtherMessage
      });

      memory.push({
        role: "assistant",
        content: msg
      });

      styleSamples.push(msg); // collect your tone
      lastOtherMessage = null;
    }
  }

});

saveMemory(memory);

// 🔥 build style.txt automatically
const styleText = styleSamples.slice(0, 200).join("\n");
fs.writeFileSync("style.txt", styleText);

console.log("Training complete.");
console.log("Pairs learned:", memory.length / 2);
console.log("Style extracted:", styleSamples.length);