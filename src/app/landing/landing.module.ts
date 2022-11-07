import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [NavbarComponent, ContentComponent],
  imports: [CommonModule],
})
export class LandingModule {}
