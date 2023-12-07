/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'src/models/Projects';
import { Templates } from 'src/models/Templates';
import * as nodemailer from "nodemailer";
import { Repository } from 'typeorm';
@Injectable()
export class MailsService {
    constructor(
        @InjectRepository(Projects) private projectModel:Repository<Projects>,
        @InjectRepository(Templates) private templateModel:Repository<Templates>
        ){}
    async sendMail(body:any){
        const project=await this.projectModel.findOneBy({index:body.index})
        if(!project) throw new NotFoundException("Project not found")
        const template=await this.templateModel.findOneBy({id:body.id})
        if(!template) throw new NotFoundException("Template not found")
        let text=template.template
        if(body.regex){
            const regex=JSON.parse(body.regex)
            const keys=Object.keys(regex)
            for (let i = 0; i < keys.length; i++) {
                const placeholderRegex = new RegExp(`{{${keys[i]}}}`, 'g');
                text = text.replace(placeholderRegex, regex[keys[i]]);
            }
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: 'rustamsadatov0@gmail.com',
                pass: 'smvamzeedrfahnkj',
            },
        });
        const mailOptions = {
            from: 'rustamsadatov0@gmail.com',
            to: body.receiver,
            subject: 'Notification',
            html:text,
        };
        await transporter.sendMail(mailOptions);
        return "Sucess"
    }
}
