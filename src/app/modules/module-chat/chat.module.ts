import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
