/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { Users } from "./User";

@Entity({name:"templates"})
export class Templates{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({nullable:true})
    type:string
    @Column({nullable:true})
    template:string
    @ManyToOne(()=>Users,(users)=>users.templates)
    user:Users
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
}