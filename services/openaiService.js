const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.DEEPSEEK_API_KEY;

async function generateHumanReply(prompt, memory = "") {
  try {

    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Reply like a normal human texting. No roleplay actions. No *asterisks*. Keep it natural."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "DigitalClone"
        },
        timeout: 30000
      }
    );

    let reply = res.data.choices?.[0]?.message?.content || "";

    reply = reply.replace(/\*.*?\*/g, "").trim();

    return reply || "Ki bolchis?";

  } catch (err) {

    console.log("\n===== OPENROUTER ERROR =====");

    if (err.response) {
      console.log("STATUS:", err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    console.log("============================\n");

    return "Brain glitch. Try again.";
  }
}

module.exports = { generateHumanReply };