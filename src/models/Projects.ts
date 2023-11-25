/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
    
}