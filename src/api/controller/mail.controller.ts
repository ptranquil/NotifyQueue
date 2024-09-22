import nodemailer from "nodemailer";
import { getMailTemplate } from "../utils/mailTemplates";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT as unknown as number,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Create a function to send email
export const sendOrderStatusEmail = async (
    userName: string,
    orderId: string,
    orderStatus: string,
    userEmail: string
) => {
    
    const emailTemplate = getMailTemplate(orderStatus.toLowerCase(), userName, orderId);

    // Sending the email
    const mailOptions = {
        from: "your-email@example.com", // sender address
        to: userEmail, // list of receivers
        subject: `Order Status Update - Order #${orderId}`,
        html: emailTemplate, // html body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};