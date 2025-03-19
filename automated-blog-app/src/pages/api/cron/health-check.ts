// src/pages/api/cron/health-check.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { logMessage, LogLevel } from '@/lib/monitoring';

// This endpoint will be called by Vercel Cron
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logMessage('Running health check', LogLevel.INFO);
    
    // Perform any health checks here
    // For example, check if the database is accessible
    
    logMessage('Health check completed successfully', LogLevel.INFO);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Health check successful',
      timestamp: new Date().toISOString(),
      status: 'healthy'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logMessage(`Error in health check: ${errorMessage}`, LogLevel.ERROR);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Health check failed', 
      error: errorMessage,
      timestamp: new Date().toISOString(),
      status: 'unhealthy'
    });
  }
}
