import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DeveloperDashboardComponent } from './developer-dashboard/developer-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    DeveloperDashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgZorroModule
  ],
  exports: [
    AdminDashboardComponent,
    DeveloperDashboardComponent,
    UserDashboardComponent
  ]
})
export class DashboardModule { }
