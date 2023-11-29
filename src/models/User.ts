/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./Projects";

@Entity({name:"users"})
export class Users{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string
    @Column({nullable:true})
    phone_number:string
    @Column()
    isActive:boolean
    @OneToMany(()=>Projects,(projects)=>projects.user)
    projects:Projects[]
    @Column({default:new Date()})
    createdAt:Date
}