/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlacklistController } from './blacklist.controller';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from 'src/models/Blacklist';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from '@nestjs/config';
import { JwtStrategy } from 'src/jwt-strategy/admin.jwt.strategy';
import { Admin } from 'src/models/Admin';
import { Users } from 'src/models/User';

@Module({
  controllers: [BlacklistController],
  providers: [BlacklistService,JwtStrategy],
  imports:[
    TypeOrmModule.forFeature([Admin,Blacklist,Users]),
    JwtModule.register({}),
    ConfigModule,
  ]
})
export class BlacklistModule {}
