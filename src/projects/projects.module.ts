/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtStrategy } from 'src/admin/strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/models/Admin';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, JwtStrategy],
  imports:[JwtModule.register({}),TypeOrmModule.forFeature([Admin]),]
})
export class ProjectsModule {}
