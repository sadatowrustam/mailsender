/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { Admin } from 'src/models/Admin';
import { Users } from 'src/models/User';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    @InjectRepository(Admin) private adminModel: Repository<Admin>,
    @InjectRepository(Users) private usersModel: Repository<Users>
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        _secretOrKey: config.get('JWT_SECRET'),
      get secretOrKey() {
          return this._secretOrKey;
      },
      set secretOrKey(value) {
          this._secretOrKey = value;
      },
    });
  }

  async validate(payload: any) {
    const admin=await this.adminModel.findOneBy({username:payload.id})
    const user=await  this.usersModel.findOneBy({username:payload.id})
    if(admin!=null) return admin
    if(user!=null) return user;
  }
}
