import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    DragDropModule,
  ]
})
export class KanbanModule { }
