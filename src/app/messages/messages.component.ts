import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  show = false;
  messages: string[] = this.messageService.messages;

  ngOnInit(): void {
    const isEmptyMessage = this.messageService.messages.length > 0;
    this.show = isEmptyMessage ? true : false;
  }

  clearMessage() {
    this.messageService.clear();
    this.messages = this.messageService.messages;
  }
}
