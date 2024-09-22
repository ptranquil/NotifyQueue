function orderCreatedMailTemplate(userName: string, orderId: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #4CAF50; padding: 10px; text-align: center; color: white; font-size: 24px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; color: #333333; }
            .footer { padding: 10px; text-align: center; color: #777777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                Order Confirmation - Order #${orderId}
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>Your order #${orderId} is now Placed Succesfully. We are processing your order and will notify you of further updates.</p>
                <p>Thank you for choosing us!</p>
            </div>
            <div class="footer">
                Best regards,<br/>
                NotifyQueue Team
            </div>
        </div>
    </body>
    </html>
    `;
}

function orderOutForDeliveryMailTemplate(userName: string, orderId: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #FFA500; padding: 10px; text-align: center; color: white; font-size: 24px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; color: #333333; }
            .footer { padding: 10px; text-align: center; color: #777777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                🚚 Your Order is Out for Delivery! - Order #${orderId}
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>Exciting news! Your order #${orderId} is on its way and is <strong>Out for Delivery</strong>. It will arrive soon!</p>
                <p>Stay prepared, and we hope you enjoy your purchase.</p>
                <p>Thank you for choosing us!</p>
            </div>
            <div class="footer">
                Best regards,<br/>
                NotifyQueue Team
            </div>
        </div>
    </body>
    </html>
    `;
}

function orderPickedUpEmailTemplate(userName: string, orderId: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #1E90FF; padding: 10px; text-align: center; color: white; font-size: 24px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; color: #333333; }
            .footer { padding: 10px; text-align: center; color: #777777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                📦 Your Order Has Been Picked Up! - Order #${orderId}
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>Good news! Your order #${orderId} has been <strong>picked up</strong> and is now in transit.</p>
                <p>We’ll keep you updated on the progress, and you can expect it soon!</p>
                <p>Thank you for choosing us!</p>
            </div>
            <div class="footer">
                Best regards,<br/>
                NotifyQueue Team
            </div>
        </div>
    </body>
    </html>
    `;
}

function orderDeliveredEmailTemplate(userName: string, orderId: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #28a745; padding: 10px; text-align: center; color: white; font-size: 24px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; color: #333333; }
            .footer { padding: 10px; text-align: center; color: #777777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                🎉 Order Delivered - Order #${orderId}
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>Your order #${orderId} has been <strong>delivered</strong>! We hope you enjoy your purchase.</p>
                <p>If you have any questions or feedback, feel free to reach out to us.</p>
                <p>Thank you for shopping with us!</p>
            </div>
            <div class="footer">
                Best regards,<br/>
                NotifyQueue Team
            </div>
        </div>
    </body>
    </html>
    `;
}

function orderCancelledEmailTemplate(userName: string, orderId: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { background-color: #dc3545; padding: 10px; text-align: center; color: white; font-size: 24px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; color: #333333; }
            .footer { padding: 10px; text-align: center; color: #777777; font-size: 12px; }
            .icon { text-align: center; margin: 20px 0; }
            .icon img { width: 60px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ❌ Order Cancelled - Order #${orderId}
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>We're sorry to inform you that your order #${orderId} has been <strong>cancelled</strong>.</p>
                <p>If you have any questions or believe this to be a mistake, please contact our support team.</p>
                <p>We apologize for any inconvenience caused.</p>
            </div>
            <div class="footer">
                Best regards,<br/>
                NotifyQueue Team
            </div>
        </div>
    </body>
    </html>
    `;
}

export function getMailTemplate(
    status: string,
    userName: string,
    orderId: string
) {
    switch (status) {
        case "created":
            return orderCreatedMailTemplate(userName, orderId);
        case "order-pickup":
            return orderPickedUpEmailTemplate(userName, orderId);
        case "out-for-delivery":
            return orderOutForDeliveryMailTemplate(userName, orderId);
        case "delivered":
            return orderDeliveredEmailTemplate(userName, orderId);
        case "cancelled":
            return orderCancelledEmailTemplate(userName, orderId);
        default:
            throw Error("Invalid Order Status");
    }
}
