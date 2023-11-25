/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../models/Admin';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [AdminService,JwtStrategy],
  controllers: [AdminController],
  imports:[
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({}),
    ConfigModule,
    ProjectsModule
  ]
  
})
export class AdminModule {}
