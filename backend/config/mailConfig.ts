import nodemailer from "nodemailer";
import dns from "dns";
import EnvVars from "./EnvVars";

// ✅ IMPORTANT: Force IPv4 (fixes Render + IPv6 SMTP issue)
dns.setDefaultResultOrder("ipv4first");

// ===============================
// 📧 TRANSPORTER CONFIG
// ===============================
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // 🔥 MUST be true for 465
    auth: {
        user: EnvVars.NODEMAILER_USER,
        pass: EnvVars.NODEMAILER_PASS, // 🔑 Gmail App Password
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
});

// ===============================
// 🧪 SMTP TEST
// ===============================
transporter.verify((error) => {
    if (error) {
        console.error("❌ SMTP ERROR:", error);
    } else {
        console.log("✅ Nodemailer Ready (SMTP Connected)");
    }
});

// ===============================
// 📩 GENERIC EMAIL SENDER
// ===============================
const sendEmail = async (to: string, subject: string, html: string) => {
    console.log("📤 Sending email to:", to);

    try {
        const info = await transporter.sendMail({
            from: `Expensio <${EnvVars.NODEMAILER_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Email send failed:", error);
        throw error;
    }
};

// ===============================
// 📧 VERIFY EMAIL
// ===============================
export const sendVerificationToEmail = async (to: string, token: string) => {
    const verificationUrl = `https://expense-tracker-chi-dun-13.vercel.app/verify-email/${token}`;

    const html = `
    <div style="font-family:Arial;background:#0b0b0b;padding:40px;color:#fff">
        <div style="max-width:600px;margin:auto;background:#111;border-radius:16px;overflow:hidden">

            <div style="padding:25px;text-align:center;background:#000">
                <h1>Expensio<span style="color:#facc15">.</span></h1>
            </div>

            <div style="padding:40px">
                <h2 style="color:#facc15">Verify Your Email</h2>

                <p style="color:#d1d5db;line-height:1.6">
                    Welcome 👋<br/><br/>
                    Please verify your email to continue.
                </p>

                <div style="text-align:center;margin:30px 0">
                    <a href="${verificationUrl}"
                        style="background:#facc15;color:#000;padding:14px 28px;
                        text-decoration:none;font-weight:bold;border-radius:10px">
                        Verify Email
                    </a>
                </div>

                <p style="color:#9ca3af;font-size:13px">
                    If this wasn’t you, ignore this email.
                </p>
            </div>

            <div style="text-align:center;padding:15px;font-size:12px;color:#666">
                © 2026 Expensio
            </div>

        </div>
    </div>
    `;

    await sendEmail(to, "Verify Your Email - Expensio", html);
};

// ===============================
// 🔐 RESET PASSWORD EMAIL
// ===============================
export const sendResetPassToEmail = async (to: string, token: string) => {
    const resetUrl = `https://expense-tracker-chi-dun-13.vercel.app/reset-password/${token}`;

    const html = `
    <div style="font-family:Arial;background:#0b0b0b;padding:40px;color:#fff">
        <div style="max-width:600px;margin:auto;background:#111;border-radius:16px;overflow:hidden">

            <div style="padding:25px;text-align:center;background:#000">
                <h1>Expensio<span style="color:#facc15">.</span></h1>
            </div>

            <div style="padding:40px">
                <h2 style="color:#facc15">Reset Password</h2>

                <p style="color:#d1d5db;line-height:1.6">
                    We received a request to reset your password.<br/><br/>
                    Click below to continue.
                </p>

                <div style="text-align:center;margin:30px 0">
                    <a href="${resetUrl}"
                        style="background:#facc15;color:#000;padding:14px 28px;
                        text-decoration:none;font-weight:bold;border-radius:10px">
                        Reset Password
                    </a>
                </div>

                <p style="color:#9ca3af;font-size:13px">
                    If you didn’t request this, ignore this email.
                </p>
            </div>

            <div style="text-align:center;padding:15px;font-size:12px;color:#666">
                © 2026 Expensio
            </div>

        </div>
    </div>
    `;

    await sendEmail(to, "Reset Your Password - Expensio", html);
};