import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Health } from './health/health';
import { Sprayer } from './sprayer/sprayer';
import { Analytics } from './analytics/analytics';
import { Setting } from './setting/setting';

const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'health',
    component: Health 
  },
  {
    path: 'sprayer',
    component: Sprayer
  },
  {
    path: 'analytics',
    component: Analytics
  },
  {
    path: 'setting',
    component: Setting
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
