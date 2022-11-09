import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { RequestComponent } from './request/request.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [RequestComponent],
  imports: [CommonModule, ProjectsRoutingModule, MatSelectModule],
})
export class ProjectModule {}
