/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
@WebSocketGateway({
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})
@Injectable()
export class ChatGateway {
  constructor(private messageService:MessagesService){}
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    client.on("login",(obj)=>{

      console.log("logged in",obj)
    })
  }
  handleDisconnect(client: Socket) {
    console.log("disc")
    return client
  }
  
  handleMessage(message: string,id:string) {
    this.server.emit("send-message",id)
    console.log("handled")
    return {message}
  }
  
}
