const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();

function humanize(text) {
  // adds natural pauses
  return text
    .replace(/\n/g, ". ")
    .replace(/,/g, ", ")
    .replace(/\.\s*/g, ". ")
    .trim();
}

async function speak(text) {
  try {
    const cleanText = humanize(text);

    const res = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${process.env.VOICE_ID}`,
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      data: {
        text: cleanText,
        model_id: "eleven_multilingual_v2",

        // 🔥 REALISM SETTINGS
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.9,
          style: 0.65,
          use_speaker_boost: true
        }
      },
      responseType: "arraybuffer"
    });

    const file = "voice.mp3";
    fs.writeFileSync(file, res.data);

    // play and wait until finished
    await new Promise((resolve, reject) => {
      exec(`ffplay -nodisp -autoexit "${file}"`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    fs.unlinkSync(file);

  } catch (err) {
    console.log("VOICE ERROR:", err.message);
  }
}

module.exports = { speak };