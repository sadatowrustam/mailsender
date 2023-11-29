/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'src/models/Projects';
import { Users } from 'src/models/User';
import { Phones } from 'src/models/Phones';

import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects) private projectModel: Repository<Projects>,
    @InjectRepository(Users) private usersModel:Repository<Users>,
    @InjectRepository(Users) private deviceModel:Repository<Phones>

    ) {}
  async createProject(body:any,user:any){
    const new_project=await this.projectModel.create({...body,createdAt:new Date(),user});
    await this.projectModel.save(new_project)
    return new_project;
  }
  async getProjects(userId:number){
    const userWithProjects = await this.projectModel.find({where:{user:{id:userId}}})
    // Access the projects associated with the user
    return userWithProjects
  }
  async getOneProject(id:number){
    const one_project = await this.projectModel.find({relations:["devices"],where:{id}})
    if(!one_project) throw new NotFoundException("Project not found")
    // Access the projects associated with the use
    return one_project
  }
  async editProject(id:number,body:any){
    // const one_project = await this.projectModel.find({relations:["phones"],where:{id}})
    const one_project = await this.projectModel.findOneBy({id})

    if(!one_project) throw new NotFoundException("Project not found")
    // Access the projects associated with the user
    await this.projectModel.update({id},{...body,status:"pending"})
    return one_project
  }
  async addDevice(id:number){
    const one_project = await this.projectModel.findOneBy({id})
    if(!one_project) throw new NotFoundException("Project not found")
    const newDevice=await this.deviceModel.create({project:{id}})
    await this.deviceModel.save(newDevice)
    // Access the projects associated with the use
    return newDevice
  }
}
