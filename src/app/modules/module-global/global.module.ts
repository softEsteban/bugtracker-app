import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinComponent } from './spin/spin.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';



@NgModule({
  declarations: [
    SpinComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
  ], exports: [
  ]

})
export class GlobalModule { }
