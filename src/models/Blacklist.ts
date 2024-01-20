/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"blacklist"})
export class Blacklist{
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:true})
    text:string
    @Column()
    createdAt:Date
    @Column({default:new Date()})
    updatedAt:Date
}