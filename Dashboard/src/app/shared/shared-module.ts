import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing-module';
import { Header } from './header/header';
import { Footer } from './footer/footer';


@NgModule({
  declarations: [
    Header,
    Footer
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
