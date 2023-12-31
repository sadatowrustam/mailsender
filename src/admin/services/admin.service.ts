/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLogin } from 'src/dto';
import { Admin } from 'src/models/Admin';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcryptjs"
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminModel: Repository<Admin>,
    private jwt:JwtService,
    private config:ConfigService
    ) {}

    async signin(dto:AdminLogin){ 
        const admin=await this.adminModel.findOneBy({username:dto.username})
        if(!admin)
        throw new ForbiddenException("Credentials incorrect")
        const pwMatches=await bcrypt.compare(dto.password, admin.password);
        if(!pwMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }
        delete admin.password
        return this.signToken(admin)
    }
  async seed(){
      try {
        const password = await bcrypt.hash('admin', 10);

        const username="admin"
        const new_admin=await this.adminModel.create({
            password,username
        })
        await this.adminModel.save(new_admin);

        return this.signToken(new_admin)

    } catch (error) {
        throw error 
        }
    }
    async edit(body:any,id:number){
        const admin=await this.adminModel.findOneBy({id})
        const pwMatches=await bcrypt.compare(body.password, admin.password);
        if(!pwMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }
        try {
            const new_password = await bcrypt.hash(body.new_password, 10);
            const new_admin=await this.adminModel.update({id},{
              password:new_password,username:body.username
            })  
          return this.signToken(new_admin)
  
      } catch (error) {
          throw error 
          }
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
