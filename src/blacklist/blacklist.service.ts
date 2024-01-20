/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from 'src/models/Blacklist';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
    constructor (@InjectRepository(Blacklist) private blacklistModel:Repository<Blacklist>){}
    async createBlacklist(body:any){
        const newBlacklist=await this.blacklistModel.create({createdAt:new Date(),...body})
        await this.blacklistModel.save(newBlacklist)
        return newBlacklist
    }
    async getBlacklist(){
        const blacklist=await this.blacklistModel.find()
        return blacklist
    }
    async getOneBlacklist(id:number){
        const blacklist=await this.blacklistModel.findOneBy({id})
        if(!blacklist) throw new NotFoundException("Blacklist not found")
        return blacklist
    }
    async editBlacklist(body:any,id:number){
        const blacklist=await this.blacklistModel.findOneBy({id})
        if(!blacklist) throw new NotFoundException("Blacklist not found")
        await this.blacklistModel.update({id},{...body})
        return "Sucess"
    }
    async deleteBlacklist(id:number){
        const blacklist=await this.blacklistModel.findOneBy({id})
        if(!blacklist) throw new NotFoundException("Blacklist not found")
        await this.blacklistModel.delete({id})
        return "Sucess"
    }
}
