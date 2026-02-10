import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Cron job execution started at:', new Date().toISOString());

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent('Generate a daily motivational quote for a developer.');
    const response = await result.response;
    const text = response.text();

    console.log('Generated daily quote:', text);

    // In a real app, you might save this to a database or send it somewhere
    return res.status(200).json({
      message: 'Cron job executed successfully',
      generated_content: text
    });
  } catch (error: any) {
    console.error('Error in cron job:', error);
    return res.status(500).json({ error: error.message });
  }
}
