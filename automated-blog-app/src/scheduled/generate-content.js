// src/scheduled/generate-content.js
import { generateInitialContent } from '../lib/contentScheduler';
import { logMessage, LogLevel, monitorContentGeneration } from '../lib/monitoring';

export default {
  async scheduled(event, env, ctx) {
    try {
      logMessage('Starting scheduled content generation', LogLevel.INFO);
      
      // Generate new content
      await generateInitialContent();
      
      logMessage('Scheduled content generation completed successfully', LogLevel.INFO);
      monitorContentGeneration(true);
      
      return new Response('Content generation successful', { status: 200 });
    } catch (error) {
      logMessage(`Error in scheduled content generation: ${error.message}`, LogLevel.ERROR);
      monitorContentGeneration(false, undefined, error);
      
      return new Response('Content generation failed', { status: 500 });
    }
  },
};
