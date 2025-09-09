import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing-module';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Health } from './health/health';
import { Sprayer } from './sprayer/sprayer';
import { Analytics } from './analytics/analytics';
import { Setting } from './setting/setting';
import { Users } from './users/users';
import { Profile } from './profile/profile';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    Home,
    Dashboard,
    Health,
    Sprayer,
    Analytics,
    Setting,
    Users,
    Profile,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
