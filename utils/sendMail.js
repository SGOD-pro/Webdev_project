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
        user:process.env.MYGMAIL,
        pass:process.env.PASSWORD
    }
});

        const mailOpions = {
            from: process.env.MYGMAIL,
            to: "hackgodsk112@gmail.com", // list of receivers
            subject: "New registration found on MIND PEACE", // Subject line
            text: "Thank you for registering on our website.This is a confirmation mail regarding your registration.We heartly welcome you to our community of serving people suffering from mental illness. For any detailed information please feel to contact.", // plain text body
            html: '<b style="color:black";>New registration found on MIND PEACE</b>',
            '<p style= "color:blue";>process.env.MYGMAIL', // html body
        }
        const mailResponce = await transporter.sendMail(mailOpions)
    } catch (error) {
        throw new Error(error.message)
    }
}

sendMail()