/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"templates"})
export class Projects{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    type:string
    @Column()
    template:Text
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
}