import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, business, message } = req.body;

    if (!name || !email || !business) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to you (notification)
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

    // Email to user (auto-reply)
    await resend.emails.send({
        from: 'Allync AI <noreply@send.allyncai.com>', // Your verified domain email
        to: email,
        reply_to: 'info@allyncai.com',
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

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
