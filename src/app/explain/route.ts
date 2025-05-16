import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You continue user input with a short, natural phrase suitable for an essay or story. Do not repeat the user's words.",
        },
        {
          role: "user",
          content: `Continue this sentence: "${message}"`,
        },
      ],
      temperature: 0.7, // creative but not random
      max_tokens: 12, // short continuation (a few words)
    });

    const output = completion.choices[0].message.content?.trim();
    return NextResponse.json({ completion: output });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating continuation." },
      { status: 500 }
    );
  }
}
