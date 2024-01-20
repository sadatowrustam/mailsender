/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { JwtGuard } from 'src/admin/guard';
@Controller('blacklist')
@UseGuards(JwtGuard)
export class BlacklistController {
    constructor (private blacklistService: BlacklistService){}
    @Post()
    createBlacklist(@Body() body:any){
        return this.blacklistService.createBlacklist(body)
    }
    @Get()
    getBlacklist(){
        return this.blacklistService.getBlacklist()
    }
    @Get(":id")
    getOneBlacklist(@Param("id",ParseIntPipe) id:number){
        return this.blacklistService.getOneBlacklist(id)
    }
    @Patch(":id")
    editBlacklist(@Body() body:any,@Param("id",ParseIntPipe)id:number){
        return this.blacklistService.editBlacklist(body,id)
    }
    @Delete(":id")
    deleteBlacklist(@Param("id",ParseIntPipe)id:number){
        return this.blacklistService.deleteBlacklist(id)
    }
}
