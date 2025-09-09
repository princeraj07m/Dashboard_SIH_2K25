import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  dashboardTitle: string = '🌱 AgriGuard Dashboard';
  farmSelectLabel: string = 'Select Farm';
  farmOptions: string[] = ['Main Farm - Plot A', 'Farm B - Plot 2', 'Greenhouse Section'];
  selectedFarm: any = this.farmOptions;

  statusOverviewTitle: string = '📊 Status Overview';
  totalPlants: number = 1200;
  totalPlantsSubtitle: string = 'Across 3 fields';
  healthyPlants: number = 1150;
  healthyPlantsPercentage: string = '95% of total';
  infectedPlants: number = 50;
  infectedPlantsLocation: string = 'Mostly in Field B';
  sprayers: number = 2;
  sprayersStatus: string = '1 in maintenance';

  mapTip: string = 'Tip: Zoom into fields to check ';
  mapTipHighlight: string = 'plant clusters';
  mapTipEnd: string = ' and infection spread. Click on hotspots for details.';

  constructor() { }

  ngOnInit(): void {
  }
}