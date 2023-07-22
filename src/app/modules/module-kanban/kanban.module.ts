import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    NgZorroModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class KanbanModule { }
