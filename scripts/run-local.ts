import { GroqService } from '../src/services/groq';
import { FramerPostsProvider } from '../src/collections/posts';
import { BlogSyncService } from '../src/services/sync';
import * as dotenv from 'dotenv';

dotenv.config();

async function runLocalSync() {
  console.log('--- Manual Sync Started ---');
  
  try {
    const aiProvider = new GroqService();
    const cmsProvider = new FramerPostsProvider();
    const syncService = new BlogSyncService(aiProvider, cmsProvider);
    console.log('[Local] Starting autonomous sync...');
    
    const result = await syncService.syncLatestPost();
    
    if (result.success) {
      console.log(`[Local] SUCCESS: Created post "${result.title}"`);
    } else {
      console.error(`[Local] FAILED: ${result.error}`);
    }
    
  } catch (error: any) {
    console.error('[Local] Critical Error:', error.message);
  }
  
  console.log('--- Manual Sync Finished ---');
}

runLocalSync();
