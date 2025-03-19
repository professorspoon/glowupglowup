// src/app/api/health/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkSystemHealth, getRecentLogs } from '@/lib/monitoring';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeLogsParam = searchParams.get('includeLogs');
    const includeLogs = includeLogsParam === 'true';
    
    // Check system health
    const health = await checkSystemHealth();
    
    // Get recent logs if requested
    const logs = includeLogs ? getRecentLogs(50) : [];
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      status: health.status,
      issues: health.issues,
      ...(includeLogs && { logs }),
    });
  } catch (error) {
    console.error('Error checking health:', error);
    return NextResponse.json(
      { 
        timestamp: new Date().toISOString(),
        status: 'error',
        message: 'Failed to check system health',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
