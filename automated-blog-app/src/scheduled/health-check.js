// src/scheduled/health-check.js
import { checkSystemHealth, logMessage, LogLevel } from '../lib/monitoring';

export default {
  async scheduled(event, env, ctx) {
    try {
      logMessage('Starting scheduled health check', LogLevel.INFO);
      
      // Check system health
      const health = await checkSystemHealth();
      
      // Log health status
      logMessage(`Health check status: ${health.status}`, LogLevel.INFO);
      
      // If there are issues, log them
      if (health.issues.length > 0) {
        logMessage(`Health check issues: ${health.issues.join(', ')}`, 
          health.status === 'unhealthy' ? LogLevel.ERROR : LogLevel.WARNING);
      }
      
      // If system is unhealthy, we could trigger alerts or notifications here
      if (health.status === 'unhealthy') {
        // In a production environment, this would send alerts
        logMessage('System is unhealthy! Alerts would be triggered.', LogLevel.ERROR);
      }
      
      return new Response(JSON.stringify(health), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      logMessage(`Error in scheduled health check: ${error.message}`, LogLevel.ERROR);
      
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Health check failed',
        error: error.message
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};
