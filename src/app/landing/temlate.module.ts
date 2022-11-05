import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TemlateModule { }
