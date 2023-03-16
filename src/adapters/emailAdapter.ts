import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()

export default async function send(email: string, subject: string, message: string){
    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env["EMAIL"],
                pass: process.env["EMAIL_PASSWORD"],
            },
            secure: true,
        });

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        const mailData = {
            from: {
                name: `Jeembo`,
                address: "myEmail@gmail.com",
            },
            to: email,
            subject: subject,
            html: message,
        };

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info);
                }
            });
        });
        return
    } catch (err){
        console.log(err)
    }
    }
// export const emailAdapter = {
//     async send(email: string, subject: string, message: string){
//         let transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env["EMAIL"], // generated ethereal user
//                 pass: process.env["EMAIL_PASSWORD"], // generated ethereal password
//             },
//         })
//         const mailOptions = {
//             from: `Jeembo <${process.env["EMAIL"]}>`, // sender address
//             to: email, // list of receivers
//             subject: subject, // Subject line
//             html: message, // html body
//         }
//
//         transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 // do something useful
//             }
//         })
//         return
//         // send mail with defined transport object
//
//     }
// }