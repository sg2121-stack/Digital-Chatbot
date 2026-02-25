const express = require("express");
const cors = require("cors");
const path = require("path");
const { handleUserMessage } = require("./services/cloneService");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    const reply = await handleUserMessage(msg);

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("🌐 Web app running:");
  console.log("http://localhost:3000");
});