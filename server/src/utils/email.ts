import { testInfoEmailType } from "../config/TestEmailConfig";

import nodemailer from 'nodemailer';
import pug from 'pug';
import {convert} from 'html-to-text';

interface userType {
    email: string;
    name: string;
}

export default class Email {
    private to: string;
    private firstName: string;
    private url: string;
    private from: string;

    constructor(user: userType, url: string) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `ExamFusion <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === "production") {
            // Sendgrid
            return nodemailer.createTransport({
                // host: process.env.BREVO_HOST,
                // port: process.env.BREVO_PORT,
                service: "Brevo",
                auth: {
                    user: process.env.BREVO_USERNAME,
                    pass: process.env.BREVO_PASSWORD,
                },
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST as string,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send(template: string, subject: string, testInfoEmail: testInfoEmailType | undefined) {
        // Send the actual email
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            testInfoEmail,
            subject,
        });

        // 2) Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html),
            // text: htmlToText.convert(html),
        };

        // 3) Create a transport and send email
        // this.newTransport();
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send("welcome", "Welcome to the ExamFusion Platform!", undefined);
    }
    
    async sendTestLink(testInfoEmail: testInfoEmailType){
        await this.send("testLink", "Get Ready to Access Your Upcoming Assessment", testInfoEmail);
    }
};

