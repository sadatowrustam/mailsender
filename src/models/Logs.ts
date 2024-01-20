/* eslint-disable prettier/prettier */
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"logs"})
export class Logs{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    ip:string
    @Column()
    method:string
    @Column({nullable:true})
    url:string
    @Column({nullable:true})
    status:number
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
    
}