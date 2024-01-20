/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtStrategy } from 'src/jwt-strategy/admin.jwt.strategy';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/models/Admin';
import { Users } from 'src/models/User';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtStrategy],
  imports:[JwtModule.register({}),TypeOrmModule.forFeature([Admin,Users]),]
})
export class ProjectsModule {}
