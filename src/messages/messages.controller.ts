/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService){}
    @Post()
    sendMessage(@Body() body:any){
        this.messagesService.sendMessage(body)
    }
}
