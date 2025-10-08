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
    const { name, email, phone, business, message } = JSON.parse(event.body);

    if (!name || !email || !business) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // 1. Notification Email to You
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This can be a default Resend address
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

    // 2. Auto-Reply Email to the User
    await resend.emails.send({
        from: 'info@allyncai.com', // MUST be an email from your verified Resend domain
        to: email,
        subject: 'Mesajınız Alınmıştır | Allync AI',
        html: `
          <p>Merhaba ${name},</p>
          <p>Bizimle iletişime geçtiğiniz için teşekkür ederiz.</p>
          <p>Mesajınız ekibimize başarıyla ulaşmıştır. En kısa sürede size geri dönüş yapacağız.</p>
          <br>
          <p>Saygılarımızla,</p>
          <p><strong>Allync AI Ekibi</strong></p>
        `
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
