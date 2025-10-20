import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    if (!event.body) {
      throw new Error('No body provided');
    }
    const { name, email, phone, business, message, language } = JSON.parse(event.body);

    if (!name || !email || !business) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // 1. Notification Email to You
    await resend.emails.send({
      from: 'Allync AI <noreply@send.allyncai.com>', // This can be a default Resend address
      to: 'info@allyncai.com', // Your company's email address
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Business Type:</strong> ${business}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message'}</p>
      `,
    });

    // 2. Auto-Reply Email to the User (Now with i18n)
    const isTurkish = language === 'tr';

    const subject = isTurkish
      ? 'Mesajınız Alınmıştır | Allync AI'
      : 'Your Message Has Been Received | Allync AI';

    const html = isTurkish
      ? `
          <p>Merhaba ${name},</p>
          <p>Bizimle iletişime geçtiğiniz için teşekkür ederiz.</p>
          <p>Mesajınız ekibimize başarıyla ulaşmıştır. En kısa sürede size geri dönüş yapacağız.</p>
          <br>
          <p>Saygılarımızla,</p>
          <p><strong>Allync AI Ekibi</strong></p>
        `
      : `
          <p>Hello ${name},</p>
          <p>Thank you for contacting us.</p>
          <p>Your message has been successfully received by our team. We will get back to you as soon as possible.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>The Allync AI Team</strong></p>
        `;

    await resend.emails.send({
      from: 'info@allyncai.com',
      to: email,
      subject,
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
