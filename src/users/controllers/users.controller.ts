/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtGuard } from '../guard';
import { GetUser } from 'src/admin/decorator';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post("login")
    login(@Body() body:any){
        return this.userService.login(body)
    }

    @Get("get-me")
    @UseGuards(JwtGuard)
    getMe(@GetUser() user:any){
        return user
    }
}
