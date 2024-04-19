const nodemailer = require("nodemailer");

async function sendMail({ email, username, password }) {
    try {
        const transporter = nodemailer.createTransport(

            //     {
            //     host: "sandbox.smtp.mailtrap.io",
            //     port: 2525,
            //     secure: false,
            //     auth: {
            //         user: "0ada0503f0e7b6",
            //         pass: "f0af2125e3e0fa"
            //     }
            // }
            {
                service: "gmail",
                auth: {
                    user: process.env.MYGMAIL,
                    pass: process.env.PASSWORD
                }
            });

        const mailOpions = {
            from: process.env.MYGMAIL,
            to: email,
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: '<b style="color:red";>Hello world?</b>', // html body
        }
        const mailResponce = await transporter.sendMail(mailOpions)
        console.log(mailResponce);
        return mailResponce
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = sendMail