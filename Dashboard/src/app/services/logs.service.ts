import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface SystemLog {
  id: string;
  type: 'device_activity' | 'system_alert' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  deviceId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
}

export interface LogFilter {
  type?: string;
  severity?: string;
  deviceId?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private logsSubject = new BehaviorSubject<SystemLog[]>([]);
  public logs$ = this.logsSubject.asObservable();

  private logInterval?: any;

  constructor() {
    this.initializeLogs();
    // Simulate new log entries every 2-5 minutes with proper cleanup
    this.scheduleNextLog();
  }

  private scheduleNextLog(): void {
    const delay = 120000 + Math.random() * 180000; // 2-5 minutes
    this.logInterval = setTimeout(() => {
      this.generateRandomLog();
      this.scheduleNextLog(); // Schedule next log
    }, delay);
  }

  private initializeLogs(): void {
    const sampleLogs: SystemLog[] = [
      {
        id: 'log-1',
        type: 'device_activity',
        title: 'Device Activity',
        message: 'Sprayer 1 activated automatically based on AI threshold (78%).',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        deviceId: 'sprayer-1',
        severity: 'low',
        isRead: false
      },
      {
        id: 'log-2',
        type: 'system_alert',
        title: 'System Alert',
        message: 'Drone 1 battery is low (15%). Please recharge soon.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        deviceId: 'drone-1',
        severity: 'high',
        isRead: false
      },
      {
        id: 'log-3',
        type: 'error',
        title: 'Error',
        message: 'Failed to connect to Sprayer 2. Check device connection.',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        deviceId: 'sprayer-2',
        severity: 'critical',
        isRead: false
      },
      {
        id: 'log-4',
        type: 'device_activity',
        title: 'Device Activity',
        message: 'Drone 1 completed scheduled spray cycle successfully.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        deviceId: 'drone-1',
        severity: 'low',
        isRead: true
      },
      {
        id: 'log-5',
        type: 'info',
        title: 'System Info',
        message: 'AI model accuracy improved to 94.2% after latest update.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        severity: 'low',
        isRead: true
      }
    ];
    this.logsSubject.next(sampleLogs);
  }

  getAllLogs(): Observable<SystemLog[]> {
    return this.logs$;
  }

  getFilteredLogs(filter: LogFilter): Observable<SystemLog[]> {
    return this.logs$.pipe(
      map(logs => {
        let filteredLogs = [...logs];

        if (filter.type) {
          filteredLogs = filteredLogs.filter(log => log.type === filter.type);
        }

        if (filter.severity) {
          filteredLogs = filteredLogs.filter(log => log.severity === filter.severity);
        }

        if (filter.deviceId) {
          filteredLogs = filteredLogs.filter(log => log.deviceId === filter.deviceId);
        }

        if (filter.dateRange) {
          filteredLogs = filteredLogs.filter(log => 
            log.timestamp >= filter.dateRange!.start && 
            log.timestamp <= filter.dateRange!.end
          );
        }

        if (filter.searchTerm) {
          const searchTerm = filter.searchTerm.toLowerCase();
          filteredLogs = filteredLogs.filter(log => 
            log.title.toLowerCase().includes(searchTerm) ||
            log.message.toLowerCase().includes(searchTerm)
          );
        }

        return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      })
    );
  }

  getLogTypes(): string[] {
    return ['device_activity', 'system_alert', 'error', 'info', 'warning'];
  }

  getLogSeverities(): string[] {
    return ['low', 'medium', 'high', 'critical'];
  }

  markLogAsRead(logId: string): void {
    const currentLogs = this.logsSubject.value;
    const logIndex = currentLogs.findIndex(log => log.id === logId);
    
    if (logIndex !== -1) {
      currentLogs[logIndex] = { ...currentLogs[logIndex], isRead: true };
      this.logsSubject.next([...currentLogs]);
    }
  }

  markAllLogsAsRead(): void {
    const currentLogs = this.logsSubject.value;
    const updatedLogs = currentLogs.map(log => ({ ...log, isRead: true }));
    this.logsSubject.next(updatedLogs);
  }

  getUnreadLogCount(): Observable<number> {
    return this.logs$.pipe(
      map(logs => logs.filter(log => !log.isRead).length)
    );
  }

  addLog(log: Omit<SystemLog, 'id' | 'timestamp'>): void {
    const newLog: SystemLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    
    const currentLogs = this.logsSubject.value;
    this.logsSubject.next([newLog, ...currentLogs]);
  }

  clearLogs(): void {
    this.logsSubject.next([]);
  }

  // Cleanup method to stop log generation
  destroy(): void {
    if (this.logInterval) {
      clearTimeout(this.logInterval);
      this.logInterval = undefined;
    }
  }

  private generateRandomLog(): void {
    const logTypes: SystemLog['type'][] = ['device_activity', 'system_alert', 'error', 'info', 'warning'];
    const devices = ['sprayer-1', 'sprayer-2', 'drone-1'];
    const severities: SystemLog['severity'][] = ['low', 'medium', 'high', 'critical'];
    
    const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    
    const logMessages = {
      device_activity: [
        'Device activated automatically based on AI threshold.',
        'Scheduled spray cycle completed successfully.',
        'Device calibration completed.',
        'New device connected to the network.'
      ],
      system_alert: [
        'Battery level is low. Please recharge soon.',
        'Maintenance required for optimal performance.',
        'Weather conditions may affect spray effectiveness.',
        'Device temperature is above normal range.'
      ],
      error: [
        'Connection lost. Attempting to reconnect...',
        'Calibration failed. Manual intervention required.',
        'Spray system malfunction detected.',
        'GPS signal lost. Device may be offline.'
      ],
      info: [
        'System update completed successfully.',
        'New firmware available for download.',
        'Performance metrics updated.',
        'Backup completed successfully.'
      ],
      warning: [
        'Device performance degraded.',
        'Scheduled maintenance due soon.',
        'Weather alert: High winds detected.',
        'Resource usage approaching limits.'
      ]
    };
    
    const randomMessage = logMessages[randomType][Math.floor(Math.random() * logMessages[randomType].length)];
    
    this.addLog({
      type: randomType,
      title: this.getLogTitle(randomType),
      message: randomMessage,
      deviceId: randomType === 'device_activity' ? randomDevice : undefined,
      severity: randomSeverity,
      isRead: false
    });
  }

  private getLogTitle(type: SystemLog['type']): string {
    const titles = {
      device_activity: 'Device Activity',
      system_alert: 'System Alert',
      error: 'Error',
      info: 'System Info',
      warning: 'Warning'
    };
    return titles[type];
  }

  getLogIcon(type: SystemLog['type']): string {
    const icons = {
      device_activity: 'bi-activity',
      system_alert: 'bi-exclamation-triangle-fill',
      error: 'bi-x-circle-fill',
      info: 'bi-info-circle-fill',
      warning: 'bi-exclamation-triangle'
    };
    return icons[type];
  }

  getLogColor(type: SystemLog['type']): string {
    const colors = {
      device_activity: 'text-primary',
      system_alert: 'text-warning',
      error: 'text-danger',
      info: 'text-info',
      warning: 'text-warning'
    };
    return colors[type];
  }
}
