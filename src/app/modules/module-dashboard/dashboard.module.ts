import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';



@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class DashboardModule { }
