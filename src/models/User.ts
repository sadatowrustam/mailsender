/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}