import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer'; //nodemailer 임포트

import { Injectable } from '@nestjs/common';

interface EmailOptions { // 1
    to: string; //수신자
    subject: string; //메일 제목
    html: string; //html 형식
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({ // 2
            service: 'Gmail',
            auth: {
                user: 'dkswlsvy3312@gmail.com', // TODO: config
                pass: 'xxhoqrhnhppgqvao' // TODO: config
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
        const baseUrl = 'http://localhost:3000'; // TODO: config

        const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`; // 3

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            // 4
            html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST"> 
          <button>가입확인</button>
        </form>
      ` //form 태그를 이용해 POST 요청을 한다.
        }

        return await this.transporter.sendMail(mailOptions);// 5
    }
}
