/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'src/models/Projects';
import { Users } from 'src/models/User';
import { Phones } from 'src/models/Phones';
import * as randomstring from "randomstring"
import { Repository } from 'typeorm';
import * as uuid from "uuid"
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects) private projectModel: Repository<Projects>,
    @InjectRepository(Users) private usersModel:Repository<Users>,
    @InjectRepository(Phones) private deviceModel:Repository<Phones>

    ) {}
  async createProject(body:any,user:any){
    const new_project=await this.projectModel.create({...body,createdAt:new Date(),user,index:uuid.v4()});
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
    const one_project = await this.projectModel.findOneBy({id})
    if(!one_project) throw new NotFoundException("Project not found")
    await this.projectModel.update({id},{...body,status:"pending"})
    return one_project
  }
  async addDevice(id:number,body:any){
    console.log("men barde")
    const index=randomstring.generate({length:6})
    const one_project = await this.projectModel.findOne({where:{id}})
    if(!one_project) throw new NotFoundException("Project not found")
    const newDevice=await this.deviceModel.create({...body,projectId:one_project.id,index,createdAt:new Date()})
    await this.deviceModel.save(newDevice)
    // Access the projects associated with the use
    return newDevice
  }
  async getDevice(id:number){
    const oneDevice=await this.deviceModel.find({where:{id},relations:["project"]})
    if(oneDevice.length==0) throw new NotFoundException("Device not found")
    return oneDevice[0]
  }
  async editDevice(id:number,body:any){
    let oneDevice=await this.deviceModel.findOne({where:{id}})
    if(!oneDevice) throw new NotFoundException("Device not found")
    await this.deviceModel.update({id},{...body})
    oneDevice=await this.deviceModel.findOne({where:{id}})
    return oneDevice
  }
  async deleteDevice(id:number){
    const oneDevice=await this.deviceModel.findOne({where:{id}})
    if(!oneDevice) throw new NotFoundException("Device not found")
    await this.deviceModel.delete({id})
    return "Sucess"
  }
}
