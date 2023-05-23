import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGptComponent } from './chat-gpt/chat-gpt.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatGptComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChatGptModule { }
