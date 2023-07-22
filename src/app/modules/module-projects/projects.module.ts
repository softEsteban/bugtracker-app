import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NgZorroModule } from '../../shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GlobalModule } from '../module-global/global.module';
import { ProjectsRoutingModule } from './projects-routing.module';



@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectDetailComponent,
    CreateProjectComponent,
    CreateItemComponent,
    AddUsersComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    GlobalModule
  ],
  providers: [
    FirebaseService
  ]
})
export class ProjectsModule { }
