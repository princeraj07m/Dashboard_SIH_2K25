import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashMapComponent } from './dash-map.component';

const routes: Routes = [
  {
    path: '',
    component: DashMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashMapRoutingModule { }