/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./Projects";

@Entity({name:"phones"})
export class Phones{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    index:string
    @Column({nullable:true})
    name:string
    @Column({nullable:true})
    socketId:string
    @ManyToOne(()=>Projects,(projects)=>projects.devices)
    project:Projects
    @Column()
    projectId:number
    @Column({nullable:true})
    status:string
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
    
}