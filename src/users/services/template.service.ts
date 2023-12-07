/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Templates } from 'src/models/Templates';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Templates) private templateModel: Repository<Templates>) {}
  async createTemplate(body:any,user:any){
    console.log(body)
    const new_template=await this.templateModel.create({...body,createdAt:new Date(),user});
    await this.templateModel.save(new_template)
    console.log(new_template)
    return new_template;
  }
  async getTemplates(userId:number){
    const userTemplates = await this.templateModel.find({where:{user:{id:userId}}})
    // Access the projects associated with the user
    return userTemplates
  }
  async getOneTemplate(id:number){
    const one_template = await this.templateModel.findOneBy({id})
    if(!one_template) throw new NotFoundException("Template not found")
    // Access the projects associated with the use
    return one_template
  }
  async editTemplate(id:number,body:any){
    const one_template = await this.templateModel.findOneBy({id})
    if(!one_template) throw new NotFoundException("Template not found")
    await this.templateModel.update({id},{...body})
    return one_template
  }
}
