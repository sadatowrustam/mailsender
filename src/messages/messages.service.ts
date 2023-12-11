/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { WebsocketsGateway } from '../websockets.gateway';

@Injectable()
export class MessagesService {
    constructor(@Inject(WebsocketsGateway) private readonly websocket:WebsocketsGateway){}

    async sendMessage(body:any){
        this.websocket.server.emit("message","This is message")
        return body
    }
}
