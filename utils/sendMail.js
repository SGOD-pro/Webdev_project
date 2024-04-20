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
    service:"gmail",
    auth:{
        user:process.env.MYGMAIL,
        pass:process.env.PASSWORD,
    }
});

        const mailOpions = {
            from: process.env.MYGMAIL,
            to: email, // list of receivers
            subject: "New registration on MIND PEACE.", // Subject line
            text: "Thank you for registering on MIND PEACE. This is a confirmation mail regarding your registration.We welcome you to our community of serving people withmental illness. Please feel free to contact us regarding any issue.", // plain text body
            html: `<H2 style="color:black";>You have successfuly registerd on MIND PEACE.</H2> <p style=background-color:yellow";>username=${username}</p> <p style=background-color:yellow";>password=${password}</p> `// html body
        }
        const mailResponce = await transporter.sendMail(mailOpions)
        console.log(mailResponce);
        return mailResponce
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}
module.exports = sendMail