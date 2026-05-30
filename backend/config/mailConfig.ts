
import nodemailer from 'nodemailer';
import EnvVars from './EnvVars';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EnvVars.NODEMAILER_USER,
        pass: EnvVars.NODEMAILER_PASS,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP ERROR:", error)
    } else {
        console.log("Nodemailer ready")
    }
})

const sendEmail = async (to: string, subject: string, body: string) => {
    await transporter.sendMail({
        from: `Your Expansio. ${EnvVars.NODEMAILER_USER}`,
        to,
        subject,
        html: body
    })
}


export const sendVerificationToEmail = async (to: string, token: string) => {
    const verificationUrl = `https://expense-tracker-chi-dun-13.vercel.app/verify-email/${token}`

    const html = `
    <div style="
        font-family: Arial, sans-serif;
        background-color: #0b0b0b;
        padding: 40px 20px;
        color: #ffffff;
    ">
        <div style="
            max-width: 600px;
            margin: auto;
            background: #111111;
            border: 1px solid #222;
            border-radius: 16px;
            overflow: hidden;
        ">
            
            <!-- Header -->
            <div style="
                background: #000000;
                padding: 25px;
                text-align: center;
                border-bottom: 1px solid #222;
            ">
                <h1 style="
                    margin: 0;
                    font-size: 32px;
                    color: #ffffff;
                ">
                    Expensio<span style="color:#facc15;">.</span>
                </h1>
            </div>

            <!-- Body -->
            <div style="padding: 40px 30px;">
                <h2 style="
                    margin-top: 0;
                    font-size: 28px;
                    color: #facc15;
                ">
                    Verify Your Email
                </h2>

                <p style="
                    font-size: 16px;
                    line-height: 1.8;
                    color: #d1d5db;
                ">
                    Welcome to Expensio 👋
                    <br /><br />
                    Please verify your email address to start tracking your daily expenses easily.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin: 40px 0;">
                    <a 
                        href="${verificationUrl}"
                        style="
                            display: inline-block;
                            background: #facc15;
                            color: #000000;
                            padding: 14px 32px;
                            font-size: 16px;
                            font-weight: bold;
                            text-decoration: none;
                            border-radius: 10px;
                        "
                    >
                        Verify Email
                    </a>
                </div>

                <p style="
                    font-size: 14px;
                    color: #9ca3af;
                    line-height: 1.6;
                ">
                    If you didn’t create an account, you can safely ignore this email.
                </p>
            </div>

            <!-- Footer -->
            <div style="
                border-top: 1px solid #222;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 13px;
            ">
                © 2026 Expensio. Daily Hisab, Made Simple.
            </div>
        </div>
    </div>
    `

    await sendEmail(to, "Verify Your Email - Expensio", html)
}


export const sendResetPassToEmail = async (to: string, token: string) => {
    const resetUrl = `https://expense-tracker-chi-dun-13.vercel.app/reset-password/${token}`

    const html = `
    <div style="
        font-family: Arial, sans-serif;
        background-color: #0b0b0b;
        padding: 40px 20px;
        color: #ffffff;
    ">
        <div style="
            max-width: 600px;
            margin: auto;
            background: #111111;
            border: 1px solid #222;
            border-radius: 16px;
            overflow: hidden;
        ">
            
            <!-- Header -->
            <div style="
                background: #000000;
                padding: 25px;
                text-align: center;
                border-bottom: 1px solid #222;
            ">
                <h1 style="
                    margin: 0;
                    font-size: 32px;
                    color: #ffffff;
                ">
                    Expensio<span style="color:#facc15;">.</span>
                </h1>
            </div>

            <!-- Body -->
            <div style="padding: 40px 30px;">
                <h2 style="
                    margin-top: 0;
                    font-size: 28px;
                    color: #facc15;
                ">
                    Reset Your Password
                </h2>

                <p style="
                    font-size: 16px;
                    line-height: 1.8;
                    color: #d1d5db;
                ">
                    We received a request to reset your password.
                    <br /><br />
                    Click the button below to create a new password and continue using Expensio securely.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin: 40px 0;">
                    <a 
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            background: #facc15;
                            color: #000000;
                            padding: 14px 32px;
                            font-size: 16px;
                            font-weight: bold;
                            text-decoration: none;
                            border-radius: 10px;
                        "
                    >
                        Reset Password
                    </a>
                </div>

                <p style="
                    font-size: 14px;
                    color: #9ca3af;
                    line-height: 1.6;
                ">
                    If you didn’t request a password reset, you can safely ignore this email.
                </p>
            </div>

            <!-- Footer -->
            <div style="
                border-top: 1px solid #222;
                padding: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 13px;
            ">
                © 2026 Expensio. Daily Hisab, Made Simple.
            </div>
        </div>
    </div>
    `

    await sendEmail(to, "Reset Your Password - Expensio", html)
}