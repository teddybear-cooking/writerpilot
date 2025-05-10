import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `Explain this text: ${text}` }],
    });

    return NextResponse.json({ explanation: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Error in processing the text.' }, { status: 500 });
  }
}
