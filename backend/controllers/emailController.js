const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send Contact Form Message
exports.sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Main email to portfolio owner
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2 style="color: #6366f1;">New Contact Message</h2>

                    <p><strong>Name:</strong> ${name}</p>

                    <p>
                        <strong>Email:</strong>
                        <a href="mailto:${email}">
                            ${email}
                        </a>
                    </p>

                    <p><strong>Subject:</strong> ${subject}</p>

                    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">

                    <p><strong>Message:</strong></p>

                    <p style="white-space: pre-wrap; line-height: 1.6;">
                        ${message}
                    </p>

                    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">

                    <p style="color:#94a3b8;font-size:12px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `
        };

        // Send email to owner
        await transporter.sendMail(mailOptions);

        // Auto-reply email
        const confirmationEmail = {
            from: `"Gyananjay Sahoo" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Thank you for contacting me',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2 style="color: #6366f1;">Thank You!</h2>

                    <p>Hi ${name},</p>

                    <p>
                        Thank you for reaching out. I have received your message
                        and will get back to you as soon as possible.
                    </p>

                    <p><strong>Your Message:</strong></p>

                    <div style="
                        background-color:#f8fafc;
                        padding:15px;
                        border-radius:8px;
                        white-space:pre-wrap;
                    ">
                        ${message}
                    </div>

                    <br>

                    <p>
                        Best regards,<br>
                        Gyananjay Sahoo
                    </p>
                </div>
            `
        };

        // Send confirmation email
        await transporter.sendMail(confirmationEmail);

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.'
        });

    } catch (error) {
        console.error('Email Sending Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Error sending message. Please try again later.',
            error:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : undefined
        });
    }
};