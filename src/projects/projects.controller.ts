/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/admin/guard';

@Controller('projects')
export class ProjectsController {
    @Get()
    @UseGuards(JwtGuard)
    getProjects(){
        return "here is projects"
    }
    @Get("my-projects")
    @UseGuards(JwtGuard)
    getUserProjects(){
        return "here is projects"
    }
}
