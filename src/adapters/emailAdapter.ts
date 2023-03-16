import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()
export const emailAdapter = {
    async send(email: string, subject: string, message: string){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env["EMAIL"], // generated ethereal user
                pass: process.env["EMAIL_PASSWORD"], // generated ethereal password
            },
        })
        const mailOptions = {
            from: `Jeembo <${process.env["EMAIL"]}>`, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                // do something useful
            }
        })
        return
        // send mail with defined transport object

    }
}