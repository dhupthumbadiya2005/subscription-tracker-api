import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import { EMAIL_USER } from "../config/env.js"; // Added .js extension
import  transporter  from "../config/nodemailer.js";

export const sendReminderEmail = async ({to, type, subscription}) =>{
    if(!to || !type || !subscription) {
        throw new Error('Missing required parameters: to, type, subscription');
    }

    const templete = emailTemplates.find(t => t.label === type);

    if (!templete) {
        throw new Error(`Email template for type "${type}" not found`);
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency}${subscription.price}(${subscription.frequency}) `,
        paymentMethod : subscription.paymentMethod,
    }

    const message = templete.generateBody(mailInfo);
    const subject = templete.generateSubject(mailInfo);

    const mailOptions = {
        from: EMAIL_USER,
        to,
        subject,
        html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {    
        if (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        } else {
            console.log('Email sent successfully:', info.response);
        }
    }
    );
}