// src/app/api/generate-content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateInitialContent, scheduleArticleGeneration } from '@/lib/contentScheduler';

// Store the scheduler instance
let scheduler: ReturnType<typeof scheduleArticleGeneration> | null = null;

export async function GET(request: NextRequest) {
  try {
    // Check if scheduler is already running
    if (scheduler) {
      return NextResponse.json({ 
        success: true, 
        message: 'Content generation scheduler is already running' 
      });
    }

    // Start the scheduler
    scheduler = scheduleArticleGeneration();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content generation scheduler started successfully' 
    });
  } catch (error) {
    console.error('Error starting content generation scheduler:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to start content generation scheduler', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Generate initial content
    await generateInitialContent();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Initial content generated successfully' 
    });
  } catch (error) {
    console.error('Error generating initial content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate initial content', error: String(error) },
      { status: 500 }
    );
  }
}
