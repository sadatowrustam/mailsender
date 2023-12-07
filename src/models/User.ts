/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./Projects";
import { Templates } from "./Templates";

@Entity({name:"users"})
export class Users{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string
    @Column()
    phone_number:string
    @Column()
    isActive:boolean
    @OneToMany(()=>Projects,(projects)=>projects.user)
    projects:Projects[]
    @OneToMany(()=>Templates,(templates)=>templates.user)
    templates:Templates[]
    @Column({default:new Date()})
    createdAt:Date
}