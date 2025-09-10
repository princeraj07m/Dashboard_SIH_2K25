import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Notification {
  id: string;
  type: 'critical' | 'normal' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  isRead: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  type: 'primary' | 'secondary';
  action: () => void;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.scss'],
  standalone: false
})
export class NotificationsComponent implements OnInit {
  activeTab: string = 'current';
  activeFilter: string = 'all';
  searchQuery: string = '';
  markAllAsRead: boolean = false;
  
  notifications: Notification[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Low Water Level',
      description: 'Water level in the south field irrigation system is critically low. Immediate action required to prevent crop damage.',
      timestamp: '2 hours ago',
      icon: '💧',
      iconColor: '#dc3545',
      isRead: false,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('1') },
        { label: 'Resolve', type: 'primary', action: () => this.resolveNotification('1') }
      ]
    },
    {
      id: '2',
      type: 'critical',
      title: 'Livestock Alert',
      description: 'One of your cows, Betsy, has wandered outside the designated grazing area. Please check her location and ensure she\'s safely back.',
      timestamp: '4 hours ago',
      icon: '🐄',
      iconColor: '#dc3545',
      isRead: false,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('2') },
        { label: 'Check Location', type: 'primary', action: () => this.checkLocation('2') }
      ]
    },
    {
      id: '3',
      type: 'critical',
      title: 'Greenhouse Temperature',
      description: 'The temperature in the greenhouse is higher than the optimal range for your tomato plants. Adjust ventilation to avoid stress.',
      timestamp: '6 hours ago',
      icon: '🌡️',
      iconColor: '#dc3545',
      isRead: false,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('3') },
        { label: 'Adjust Settings', type: 'primary', action: () => this.adjustSettings('3') }
      ]
    },
    {
      id: '4',
      type: 'normal',
      title: 'Weather Update',
      description: 'The weather forecast predicts heavy rain for the next two days. Consider implementing flood prevention measures for low-lying fields.',
      timestamp: '1 day ago',
      icon: '🌧️',
      iconColor: '#ffc107',
      isRead: true,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('4') }
      ]
    },
    {
      id: '5',
      type: 'system',
      title: 'Software Update',
      description: 'A new software update is available for your AgriTrack system. Update now to access the latest features and improvements.',
      timestamp: '2 days ago',
      icon: '⬇️',
      iconColor: '#007bff',
      isRead: true,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('5') },
        { label: 'Update Now', type: 'primary', action: () => this.updateSoftware('5') }
      ]
    },
    {
      id: '6',
      type: 'normal',
      title: 'Harvest Reminder',
      description: 'Your wheat crop in Field A is ready for harvest. Optimal harvest window is 3-5 days.',
      timestamp: '3 days ago',
      icon: '🌾',
      iconColor: '#ffc107',
      isRead: true,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('6') },
        { label: 'Schedule Harvest', type: 'primary', action: () => this.scheduleHarvest('6') }
      ]
    },
    {
      id: '7',
      type: 'system',
      title: 'Backup Complete',
      description: 'Daily backup of your farm data has been completed successfully. All data is secure.',
      timestamp: '4 days ago',
      icon: '💾',
      iconColor: '#007bff',
      isRead: true,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('7') }
      ]
    },
    {
      id: '8',
      type: 'critical',
      title: 'Pest Detection',
      description: 'Unusual pest activity detected in Field B. Immediate inspection and treatment recommended.',
      timestamp: '5 days ago',
      icon: '🐛',
      iconColor: '#dc3545',
      isRead: true,
      actions: [
        { label: 'Dismiss', type: 'secondary', action: () => this.dismissNotification('8') },
        { label: 'Inspect Field', type: 'primary', action: () => this.inspectField('8') }
      ]
    }
  ];

  filteredNotifications: Notification[] = [];
  criticalCount: number = 0;
  reportPeriod: string = 'last7days';

  ngOnInit() {
    this.updateFilteredNotifications();
    this.updateCriticalCount();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.updateFilteredNotifications();
  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
    this.updateFilteredNotifications();
  }

  updateFilteredNotifications() {
    let filtered = [...this.notifications];

    // Filter by tab
    if (this.activeTab === 'current') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (this.activeTab === 'archive') {
      filtered = filtered.filter(n => n.isRead);
    }

    // Filter by type
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === this.activeFilter);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.description.toLowerCase().includes(query) ||
        n.type.toLowerCase().includes(query)
      );
    }

    this.filteredNotifications = filtered;
  }

  updateCriticalCount() {
    this.criticalCount = this.notifications.filter(n => n.type === 'critical' && !n.isRead).length;
  }

  onSearchChange() {
    this.updateFilteredNotifications();
  }

  toggleMarkAllAsRead() {
    this.markAllAsRead = !this.markAllAsRead;
    if (this.markAllAsRead) {
      this.notifications.forEach(n => n.isRead = true);
      this.updateFilteredNotifications();
      this.updateCriticalCount();
    }
  }

  dismissNotification(id: string) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
      this.updateFilteredNotifications();
      this.updateCriticalCount();
    }
  }

  resolveNotification(id: string) {
    console.log('Resolving notification:', id);
    this.dismissNotification(id);
    // Add actual resolution logic here
  }

  checkLocation(id: string) {
    console.log('Checking location for notification:', id);
    this.dismissNotification(id);
    // Add location check logic here
  }

  adjustSettings(id: string) {
    console.log('Adjusting settings for notification:', id);
    this.dismissNotification(id);
    // Add settings adjustment logic here
  }

  updateSoftware(id: string) {
    console.log('Updating software for notification:', id);
    this.dismissNotification(id);
    // Add software update logic here
  }

  scheduleHarvest(id: string) {
    console.log('Scheduling harvest for notification:', id);
    this.dismissNotification(id);
    // Add harvest scheduling logic here
  }

  inspectField(id: string) {
    console.log('Inspecting field for notification:', id);
    this.dismissNotification(id);
    // Add field inspection logic here
  }

  generateReport() {
    console.log('Generating report for period:', this.reportPeriod);
    // Add report generation logic here
  }

  savePreferences() {
    console.log('Saving notification preferences');
    // Add preferences saving logic here
  }

  getNotificationTypeClass(type: string): string {
    switch (type) {
      case 'critical': return 'notification-critical';
      case 'normal': return 'notification-normal';
      case 'system': return 'notification-system';
      default: return '';
    }
  }

  getTimeAgo(timestamp: string): string {
    return timestamp;
  }
}
