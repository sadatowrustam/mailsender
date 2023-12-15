/* eslint-disable prettier/prettier */
import {  Global, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Phones } from 'src/models/Phones';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class MessagesService {
    constructor(
        private chatService:ChatGateway,
        @InjectRepository(Phones) private deviceModel:Repository<Phones>
        ){}
    async sendMessage(body:any){
        const device=await this.deviceModel.findOneBy({index:body.index})        
        if(!device) throw new NotFoundException("Device not found")
        return this.chatService.handleMessage(body,device.socketId)
        // return this.chatService.handleMessage(body,"index")
    }
    async newSocketId(index:string){
        const device=await this.deviceModel.findOne({where:{index}})
        console.log(device)
        return true
    }
}
