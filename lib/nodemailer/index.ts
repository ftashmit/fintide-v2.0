import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.NODEMAILER_EMAIL!,
        pass:process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail=async({email, name, intro}: WelcomeEmailData)=>{
    const htmlTemplate= WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

    const mailOptions={
        from:process.env.NODEMAILER_EMAIL!,
        to:email,
        subject:'Welcome to Fintide - your stock market toolkit is ready!',
        text: 'Thanks for joining Fintide! We are excited to have you on board.',
        html:htmlTemplate,
    }
    await transporter.sendMail(mailOptions);
}