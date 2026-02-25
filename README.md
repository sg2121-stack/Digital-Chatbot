# 🧠 Digital Doppelgänger (Voice Clone Chatbot)

A local AI clone that chats like you and speaks in your cloned voice using **OpenRouter + ElevenLabs**.

Runs on localhost as a web app.

---

## ✨ Features

* Personality-based AI clone
* Memory system (learns from chats)
* Mood detection
* Bangla + English conversational tone
* ElevenLabs voice clone
* Runs locally
* Extendable to WhatsApp / web deployment

---

## 🧱 Tech Stack

* Node.js
* Express
* OpenRouter (DeepSeek model)
* ElevenLabs TTS
* Local memory JSON
* Simple web frontend

---

## 📁 Project Structure

```
Digital_Duplicate/
│
├── services/
│   ├── cloneService.js
│   ├── openaiService.js
│   ├── voiceService.js
│   ├── memoryService.js
│   └── styleService.js
│
├── public/
│   └── index.html
│
├── server.js
├── app.js
├── memory.json
├── style.txt
├── .env
└── README.md
```

---

## ⚙️ Setup

### 1️⃣ Install dependencies

```bash
npm install
npm install express cors axios dotenv
```

---

### 2️⃣ Add environment variables

Create `.env`

```
DEEPSEEK_API_KEY=sk-or-xxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxx
VOICE_ID=xxxxxxxx
```

---

### 3️⃣ Run web app

```bash
node server.js
```

Open browser:

```
http://localhost:3000
```

---

## 🎤 ElevenLabs Voice Setup

1. Go to ElevenLabs dashboard
2. Create voice clone
3. Copy Voice ID
4. Add to `.env`

You can adjust realism in:

```
services/voiceService.js
```

Example settings:

```js
voice_settings: {
  stability: 0.35,
  similarity_boost: 0.9,
  style: 0.6,
  use_speaker_boost: true
}
```

---

## 🧠 Personality Training

Edit:

```
style.txt
```

Add chat samples to shape tone.

Memory is stored in:

```
memory.json
```

---

## 🔊 Voice Playback (local)

The bot generates voice using ElevenLabs
and plays via `ffplay`.

Make sure FFmpeg is installed:

```bash
ffplay -version
```

If not, install FFmpeg and add to PATH.

---

## 🚀 Future Upgrades

* Microphone conversation
* WhatsApp integration
* Real-time voice
* Emotion-based speech
* Deploy to cloud

---

## ⚠️ Notes

* Requires OpenRouter credits
* ElevenLabs free tier has limits
* For best voice quality use clean training audio

---

## 📜 License

Personal project / experimental AI clone.

## 👨‍💻 Author

**Soumyadip Ghosh**
Creator of the *Digital Doppelgänger* project.

* GitHub: https://github.com/sg2121-stack
* Project Repo: https://github.com/sg2121-stack/Digital-Chatbot

This project is an experimental AI digital clone combining:

* personality memory
* conversational tone learning
* ElevenLabs voice cloning
* local deployment

Built as a personal exploration into creating a realistic conversational AI clone.
