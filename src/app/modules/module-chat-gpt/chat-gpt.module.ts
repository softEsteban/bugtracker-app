import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatGptComponent } from './chat-gpt/chat-gpt.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';



@NgModule({
  declarations: [
    ChatGptComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule
  ]
})
export class ChatGptModule { }
