import { IAIProvider, ICMSProvider, SyncResult } from '../types';

export class BlogSyncService {
  constructor(
    private aiProvider: IAIProvider,
    private cmsProvider: ICMSProvider
  ) {}

  async syncLatestPost(): Promise<SyncResult> {
    try {
      console.log('[BlogSyncService] Starting autonomous sync process...');
      
      const post = await this.aiProvider.generateBlogPost();
      await this.cmsProvider.createBlogPost(post);
      
      console.log(`[BlogSyncService] Sync and publish completed for: ${post.title}`);
      return { success: true, title: post.title };
    } catch (error: any) {
      console.error('[BlogSyncService] Sync failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}
