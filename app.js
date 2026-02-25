// 🔴 load .env
require("dotenv").config();

const readlineSync = require("readline-sync");
const { handleUserMessage } = require("./services/cloneService");

// 🧪 ENV check
console.log("----- ENV CHECK -----");
console.log("DEEPSEEK KEY:", process.env.DEEPSEEK_API_KEY ? "OK" : "MISSING");
console.log("ELEVEN KEY:", process.env.ELEVENLABS_API_KEY ? "OK" : "MISSING");
console.log("VOICE ID:", process.env.VOICE_ID ? "OK" : "MISSING");
console.log("---------------------\n");

console.log("🧠 Digital Doppelgänger ready.\nType exit to quit.\n");

async function start() {
  while (true) {
    const input = readlineSync.question("You: ");

    if (input.toLowerCase() === "exit") {
      console.log("Clone shutting down...");
      process.exit(0);
    }

    try {
      // get reply (voice will be played inside cloneService)
      const reply = await handleUserMessage(input);

      console.log("Clone:", reply, "\n");

    } catch (err) {
      console.log("Error:", err.message);
    }
  }
}

start();