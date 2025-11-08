import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import OPENAI_API_KEY from './apiKey/openaiKey.js';

const app = express();
app.use(bodyParser.json());
app.use(express.static('../public')); // Serve frontend

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Kamu adalah PUTRA AI, santai, gaul, lucu, enjoy ngobrol dengan user. Bisa semua bahasa dunia. Pakai slang, emoji, meme, friendly, chill.`
          },
          { role: "user", content: message }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
