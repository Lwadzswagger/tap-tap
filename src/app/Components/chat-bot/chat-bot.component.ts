import { Component, OnInit } from '@angular/core';
import { ChatService, Message} from 'src/app/services/chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  today = Date.now();
  liveChat;

  constructor(public chat: ChatService) {this.liveChat = this.chat.liveChat;  }
 ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }

  sendMessage() {
if (this.formValue) {
  this.chat.converse(this.formValue);
  this.formValue = '';
}
  }


}
