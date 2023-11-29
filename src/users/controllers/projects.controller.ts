/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard';
import { GetUser } from 'src/admin/decorator';
import { ProjectsService } from '../services/project.service';

@Controller('users/projects')
@UseGuards(JwtGuard)
export class ProjectsController {
    constructor(private projectService:ProjectsService){}
    @Post()
    createProject(@Body() body:any,@GetUser("id") user:any){
        return this.projectService.createProject(body,user)
    }
    @Get()
    getProjects(@GetUser() user:any){
        return this.projectService.getProjects(user.id)
    }
    @Get(":id")
    getOneProject(@Param("id",ParseIntPipe) id:number){
        return this.projectService.getOneProject(id)
    }
    @Patch(":id")
    editProject(@Param("id", ParseIntPipe)id:number,@Body() body:any){
        return this.projectService.editProject(id,body)
    }
    @Post(":id/device")
    addDevice(@Param("id",ParseIntPipe) id:number){
        return this.projectService.addDevice(id)
    }
}
