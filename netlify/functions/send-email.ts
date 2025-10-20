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
    console.log('📧 Attempting to send notification email...');
    console.log('FROM:', 'Allync AI <noreply@send.allyncai.com>');
    console.log('TO:', 'info@allyncai.com');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    const notificationResult = await resend.emails.send({
      from: 'Allync AI <noreply@send.allyncai.com>',
      to: 'info@allyncai.com',
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

    console.log('📬 Notification email result:', JSON.stringify(notificationResult, null, 2));
    console.log('✅ Notification email sent successfully!');

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

    console.log('📧 Attempting to send auto-reply email...');
    console.log('TO:', email);
    const autoReplyResult = await resend.emails.send({
      from: 'Allync AI <noreply@send.allyncai.com>',
      to: email,
      reply_to: 'info@allyncai.com',
      subject,
      html,
    });

    console.log('📬 Auto-reply email result:', JSON.stringify(autoReplyResult, null, 2));
    console.log('✅ Auto-reply email sent successfully!');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
