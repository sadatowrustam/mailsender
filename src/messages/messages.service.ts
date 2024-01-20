/* eslint-disable prettier/prettier */
import {  Global, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Logs } from 'src/models/Logs';
import { Phones } from 'src/models/Phones';
import { Projects } from 'src/models/Projects';
import { Templates } from 'src/models/Templates';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class MessagesService {
    constructor(
        private chatService:ChatGateway,
        @InjectRepository(Phones) private deviceModel:Repository<Phones>,
        @InjectRepository(Logs) private logModel:Repository<Logs>,
        @InjectRepository(Projects) private projectModel:Repository<Projects>,
        @InjectRepository(Templates) private templateModel:Repository<Templates>
        ){}
    async sendMessage(body:any,ip:string){
        const device=await this.deviceModel.findOneBy({index:body.index})        
        let newLog
        if(!device) throw new NotFoundException("Device not found")
        newLog=await this.logModel.create({method:"POST",url:"http://192.168.57.9:5012/messsages",status:404,ip,createdAt:new Date()})
        await this.logModel.save(newLog)
        const template=await this.templateModel.findOneBy({id:body.id})
        if(!template) {
            newLog=await this.logModel.create({method:"POST",url:"http://192.168.57.9:5012/messsages",status:404,ip,createdAt:new Date()})
            await this.logModel.save(newLog)
            throw new NotFoundException("Template not found")
        }
        let text=template.template
        if(body.regex){
            const regex=JSON.parse(body.regex)
            const keys=Object.keys(regex)
            for (let i = 0; i < keys.length; i++) {
                const placeholderRegex = new RegExp(`{{${keys[i]}}}`, 'g');
                text = text.replace(placeholderRegex, regex[keys[i]]);
            }
        }
        const result=this.chatService.handleMessage(text,body.index)
        console.log(result)
        if(result=="sucess"){
            console.log(44)
            newLog=await this.logModel.create({method:"POST",url:"http://192.168.57.9:5012/messsages",status:200,ip,createdAt:new Date()})
            await this.logModel.save(newLog)
            return "Sucess"
        }
        else throw new Error("Something went wrong")
        }
}
