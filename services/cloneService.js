const { speak } = require("./voiceService");
const { loadMemory, saveMemory } = require("./memoryService");
const { getStyle } = require("./styleService");
const { generateHumanReply } = require("./openaiService");

let cloneMood = "chill";

async function handleUserMessage(input) {

  let memory = loadMemory();
  const style = getStyle();

  // 🧠 emotion detection
  const emotion = detectEmotion(input);

  if (emotion === "angry") cloneMood = "aggressive";
  else if (emotion === "sad") cloneMood = "supportive";
  else if (emotion === "funny") cloneMood = "chaotic";
  else cloneMood = "chill";

  // 🔍 memory reuse
  const memoryReply = findSimilarReply(input, memory);

  let reply;

  if (memoryReply) {
    reply = memoryReply;
  } else {

    const recentConversation = memory
      .slice(-6)
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a digital clone of a real person from Kolkata.

PERSONALITY CORE:
${style}

CURRENT STATE:
Mood: ${cloneMood}
User Emotion: ${emotion}

RULES:
- Real friend tone
- Bangla + English mix
- Short WhatsApp replies
- No roleplay actions
- No *asterisks*
- No narration

RECENT CONTEXT:
${recentConversation}

USER MESSAGE:
${input}

Reply naturally.
`;

    reply = await generateHumanReply(prompt, recentConversation);
  }

  // 🧹 remove any leftover *actions*
  reply = (reply || "").replace(/\*.*?\*/g, "").trim();

  // 💾 save memory
  memory.push({ role: "user", content: input });
  memory.push({ role: "assistant", content: reply });
  saveMemory(memory);

  // 🔊 PLAY VOICE ONLY HERE (single source of truth)
  try {
    await speak(reply);
  } catch (err) {
    console.log("Voice playback error:", err.message);
  }

  return reply;
}


// 🧠 emotion detector
function detectEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("angry") || t.includes("rage") || t.includes("fuck")) return "angry";
  if (t.includes("sad") || t.includes("hurt") || t.includes("miss")) return "sad";
  if (t.includes("lol") || t.includes("haha")) return "funny";
  if (t.includes("love") || t.includes("crush")) return "romantic";

  return "neutral";
}


// 🔍 memory similarity
function findSimilarReply(input, memory) {

  const inputText = input.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (let i = 0; i < memory.length - 1; i++) {

    if (memory[i].role !== "user") continue;

    const memText = memory[i].content.toLowerCase();
    const score = similarityScore(inputText, memText);

    if (score > bestScore && score > 0.5) {
      bestScore = score;
      bestMatch = memory[i + 1];
    }
  }

  if (bestMatch && bestMatch.role === "assistant") {
    return bestMatch.content;
  }

  return null;
}


// 🔹 similarity
function similarityScore(a, b) {

  const wordsA = a.split(" ");
  const wordsB = b.split(" ");

  let matches = 0;

  wordsA.forEach(w => {
    if (wordsB.includes(w)) matches++;
  });

  return matches / Math.max(wordsA.length, wordsB.length);
}

module.exports = { handleUserMessage };