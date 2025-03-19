// src/lib/monitoring.ts
import fs from 'fs';
import path from 'path';

// Define log directory
const LOG_DIR = path.join(process.cwd(), 'logs');

// Ensure log directory exists
function ensureLogDirectoryExists() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

// Log levels
export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

/**
 * Log a message to the application log file
 */
export function logMessage(message: string, level: LogLevel = LogLevel.INFO) {
  ensureLogDirectoryExists();
  
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;
  
  // Get current date for log file name
  const date = new Date().toISOString().split('T')[0];
  const logFile = path.join(LOG_DIR, `${date}.log`);
  
  try {
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
}

/**
 * Log an error with stack trace
 */
export function logError(error: Error, context?: string) {
  const message = context 
    ? `Error in ${context}: ${error.message}\n${error.stack}` 
    : `${error.message}\n${error.stack}`;
  
  logMessage(message, LogLevel.ERROR);
}

/**
 * Monitor content generation
 */
export function monitorContentGeneration(success: boolean, category?: string, error?: Error) {
  if (success) {
    logMessage(`Successfully generated content${category ? ` for category: ${category}` : ''}`);
  } else {
    logError(error || new Error('Unknown error'), 'Content Generation');
  }
}

/**
 * Monitor system health
 */
export async function checkSystemHealth(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  issues: string[];
}> {
  const issues: string[] = [];
  
  try {
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      issues.push('Data directory does not exist');
    }
    
    // Check if we have articles
    const articlesDir = path.join(dataDir, 'articles');
    if (!fs.existsSync(articlesDir)) {
      issues.push('Articles directory does not exist');
    } else {
      const files = fs.readdirSync(articlesDir);
      if (files.length === 0) {
        issues.push('No articles found');
      }
    }
    
    // Check log directory
    if (!fs.existsSync(LOG_DIR)) {
      issues.push('Log directory does not exist');
    }
    
    // Determine overall status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (issues.length > 0 && issues.length < 2) {
      status = 'degraded';
    } else if (issues.length >= 2) {
      status = 'unhealthy';
    }
    
    return { status, issues };
  } catch (error) {
    logError(error as Error, 'System Health Check');
    return { 
      status: 'unhealthy', 
      issues: ['Failed to complete health check', (error as Error).message] 
    };
  }
}

/**
 * Get recent logs
 */
export function getRecentLogs(lines: number = 100): string[] {
  ensureLogDirectoryExists();
  
  try {
    // Get current date for log file name
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `${date}.log`);
    
    if (!fs.existsSync(logFile)) {
      return ['No logs found for today'];
    }
    
    const content = fs.readFileSync(logFile, 'utf8');
    const allLines = content.split('\n').filter(line => line.trim() !== '');
    
    // Return the most recent lines
    return allLines.slice(-lines);
  } catch (error) {
    console.error('Error reading log file:', error);
    return ['Error reading log file'];
  }
}
