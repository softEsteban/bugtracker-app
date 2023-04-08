import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class KanbanModule { }
