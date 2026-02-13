import { VercelRequest, VercelResponse } from '@vercel/node';
import { GroqService } from '../src/services/groq';
import { FramerPostsProvider } from '../src/collections/posts';
import { BlogSyncService } from '../src/services/sync';
import { getEnvConfig } from '../src/config/env';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[Cron] Received trigger request');

  const config = getEnvConfig();
  const authHeader = req.headers.authorization;
  
  if (config.CRON_SECRET && authHeader !== `Bearer ${config.CRON_SECRET}`) {
    console.error('[Cron] Unauthorized request');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const aiProvider = new GroqService();
  const cmsProvider = new FramerPostsProvider();
  const syncService = new BlogSyncService(aiProvider, cmsProvider);

  const result = await syncService.syncLatestPost();

  if (result.success) {
    return res.status(200).json({
      message: 'Sync completed successfully',
      post: result.title
    });
  } else {
    return res.status(500).json({
      message: 'Sync failed',
      error: result.error
    });
  }
}
