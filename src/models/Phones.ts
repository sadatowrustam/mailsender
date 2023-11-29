/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Projects } from "./Projects";

@Entity({name:"phones"})
export class Phones{
    @PrimaryColumn()
    id:string
    @Column()
    index:string
    @Column()
    socketId:string
    @ManyToOne(()=>Projects,(projects)=>projects.devices)
    project:Projects
    @Column({nullable:true})
    status:string
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
    
}