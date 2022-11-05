import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ContentComponent } from './landing/content/content.component';
import { NavbarComponent } from './landing/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ContentComponent],
  imports: [AppRoutingModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
