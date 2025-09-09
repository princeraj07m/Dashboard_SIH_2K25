import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing-module';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Health } from './health/health';
import { Sprayer } from './sprayer/sprayer';
import { Analytics } from './analytics/analytics';
import { Setting } from './setting/setting';


@NgModule({
  declarations: [
    Home,
    Dashboard,
    Health,
    Sprayer,
    Analytics,
    Setting
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
