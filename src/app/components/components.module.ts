import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    // LandingComponent,
    // LoginComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule
  ]
})
export class ComponentsModule { }
