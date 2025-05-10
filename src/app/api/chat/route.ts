// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message } = await req.json();
    console.log("Incoming message:", message);
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-2-9b-it:free",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });
  
    const data = await response.json();
    console.log("OpenRouter response:", data);
  
    const aiMessage = data.choices?.[0]?.message?.content || "Sorry, I had trouble responding.";
  
    return NextResponse.json({ message: aiMessage });
  }
  
