/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  devices:object={};
  handleConnection(client: Socket) {
    client.on("login",(obj)=>{
      this.devices[obj.id]=client.id
    })
  }
  handleDisconnect(client: Socket) {
    return client
  }
  
  handleMessage(message: string,id:string) {
    console.log(this.devices,id)
    this.server.to(this.devices[id]).emit("send-message",message)
    console.log("handled")
    return "sucess"
  }
  
}
