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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📩 New Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333333; margin-top: 0;">Contact Details</h2>

              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; width: 120px; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 12px; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 12px;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 12px; color: #333;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="background-color: #f8f9fa; padding: 12px; border-radius: 4px; font-weight: bold; color: #555;">Business:</td>
                  <td style="padding: 12px; color: #333;">${business}</td>
                </tr>
              </table>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <h3 style="color: #333333; margin-top: 0; margin-bottom: 10px;">Message:</h3>
                <p style="color: #555555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'No message'}</p>
              </div>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #333;">Allync AI</p>
              <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">AI-Powered Business Automation</p>
              <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">
                📧 info@allyncai.com | 🌍 <a href="https://allyncai.com" style="color: #667eea; text-decoration: none;">allyncai.com</a>
              </p>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">
                This email was sent from your website contact form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    });

    console.log('📬 Notification email result:', JSON.stringify(notificationResult, null, 2));
    console.log('✅ Notification email sent successfully!');

    // 2. Auto-Reply Email to the User (Now with i18n)
    const isTurkish = language === 'tr';

    const subject = isTurkish
      ? 'Mesajınız Alınmıştır | Allync AI'
      : 'Your Message Has Been Received | Allync AI';

    const htmlTemplate = isTurkish ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✨ Allync AI</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">İşletme Otomasyonu Çözümleri</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin-top: 0;">Merhaba ${name},</h2>

              <p style="color: #555555; line-height: 1.8; font-size: 16px;">
                Bizimle iletişime geçtiğiniz için <strong>teşekkür ederiz</strong>.
              </p>

              <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
                <p style="color: #333; margin: 0; line-height: 1.6;">
                  ✅ Mesajınız ekibimize başarıyla ulaşmıştır.<br>
                  ⏱️ En kısa sürede size geri dönüş yapacağız.
                </p>
              </div>

              <p style="color: #555555; line-height: 1.8; font-size: 16px;">
                İşletmeniz için AI çözümlerimiz hakkında daha fazla bilgi almak isterseniz,
                web sitemizi ziyaret edebilir veya doğrudan bize ulaşabilirsiniz.
              </p>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; color: #333;">Saygılarımızla,</p>
              <p style="margin: 0 0 20px 0; font-size: 20px; font-weight: bold; color: #667eea;">Allync AI Ekibi</p>

              <div style="margin: 20px 0; padding: 20px; background-color: #ffffff; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #667eea; text-decoration: none;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                  🌍 <a href="https://allyncai.com" style="color: #667eea; text-decoration: none;">www.allyncai.com</a>
                </p>
              </div>

              <p style="margin: 20px 0 0 0; color: #999; font-size: 12px;">
                © 2025 Allync AI. Tüm hakları saklıdır.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
` : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✨ Allync AI</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9;">Business Automation Solutions</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin-top: 0;">Hello ${name},</h2>

              <p style="color: #555555; line-height: 1.8; font-size: 16px;">
                <strong>Thank you</strong> for contacting us.
              </p>

              <div style="background-color: #f0f4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 25px 0;">
                <p style="color: #333; margin: 0; line-height: 1.6;">
                  ✅ Your message has been successfully received by our team.<br>
                  ⏱️ We will get back to you as soon as possible.
                </p>
              </div>

              <p style="color: #555555; line-height: 1.8; font-size: 16px;">
                If you'd like to learn more about our AI solutions for your business,
                feel free to visit our website or reach out to us directly.
              </p>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; color: #333;">Best regards,</p>
              <p style="margin: 0 0 20px 0; font-size: 20px; font-weight: bold; color: #667eea;">The Allync AI Team</p>

              <div style="margin: 20px 0; padding: 20px; background-color: #ffffff; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #667eea; text-decoration: none;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                  🌍 <a href="https://allyncai.com" style="color: #667eea; text-decoration: none;">www.allyncai.com</a>
                </p>
              </div>

              <p style="margin: 20px 0 0 0; color: #999; font-size: 12px;">
                © 2025 Allync AI. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    console.log('📧 Attempting to send auto-reply email...');
    console.log('TO:', email);
    const autoReplyResult = await resend.emails.send({
      from: 'Allync AI <noreply@send.allyncai.com>',
      to: email,
      reply_to: 'info@allyncai.com',
      subject,
      html: htmlTemplate,
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
