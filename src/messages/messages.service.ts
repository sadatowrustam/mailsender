/* eslint-disable prettier/prettier */
import {  Global, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Logs } from 'src/models/Logs';
import { Phones } from 'src/models/Phones';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class MessagesService {
    constructor(
        private chatService:ChatGateway,
        @InjectRepository(Phones) private deviceModel:Repository<Phones>,
        @InjectRepository(Logs) private logModel:Repository<Logs>
        ){}
    async sendMessage(body:any){
        const device=await this.deviceModel.findOneBy({index:body.index})        
        if(!device) throw new NotFoundException("Device not found")
        const result=this.chatService.handleMessage(body.text,body.index)
        if(result=="sucess"){
            const newLog=await this.logModel.create({method:"POST",url:"http://192.168.57.9:5012/messsages",status:200})
            await this.logModel.save(newLog)
            return {status:"sucess"}}
        else throw new Error("Something went wrong")
        }
}
