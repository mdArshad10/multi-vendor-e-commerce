import { env } from "@/config/env";
import path from "node:path";
import { cwd } from "node:process";
import nodemailer from "nodemailer";
import ejs from "ejs";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: env.NODEMAILER_HOST,
    port: env.NODEMAILER_PORT,
    secure: env.NODEMAILER_PORT == 465 ? true : false, // Use true for port 465, false for port 587
    auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASSWORD,
    },
});

const renderEmailTemplate = async (templateName: string, data: Record<string, any>) => {
    const templatePath = path.join(
        cwd(),
        "services",
        "auth-service",
        "src",
        "utils",
        "email-template",
        `${templateName}.ejs`
    )
    return ejs.renderFile(templatePath, data);
}

export const sendEmail = async (to: string, subject: string, templateName: string, data: Record<string, any>) => {

    try {
        const html = await renderEmailTemplate(templateName, data);
        const info = await transporter.sendMail({
            from: env.NODEMAILER_USER,
            to,
            subject,
            html,
        });

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}