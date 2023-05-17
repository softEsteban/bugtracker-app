import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showContent = false;

  chatMessages: string[] = [
    'Hello!',
    'How are you?',
    'Im doing great!',
    'What about you?'
  ];

  toggleContent() {
    this.showContent = !this.showContent;
  }


}
