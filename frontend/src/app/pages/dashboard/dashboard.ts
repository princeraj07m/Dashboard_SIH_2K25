import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService, KeyMetric, Equipment, FieldStatus, Alert } from '../../services/dashboard.service';
import { WeatherService, WeatherData, WeatherAlert } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Dashboard data
  keyMetrics: KeyMetric[] = [];
  equipment: Equipment[] = [];
  fieldStatus: FieldStatus[] = [];
  alerts: Alert[] = [];
  weatherData: WeatherData | null = null;
  weatherAlerts: WeatherAlert[] = [];

  // UI state
  isLoading = true;
  selectedFarm = 'Green Acres';
  farmOptions = ['Green Acres', 'Sunrise Farm', 'Valley Fields'];
  currentUser = 'Ethan';
  currentLocation = 'Iowa';

  // Dashboard sections
  dashboardTitle = 'AgriTrack';
  welcomeMessage = `Welcome back, ${this.currentUser}!`;
  farmInfo = `Farm: ${this.selectedFarm} | Crop: Corn | Location: ${this.currentLocation}`;

  constructor(
    private dashboardService: DashboardService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadWeatherData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    // Load key metrics
    this.dashboardService.getKeyMetrics()
      .pipe(takeUntil(this.destroy$))
      .subscribe(metrics => {
        this.keyMetrics = metrics;
        this.isLoading = false;
      });

    // Load equipment
    this.dashboardService.getEquipment()
      .pipe(takeUntil(this.destroy$))
      .subscribe(equipment => {
        this.equipment = equipment;
      });

    // Load field status
    this.dashboardService.getFieldStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe(fields => {
        this.fieldStatus = fields;
      });

    // Load alerts
    this.dashboardService.getAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(alerts => {
        this.alerts = alerts;
      });
  }

  private loadWeatherData(): void {
    // Load current weather
    this.weatherService.getCurrentWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe(weather => {
        this.weatherData = weather;
      });

    // Load weather alerts
    this.weatherService.getWeatherAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(alerts => {
        this.weatherAlerts = alerts;
      });
  }

  // Utility methods
  getStatusColor(status: string): string {
    return this.dashboardService.getStatusColor(status);
  }

  getStatusIcon(status: string): string {
    return this.dashboardService.getStatusIcon(status);
  }

  getTrendIcon(direction: 'up' | 'down'): string {
    return this.dashboardService.getTrendIcon(direction);
  }

  getTrendColor(direction: 'up' | 'down', metricId: string): string {
    return this.dashboardService.getTrendColor(direction, metricId);
  }

  getWeatherIcon(condition: string): string {
    return this.weatherService.getWeatherIcon(condition);
  }

  getAlertIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'pest': 'bi-bug',
      'disease': 'bi-virus',
      'equipment': 'bi-tools',
      'weather': 'bi-cloud-lightning',
      'irrigation': 'bi-house-gear'
    };
    return iconMap[type] || 'bi-exclamation-triangle';
  }

  getSeverityColor(severity: string): string {
    const colorMap: { [key: string]: string } = {
      'low': 'text-danger',
      'medium': 'text-warning',
      'high': 'text-danger',
      'critical': 'text-danger'
    };
    return colorMap[severity] || 'text-secondary';
  }

  getSeverityBadgeClass(severity: string): string {
    const badgeMap: { [key: string]: string } = {
      'low': 'badge bg-danger',
      'medium': 'badge bg-warning',
      'high': 'badge bg-danger',
      'critical': 'badge bg-danger'
    };
    return badgeMap[severity] || 'badge bg-secondary';
  }

  formatTimeAgo(date: Date): string {
    return this.dashboardService.formatTimeAgo(date);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  onFarmChange(farm: string): void {
    this.selectedFarm = farm;
    this.farmInfo = `Farm: ${farm} | Crop: Corn | Location: ${this.currentLocation}`;
    // In a real app, you would reload data based on selected farm
  }

  onAlertClick(alert: Alert): void {
    if (!alert.isRead) {
      this.dashboardService.markAlertAsRead(alert.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          alert.isRead = true;
        });
    }
  }

  onEquipmentClick(equipment: Equipment): void {
    // Navigate to equipment details or show modal
    console.log('Equipment clicked:', equipment);
  }

  onFieldClick(field: FieldStatus): void {
    // Navigate to field details or show modal
    console.log('Field clicked:', field);
  }

  refreshData(): void {
    this.isLoading = true;
    this.loadDashboardData();
    this.loadWeatherData();
  }
}
