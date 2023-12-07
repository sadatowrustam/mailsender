/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLogin } from 'src/dto';
import { Users } from 'src/models/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcryptjs"
import {UserAdminDto} from "../dto/user.dto"

// import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userModel: Repository<Users>,
    private jwt:JwtService,
    private config:ConfigService
    ) {}
    async getUsers(){
        const users=await this.userModel.find()
        return users
    }
    async signin(dto:AdminLogin){ 
        const admin=await this.userModel.findOneBy({username:dto.username})
        if(!admin)
        throw new ForbiddenException("Credentials incorrect")
        
        const pwMatches=await bcrypt.compare(dto.password, admin.password);
        if(!pwMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }
        delete admin.password
        return this.signToken(admin)
    }
    async createUser(body:UserAdminDto){
      const new_password = await bcrypt.hash(body.password, 10);
      const user=await this.userModel.create({...body,password:new_password,isActive:true})
      const saved_user=await this.userModel.save(user)
      return saved_user
    }
    async getUser(id:number){
        const user=await this.userModel.findOne({where:{id},relations:["projects"]})
        if(!user)
            throw new NotFoundException("User not found")
        return user
    }
    
async signToken(admin:any):Promise<any>{
    const payload={
        id:admin.username
    }
    const token= await this.jwt.signAsync(payload,{
        expiresIn:"15m",
        secret:this.config.get("JWT_SECRET")
    })
    return {access_token:token,admin}
}
}
