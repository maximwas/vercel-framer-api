export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  'tag-1': string;
  'tag-2': string;
  'tag-3': string;
  image: string;
}

export interface FramerField {
  id: string;
  framerId: string;
  type: string;
}

export interface SyncResult {
  success: boolean;
  title?: string;
  error?: string;
}

export interface EnvConfig {
  GROQ_API_KEY: string;
  FRAMER_API_KEY: string;
  EXAMPLE_PROJECT_URL: string;
  CRON_SECRET?: string;
}

export interface IAIProvider {
  generateBlogPost(): Promise<BlogPost>;
}

export interface ICMSProvider {
  createBlogPost(post: BlogPost): Promise<void>;
}
