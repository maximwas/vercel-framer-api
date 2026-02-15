import { connect, FieldDataInput } from 'framer-api';
import { getEnvConfig } from '../config/env.js';
import { FramerField } from '../types/index.js';

export abstract class BaseFramerService {
  protected async connect() {
    const config = getEnvConfig();

    return await connect(config.EXAMPLE_PROJECT_URL, config.FRAMER_API_KEY);
  }

  protected mapToFramerFields(data: Record<string, any>, mapping: FramerField[]): FieldDataInput {
    return Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => {
          const field = mapping.find((f) => f.id === key);
          if (!field) return null;
          return [field.framerId, { type: field.type, value }];
        })
        .filter((entry): entry is [string, any] => entry !== null)
    );
  }

  public async publish() {
    console.log('[Framer] Connecting to publish...');
    using framer = await this.connect();

    try {
      console.log('[Framer] Publishing project...');

      const result = await framer.publish();

      console.log(`[Framer] Published! Deployment ID: ${result.deployment.id}`);

      await new Promise(resolve => setTimeout(resolve, 5000));

      await framer.deploy(result.deployment.id)

      console.log(`[Framer] Deployed!`);
    } catch (error: any) {
      console.error('[Framer] Publish failed:', error.message);
      throw error;
    }
  }
}
