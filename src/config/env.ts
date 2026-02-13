import { EnvConfig } from '../types/index.js';

export const getEnvConfig = (): EnvConfig => {
  const { GROQ_API_KEY, FRAMER_API_KEY, EXAMPLE_PROJECT_URL, CRON_SECRET } = process.env;

  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing');
  }

  if (!FRAMER_API_KEY) {
    throw new Error('FRAMER_API_KEY is missing');
  }

  if (!EXAMPLE_PROJECT_URL) {
    throw new Error('EXAMPLE_PROJECT_URL is missing');
  }

  return {
    GROQ_API_KEY,
    FRAMER_API_KEY,
    EXAMPLE_PROJECT_URL,
    CRON_SECRET,
  };
};
