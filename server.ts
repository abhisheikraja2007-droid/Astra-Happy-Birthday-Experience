import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for generating a digital birthday card image
  app.post("/api/generate-card", async (req, res) => {
    try {
      const { name, wish, theme } = req.body;
      if (!name || !wish) {
        return res.status(400).json({ error: "Name and wish are required." });
      }

      const prompt = `A breathtaking, high-end artistic digital birthday greeting card illustration designed in a celestial liquid glass aesthetic. The card features vibrant glowing auroras, starlight particles, glassmorphism elements, elegant typography, with the recipient's name "${name}" and the birthday wish "${wish}". Theme style: ${theme || 'Celestial Twilight'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        },
      });

      let imageUrl = null;
      let generatedText = null;

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mimeType};base64,${base64Data}`;
          } else if (part.text) {
            generatedText = part.text;
          }
        }
      }

      if (!imageUrl) {
        throw new Error("No image data returned from Gemini API.");
      }

      res.json({ success: true, imageUrl, message: generatedText });
    } catch (error: any) {
      console.error("Error generating card image:", error);
      res.status(500).json({ error: error.message || "Failed to generate birthday card." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
