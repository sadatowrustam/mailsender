/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/User';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { ProjectsService } from './services/project.service';
import { ProjectsController } from './controllers/projects.controller';
import { Projects } from 'src/models/Projects';
import { Phones } from 'src/models/Phones';
import { TemplatesService } from './services/template.service';
import { TemplateController } from './controllers/templates.controller';
import { Templates } from 'src/models/Templates';

@Module({
  controllers: [UsersController,ProjectsController,TemplateController],
  providers: [UsersService,JwtStrategy,ProjectsService,TemplatesService],
  imports:[
    TypeOrmModule.forFeature([Users,Projects,Phones,Templates]),
    JwtModule.register({}),
    ConfigModule,
  ]
})
export class UsersModule {}
