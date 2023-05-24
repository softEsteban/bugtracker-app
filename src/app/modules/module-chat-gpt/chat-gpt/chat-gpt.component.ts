import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { ChatGptService } from '../services/chatgpt.service';


interface ChatHistory {
  msg_id: string;
  msg_text: string;
  msg_datins: string;
  use_name: string;
  use_code: string;
}

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss']
})
export class ChatGptComponent implements OnInit {

  @ViewChild('chatMessages', { static: true }) chatMessages!: ElementRef;

  userData: any;
  userName: string = "";
  inputText: string = "";
  history: ChatHistory[] = [
    // {
    //   msg_id: "1",
    //   msg_text: "Hola",
    //   msg_datins: "26/05/23 12:22 PM",
    //   use_name: "Esteban",
    //   use_code: "estebantoro.greenamn@gmail.com",
    // },
    // {
    //   msg_id: "1",
    //   msg_text: "¿En que puedo ayudarte?",
    //   msg_datins: "26/05/23 12:22 PM",
    //   use_name: "Chat GPT",
    //   use_code: "chat-gpt",
    // }
  ];

  constructor(
    private globalService: GlobalService,
    private chatGptService: ChatGptService
  ) {
    globalService.setTitle("Chat GPT");
  }

  ngOnInit(): void {
    this.getUserData();
  }

  async sendChat(text: string) {

    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;

    //User input
    this.history.push({
      msg_id: "3",
      msg_text: text,
      msg_datins: formattedTime,
      use_name: this.userName,
      use_code: ""
    })

    this.inputText = "";

    //Data request
    const msg = {
      message: text,
      responseType: "message"
    };

    const data = await this.chatGptService.sendMessage(msg);
    let response = JSON.parse(JSON.stringify(data))

    if (response && response["message"] === "Chat gpt response") {
      this.history.push({
        msg_id: "3",
        msg_text: response.data,
        msg_datins: formattedTime,
        use_name: "Chat GPT",
        use_code: "chat-gpt"
      })
    }

    // Scroll to the bottom of the chat messages
    this.scrollToBottom();
  }

  getUserData() {
    let user = localStorage.getItem("user");
    if (user != null) {
      this.userData = JSON.parse(user);
      this.userName = this.userData.use_name;
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const element = this.chatMessages.nativeElement;
      element.scrollTop = element.scrollHeight;
    }, 0);
  }

  getMessageMargin(useCode: string) {
    if (useCode !== 'chat-gpt') {
      return {
        'margin': '10px 79px 5px 0px',
        'background-color': '#fdfdfd'
      };
    } else {
      return {
        'margin': '10px 0px 5px 79px',
        'background-color': '#f5f5ff'
      };
    }
  }









}
