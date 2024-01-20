/* eslint-disable prettier/prettier */
import { Body, Controller, Post,HttpCode,Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService){}
    @Post()
    @HttpCode(200)
    sendMessage(@Body() body:any,@Req() request:Request){
        return this.messagesService.sendMessage(body,request.ip)
    }
}
