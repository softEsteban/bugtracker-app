import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
