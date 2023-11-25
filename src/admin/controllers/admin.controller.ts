/* eslint-disable prettier/prettier */
import { Body, Controller,  Post,Patch, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AdminLogin } from 'src/dto';
import { JwtGuard } from '../guard';
import { GetUser } from '../decorator';

@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){}
    @Post("/login")
    login(@Body() body:AdminLogin){
        return this.adminService.signin(body)
    }
    @Post("/seed")
    seed(){
        return this.adminService.seed()
    }
    @Patch()
    @UseGuards(JwtGuard)    
    editAdmin(@Body() body:any,@GetUser("id") id:number){
        return this.adminService.edit(body,id)
    }
}
