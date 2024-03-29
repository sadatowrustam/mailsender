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
import { CorsMiddleware } from './cors.middleware';
import { ChatGateway } from './chat/chat.gateway';
import { Logs } from './models/Logs';
import { BlacklistModule } from './blacklist/blacklist.module';
import { Blacklist } from './models/Blacklist';
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
      entities: [Admin, Projects, Users, Phones, Templates, Logs, Blacklist],
    }),
    AdminModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    UsersModule,
    MailsModule,
    MessagesModule,
    BlacklistModule,
  ],
  providers: [CorsMiddleware, ChatGateway],
})
export class AppModule {}
