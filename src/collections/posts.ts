import { FramerField, BlogPost, ICMSProvider } from '@/types/index.js';
import { BaseFramerService } from '@/services/framer.js';

export const postsMapFields: FramerField[] = [
  { id: 'title', framerId: 'EpmfAEFoo', type: 'string' },
  { id: 'content', framerId: 'f5ttlWPf0', type: 'formattedText' },
  { id: 'tag-1', framerId: 'l1H1GXnwN', type: 'string' },
  { id: 'tag-2', framerId: 'yruZqNIfz', type: 'string' },
  { id: 'tag-3', framerId: 'CGlkHpnBv', type: 'string' },
  { id: 'image', framerId: 'SARz93u1R', type: 'image' },
];

export class FramerPostsProvider extends BaseFramerService implements ICMSProvider {
  async createBlogPost(post: BlogPost): Promise<void> {
    const collectionSlug = 'posts';
    console.log(`[FramerPostsProvider] Connecting to Framer...`);
    
    using framer = await this.connect();

    try {
      const collections = await framer.getCollections();
      const collection = collections.find(
        (collection: any) => collection.name.toLowerCase() === collectionSlug
      );

      if (!collection) {
        throw new Error(`Collection "${collectionSlug}" not found in project.`);
      }

      console.log(`[FramerPostsProvider] Creating item in "${collection.name}"...`);

      const fieldData = this.mapToFramerFields(post, postsMapFields);

      await collection.addItems([
        {
          slug: post.slug,
          fieldData,
        },
      ]);

      console.log(`[FramerPostsProvider] Successfully created post: ${post.title}`);

      await this.publish();
    } catch (error: any) {
      console.error(`[FramerPostsProvider] Error:`, error.message);
      throw error;
    }
  }
}
