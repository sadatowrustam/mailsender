import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './models/Admin';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './models/Projects';
import { Users } from './models/User';
import { Phones } from './models/Phones';

import { UsersModule } from './users/users.module';
import { Templates } from './models/Templates';
import { MailsModule } from './mails/mails.module';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kuwat2009',
      database: 'mailsender',
      synchronize: true,
      entities: [Admin, Projects, Users, Phones, Templates],
    }),
    AdminModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    UsersModule,
    MailsModule,
    MessagesModule,
  ],
})
export class AppModule {}
