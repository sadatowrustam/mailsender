/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatGateway } from 'src/chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phones } from 'src/models/Phones';

@Module({
  providers: [ChatGateway, MessagesService],
  exports:[MessagesService],
  controllers: [MessagesController],
  imports:[TypeOrmModule.forFeature([Phones])]
})
export class MessagesModule {}
