/* eslint-disable prettier/prettier */
import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class UserAdminDto {
    @IsEmail()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone_number:string
  }
  