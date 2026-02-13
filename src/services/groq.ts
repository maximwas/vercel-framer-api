import Groq from 'groq-sdk';
import { BlogPost, IAIProvider } from '../types';
import { getEnvConfig } from '../config/env';

export class GroqService implements IAIProvider {
  private client: Groq;

  constructor() {
    const config = getEnvConfig();
    this.client = new Groq({ apiKey: config.GROQ_API_KEY });
  }

  async generateBlogPost(): Promise<BlogPost> {
    console.log('[GroqService] Choosing a trending professional topic autonomously...');
    
    const completion = await this.client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `
            You are a professional social media content generator.
            Your task is to choose a trending professional social media topic (AI, Technology, Startups, or Digital Business) and generate a post about it.
            
            Return ONLY valid raw JSON.
            No explanations. No markdown. No extra text.

            Structure:
            {
              "title": "post title here",
              "slug": "post-title-here",
              "content": "HTML formatted content here",
              "tag-1": "first tag",
              "tag-2": "second tag",
              "tag-3": "third tag",
              "image": "https://picsum.photos/seed/random-seed/1920/1080.jpg"
            }

            Rules:
            1. Title: Catchy, Max 10 words, English.
            2. Content: Valid HTML, use <p> for paragraphs, keep it engaging 1 paragraph, also you can add <b>, <i>, <a> tags.
            3. Tags: No # symbol, English only. Use appropriate professional tags based on the generated content.
            4. Image: https://picsum.photos/seed/{unique-random-word}/1920/1080.jpg
            5. Need create and return one posts
          `,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '{}';
    
    try {
      return JSON.parse(content) as BlogPost;
    } catch (error) {
      console.error('Failed to parse Groq response:', content);
      throw new Error('AI failed to produce valid JSON content.');
    }
  }
}
