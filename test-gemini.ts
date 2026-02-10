import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from current directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY is not set in .env file');
    process.exit(1);
  }

  console.log('✅ Found API Key. initializing Gemini...');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = 'Tell me a short joke about Vercel.';
  console.log(`Testing with prompt: "${prompt}"...`);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('\n✅ Response received:');
    console.log('--------------------------------------------------');
    console.log(text);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
  }
}

testGemini();
