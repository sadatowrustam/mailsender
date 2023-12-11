/* eslint-disable prettier/prettier */
// src/websockets.gateway.ts

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('login')
  handleMessage(client: any, payload: any): void {
    console.log(payload)
    this.server.emit('message', payload);
  }
}
