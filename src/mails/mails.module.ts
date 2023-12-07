/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from 'src/models/Projects';
import { Templates } from 'src/models/Templates';

@Module({
  controllers: [MailsController],
  providers: [MailsService],
  imports:[
    TypeOrmModule.forFeature([Projects,Templates])
  ]
})
export class MailsModule {}
