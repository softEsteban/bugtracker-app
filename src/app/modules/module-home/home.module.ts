import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgZorroModule } from '../../shared/ng-zorro.module';
import { DashboardModule } from '../module-dashboard/dashboard.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    DashboardModule
  ]
})
export class HomeModule { }
