/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../models/Admin';
import { Users } from '../models/User';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/jwt-strategy/admin.jwt.strategy';
import { ProjectsModule } from 'src/projects/projects.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
@Module({
  providers: [AdminService,JwtStrategy,UserService],
  controllers: [AdminController,UserController],
  imports:[
    TypeOrmModule.forFeature([Admin,Users]),
    JwtModule.register({}),
    ConfigModule,
    ProjectsModule
  ]
})
export class AdminModule {}
