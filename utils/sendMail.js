const nodemailer = require("nodemailer");

async function sendMail({ email, username, password, type = "DOCTOR" }) {
    try {
        const transporter = nodemailer.createTransport(
            {
                service: "gmail",
                auth: {
                    user: process.env.MYGMAIL,
                    pass: process.env.PASSWORD,
                }
            });
        let mailHTML = `<html lang="en">

            <head>
                <title> Mail </title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link
                    href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        font-family: "Noto Sans", sans-serif;
                    }
        
                    :root {
                        --primary-bg-color: #adcccc;
                        --secondary-bg-color: #82bddc;
                        --primary-text-color: #101010;
                    }
        
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --secondary-bg-color: #1b262c;
                            --primary-bg-color: #0d1717;
                            --primary-text-color: #f4f4f4;
                        }
                    }
        
                    body {
                        background-color: var(--primary-bg-color);
                        font-family: "Indie Flower", cursive;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
        
                    main {
                        color: var(--primary-text-color);
                        height: 300px;
                        width: 400px;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid var(--secondary-bg-color);
                        border-radius: 10px;
                        padding: 12px;
                    }
        
                    h1 {
                        font-family: "Dancing Script", cursive;
                    }
        
                    .mail {
                        border-bottom: 1px solid var(--secondary-bg-color);
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        padding-bottom: 1rem;
                        margin-bottom: 1rem;
                    }
        
                    .mail .image {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 5px solid var(--secondary-bg-color);
                        padding: 5px;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
        
                    .mail .image img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
        
                    .mail h1 {
                        font-size: 1.5rem;
                    }
        
                    .para h3 {
                        margin-top: 1rem;
                    }
        
                    .para p {
                        line-height: 18px;
                        font-weight: 300;
                    }
                </style>
            </head>
        
            <body>
                <main>
                    <div class="mail">
                        <div class="image">
                            <img src="google.jpg" alt="Mind Peace">
                        </div>
                        <div class="title">
                            <h1> Successfully registerd on Mind Peace </h1>
                        </div>
        
                    </div>
                    <div class="para">
                        <p> Be part of a dynamic community dedicated to providing accessible and quality healthcare to all.</p>
                        <h3> Your Login details:-</h3>
                        <p> Username: -${username} </p>
                        <p> Password: -${password} </p>
                    </div>
                </main>
            </body>
        </html> `

        if (type === "USERS") {
            mailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Registering</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="text-align: center;">Thank You for Registering</h2>
        <p>Hello ${username},</p>
        <p>Thank you for registering on our website. We're excited to have you join our community!</p>
        <p>Your account details:</p>
        <ul>
            <li><strong>Name:</strong> ${username}</li>
            <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p>If you have any questions or need assistance, feel free to contact us.</p>
        <p>Welcome aboard!</p>
        <p style="text-align: center;"><a href="#" class="btn">Contact Us</a></p>
        <p style="text-align: center;">Best regards,<br>Sweta,Souvik<br>Hr,</p>
    </div>
</body>
</html>
`

        }
        else if (type === "RESEDULED") {
            mailHTML = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Rescheduled</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                    }
                    p {
                        color: #666;
                    }
                    .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .btn:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 style="text-align: center;">Appointment Rescheduled</h2>
                    <p>Hello there,</p>
                    <p>We want to inform you that due to an emergency your appointment with Dr. ${username}  has been rescheduled to the next day by doctor.</p>
                    <p>Please find the updated appointment details below:</p>
                    <ul>
                        <li><strong>Doctor:</strong> ${username}</li>
                        <li><strong>New Appointment Date:</strong> ${email}(Time remains the same).</li>
                    </ul>
                    <p>If you have any questions or need to reschedule, please feel free to contact us.</p>
                    <p>Best regards,<br>Mental Peace,<br>Ceo</p>
                </div>
            </body>
            </html>
            `
        }
        const mailOpions = {
            from: process.env.MYGMAIL,
            to: email,
            subject: "New registration on MIND PEACE.",
            text: "Thank you for registering on MIND PEACE. This is a confirmation mail regarding your registration.We welcome you to our community of serving people withmental illness. Please feel free to contact us regarding any issue.",
            html: mailHTML
        }
        const mailResponce = await transporter.sendMail(mailOpions)
        console.log(mailResponce);
        return mailResponce
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = sendMail