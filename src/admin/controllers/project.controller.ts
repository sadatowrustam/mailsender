/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard';
import { ProjectsService } from '../services/project.service';

@Controller('users/projects')
@UseGuards(JwtGuard)
export class ProjectsController {
    constructor(private projectService:ProjectsService){}
    @Post()
    @Get()
    getProjects(){
        return this.projectService.getProjects()
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
    addDevice(@Param("id",ParseIntPipe) id:number,@Body() body:any){
        return this.projectService.addDevice(id,body)
    }
    @Get("device/:id")
    getDevice(@Param("id", ParseIntPipe) id:number){
        return this.projectService.getDevice(id)
    }
    @Patch("device/:id")
    editDevice(@Param("id", ParseIntPipe) id:number,@Body() body:any){
        return this.projectService.editDevice(id,body)
    }
    @Delete("device/:id")
    deleeDevice(@Param("id", ParseIntPipe) id:number){
        return this.projectService.deleteDevice(id)
    }
}
