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

  chatMessages: ChatItem[] = [
    {
      use_code: "1",
      use_name: "Gary Greenman",
      use_pic: "",
      last_msg: "Que opinas de Blockchain?"
    },
    {
      use_code: "12",
      use_name: "Estelita White",
      use_pic: "",
      last_msg: "Hola! Qué tal todo?"
    },
    {
      use_code: "24",
      use_name: "Andrés",
      use_pic: "",
      last_msg: "La idea es desarrollar"
    },
  ]

}


interface ChatItem {
  use_code: string;
  use_name: string;
  use_pic: string;
  last_msg: string;
};