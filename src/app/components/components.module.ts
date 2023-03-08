import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    NgZorroModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
