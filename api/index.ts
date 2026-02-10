import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Get prompt from query or body, or use a default
  const prompt = req.body?.prompt || req.query?.prompt || 'Tell me a joke about programming.';

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({
      prompt,
      response: text,
    });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate content' });
  }
}
