const nodemailer = require("nodemailer");

async function sendMail({ email, username, password }) {
    try {
        const transporter = nodemailer.createTransport(
            {
                service: "gmail",
                auth: {
                    user: process.env.MYGMAIL,
                    pass: process.env.PASSWORD,
                }
            });

        const mailOpions = {
            from: process.env.MYGMAIL,
            to: email, // list of receivers
            subject: "New registration on MIND PEACE.", // Subject line
            text: "Thank you for registering on MIND PEACE. This is a confirmation mail regarding your registration.We welcome you to our community of serving people withmental illness. Please feel free to contact us regarding any issue.", // plain text body
            html: `<html lang="en">

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
        
        </html> `// html body
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