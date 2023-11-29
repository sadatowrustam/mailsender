/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Users } from "./User";
import {Phones} from "./Phones"
@Entity({name:"projects"})
export class Projects{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    type:string
    @Column()
    template:string
    @Column()
    expireDate:Date
    @Column()
    sms_limit:number
    @Column()
    email_limit:number
    @Column()
    phone_limit:number
    @ManyToOne(()=>Users,(users)=>users.projects)
    user:Users
    @OneToMany(()=>Phones,(phones)=>phones.project)
    devices:Phones[]
    @Column({nullable:true})
    status:string
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
    
}