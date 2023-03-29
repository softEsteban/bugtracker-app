import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NgZorroModule } from '../../shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProjectsModule { }
