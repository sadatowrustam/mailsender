/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcryptjs"
import { Users } from 'src/models/User';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userModel: Repository<Users>,
    private jwt:JwtService,
    private config:ConfigService
    ) {}
    async login(dto:any){ 
        const user=await this.userModel.findOneBy({username:dto.username})
        if(!user)
        throw new ForbiddenException("Credentials incorrect")
        const pwMatches=await bcrypt.compare(dto.password, user.password);
        if(!pwMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }
        delete user.password
        return this.signToken(user)
    }
    async edit(body:any,id:number){
        const user=await this.userModel.findOneBy({id})
        const pwMatches=await bcrypt.compare(body.password, user.password);
        if(!pwMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }
        try {
            const new_password = await bcrypt.hash(body.new_password, 10);
            const new_admin=await this.userModel.update({id},{
              password:new_password,username:body.username
            })  
          return this.signToken(new_admin)
  
      } catch (error) {
          throw error 
          }
      }
      async getMe(){
        
      }
async signToken(user:any):Promise<any>{
    const payload={
        id:user.username
    }
    const token= await this.jwt.signAsync(payload,{
        expiresIn:"3d",
        secret:this.config.get("JWT_SECRET")
    })
    return {access_token:token,user}
}
}

