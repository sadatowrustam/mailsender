/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { WebsocketsGateway } from 'src/websockets.gateway';

@Module({
  providers: [MessagesService,WebsocketsGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}
