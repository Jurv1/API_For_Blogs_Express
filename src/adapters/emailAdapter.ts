import nodemailer from "nodemailer"

export const emailAdapter = {
    async send(email: string, subject: string, message: string){
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "", // generated ethereal user
                pass: "", // generated ethereal password
            },
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        })
        return info
    }
}