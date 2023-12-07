/* eslint-disable prettier/prettier */
import { Body, Controller,  Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard';
import { GetUser } from 'src/admin/decorator';
import { TemplatesService } from '../services/template.service';

@Controller('users/templates')
@UseGuards(JwtGuard)
export class TemplateController {
    constructor(private templateService:TemplatesService){}
    @Post()
    createTemplate(@Body() body:any,@GetUser() user:any){
        return this.templateService.createTemplate(body,user)
    }
    @Get()
    getProjects(@GetUser() user:any){
        return this.templateService.getTemplates(user.id)
    }
    @Get(":id")
    getOneProject(@Param("id",ParseIntPipe) id:number){
        return this.templateService.getOneTemplate(id)
    }
    @Patch(":id")
    editProject(@Param("id", ParseIntPipe)id:number,@Body() body:any){
        return this.templateService.editTemplate(id,body)
    }
}
