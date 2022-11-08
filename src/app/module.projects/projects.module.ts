import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { RequestComponent } from './request/request.component';

@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [CommonModule, ProjectsRoutingModule],
})
export class ProjectModule {}
