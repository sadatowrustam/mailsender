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

@Module({
  controllers: [UsersController,ProjectsController],
  providers: [UsersService,JwtStrategy,ProjectsService],
  imports:[
    TypeOrmModule.forFeature([Users,Projects]),
    JwtModule.register({}),
    ConfigModule,
  ]
})
export class UsersModule {}
