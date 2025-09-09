import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Health } from './health/health';
import { Sprayer } from './sprayer/sprayer';
import { Analytics } from './analytics/analytics';
import { Setting } from './setting/setting';
import { Users } from './users/users';
import { Profile } from './profile/profile';

const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'profile',
    component: Profile
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
  },
  {
    path: 'users',
    component: Users
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
