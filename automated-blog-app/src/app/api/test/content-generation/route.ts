// src/app/api/test/content-generation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateInitialContent } from '@/lib/contentScheduler';
import { logMessage, LogLevel } from '@/lib/monitoring';

export async function POST(request: NextRequest) {
  try {
    logMessage('Starting test content generation', LogLevel.INFO);
    
    // Generate test content
    await generateInitialContent();
    
    logMessage('Test content generation completed successfully', LogLevel.INFO);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test content generation completed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in test content generation:', error);
    logMessage(`Error in test content generation: ${error.message}`, LogLevel.ERROR);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Test content generation failed', 
        error: String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
