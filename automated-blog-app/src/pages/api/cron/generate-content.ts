// src/pages/api/cron/generate-content.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateInitialContent } from '@/lib/contentScheduler';
import { logMessage, LogLevel, monitorContentGeneration } from '@/lib/monitoring';

// This endpoint will be called by Vercel Cron
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify the request is from Vercel Cron
  // In production, you might want to add additional security checks
  
  try {
    logMessage('Starting scheduled content generation', LogLevel.INFO);
    
    // Generate new content
    await generateInitialContent();
    
    logMessage('Scheduled content generation completed successfully', LogLevel.INFO);
    monitorContentGeneration(true);
    
    return res.status(200).json({ success: true, message: 'Content generation successful' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logMessage(`Error in scheduled content generation: ${errorMessage}`, LogLevel.ERROR);
    monitorContentGeneration(false, undefined, error as Error);
    
    return res.status(500).json({ success: false, message: 'Content generation failed', error: errorMessage });
  }
}
