import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './models/Admin';
import { ProjectsModule } from './projects/projects.module';
import { Projects } from './models/Projects';
import { Users } from './models/User';
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
      entities: [Admin, Projects, Users],
    }),
    AdminModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
  ],
})
export class AppModule {}
