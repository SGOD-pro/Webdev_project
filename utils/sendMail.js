const nodemailer = require("nodemailer");

async function sendMail() {
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
    service:"gmail",
    auth:{
        user:"testing938212@gmail.com",
        pass:"svxy ddif uylb sioz"
    }
});

        const mailOpions = {
            from: "testing938212@gmail.com",
            to: "hackgodsk112@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        const mailResponce = await transporter.sendMail(mailOpions)
    } catch (error) {
        throw new Error(error.message)
    }
}

sendMail()