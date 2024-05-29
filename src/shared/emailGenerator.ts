import * as nodemailer from 'nodemailer';
import { GenericSendEmailDataI } from 'src/interfaces';

export const sendEmail = async (data: GenericSendEmailDataI) => {
    try {
        
        const {
            emailFrom,
            emailTo,
            emailSubject,
            emailText,
        } = data;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        
        // Configure the mailoptions object
        const mailOptions = {
            to: emailTo,
            from: emailFrom,
            subject: emailSubject,
            text: emailText,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return;

    } catch (error) {
        console.log('error',error);
        throw error;
    }
    
}
    
