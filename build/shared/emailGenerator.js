"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const sendEmail = async (data) => {
    try {
        const { emailFrom, emailTo, emailSubject, emailText, } = data;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        const mailOptions = {
            to: emailTo,
            from: emailFrom,
            subject: emailSubject,
            text: emailText,
        };
        await transporter.sendMail(mailOptions);
        return;
    }
    catch (error) {
        console.log('error', error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailGenerator.js.map