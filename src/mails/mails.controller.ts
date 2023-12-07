/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
    constructor(private mailService:MailsService){}
    @Post("")
    sendMail(@Body() body:any){
        return this.mailService.sendMail(body)
    }
}
