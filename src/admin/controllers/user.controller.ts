/* eslint-disable prettier/prettier */
import { Body, Controller,  Post, UseGuards, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {UserAdminDto} from "../dto/user.dto"
import { JwtGuard } from '../guard';

@Controller('admin/users')
@UseGuards(JwtGuard)    
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    getUsers(){
        return this.userService.getUsers()
    }
    @Post()
    createUser(@Body() body:UserAdminDto){
        return this.userService.createUser(body)
    }
    @Get("/:id")
    getOneUser(@Param("id", ParseIntPipe) id:number){
        return this.userService.getUser(id)
    }
}
