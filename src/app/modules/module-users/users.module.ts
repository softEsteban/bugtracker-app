import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule
  ]
})
export class UsersModule { }
