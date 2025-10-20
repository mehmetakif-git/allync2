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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header with background image -->
          <tr>
            <td style="background-image: url('https://www.allyncai.com/mail-header.png'); background-size: cover; background-position: center; padding: 30px 40px; min-height: 150px; text-align: center;">
              <img src="https://allyncai.com/logo-mail-white.png" alt="Allync AI" width="60" height="60" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">ALLYNC AI</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">✨ AI-Powered Business Automation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #1a1a1a; margin-top: 0; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Yeni İletişim Formu</h2>

              <table width="100%" cellpadding="12" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="background-color: #f5f5f7; padding: 12px 16px; border-radius: 8px; width: 120px; font-weight: 600; color: #4a4a4a;">İsim:</td>
                  <td style="padding: 12px 16px; color: #1a1a1a;">${name}</td>
                </tr>
                <tr>
                  <td style="background-color: #f5f5f7; padding: 12px 16px; border-radius: 8px; font-weight: 600; color: #4a4a4a;">E-posta:</td>
                  <td style="padding: 12px 16px;"><a href="mailto:${email}" style="color: #00d9ff; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="background-color: #f5f5f7; padding: 12px 16px; border-radius: 8px; font-weight: 600; color: #4a4a4a;">Telefon:</td>
                  <td style="padding: 12px 16px; color: #1a1a1a;">${phone || 'Belirtilmemiş'}</td>
                </tr>
                <tr>
                  <td style="background-color: #f5f5f7; padding: 12px 16px; border-radius: 8px; font-weight: 600; color: #4a4a4a;">İşletme:</td>
                  <td style="padding: 12px 16px; color: #1a1a1a;">${business}</td>
                </tr>
              </table>

              <div style="background: linear-gradient(135deg, #e8f9ff 0%, #f3e8ff 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #00d9ff;">
                <h3 style="color: #1a1a1a; margin-top: 0; margin-bottom: 12px; font-size: 18px; font-weight: 600;">Mesaj:</h3>
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'Mesaj yok'}</p>
              </div>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #fafafa; padding: 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 16px; color: #4a4a4a;">Saygılarımızla,</p>
              <p style="margin: 0 0 25px 0; font-size: 20px; font-weight: bold; color: #1a1a1a;">Allync AI Ekibi</p>

              <div style="margin: 25px 0; padding: 25px; background-color: #ffffff; border: 2px solid #00d9ff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 217, 255, 0.15);">
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com.tr" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com.tr</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🇹🇷 <a href="tel:+905334940416" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+90 533 494 04 16</a>
                </p>
                <p style="margin: 0; color: #4a4a4a; font-size: 14px;">
                  🇶🇦 <a href="tel:+97451079565" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+974 5107 9565</a>
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header with background image -->
          <tr>
            <td style="background-image: url('https://www.allyncai.com/mail-header.png'); background-size: cover; background-position: center; padding: 30px 40px; min-height: 150px; text-align: center;">
              <img src="https://allyncai.com/logo-mail-white.png" alt="Allync AI" width="60" height="60" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">ALLYNC AI</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">✨ AI-Powered Business Automation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #1a1a1a; margin-top: 0; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Merhaba ${name},</h2>

              <p style="color: #4a4a4a; line-height: 1.8; font-size: 16px;">
                Bizimle iletişime geçtiğiniz için <strong>teşekkür ederiz</strong>.
              </p>

              <div style="background: linear-gradient(135deg, #e8f9ff 0%, #f3e8ff 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #00d9ff; margin: 25px 0;">
                <p style="color: #1a1a1a; margin: 0; line-height: 1.6; font-size: 15px;">
                  ✅ Mesajınız ekibimize başarıyla ulaşmıştır.<br>
                  ⏱️ En kısa sürede size geri dönüş yapacağız.
                </p>
              </div>

              <p style="color: #4a4a4a; line-height: 1.8; font-size: 16px;">
                İşletmeniz için AI çözümlerimiz hakkında daha fazla bilgi almak isterseniz,
                web sitemizi ziyaret edebilir veya doğrudan bize ulaşabilirsiniz.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://allyncai.com" style="display: inline-block; background: linear-gradient(135deg, #00d9ff 0%, #00b8e6 100%); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 217, 255, 0.3);">🚀 Web Sitemizi Ziyaret Edin</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #fafafa; padding: 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 16px; color: #4a4a4a;">Saygılarımızla,</p>
              <p style="margin: 0 0 25px 0; font-size: 20px; font-weight: bold; color: #1a1a1a;">Allync AI Ekibi</p>

              <div style="margin: 25px 0; padding: 25px; background-color: #ffffff; border: 2px solid #00d9ff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 217, 255, 0.15);">
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com.tr" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com.tr</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🇹🇷 <a href="tel:+905334940416" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+90 533 494 04 16</a>
                </p>
                <p style="margin: 0; color: #4a4a4a; font-size: 14px;">
                  🇶🇦 <a href="tel:+97451079565" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+974 5107 9565</a>
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header with background image -->
          <tr>
            <td style="background-image: url('https://www.allyncai.com/mail-header.png'); background-size: cover; background-position: center; padding: 30px 40px; min-height: 150px; text-align: center;">
              <img src="https://allyncai.com/logo-mail-white.png" alt="Allync AI" width="60" height="60" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">ALLYNC AI</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">✨ AI-Powered Business Automation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #1a1a1a; margin-top: 0; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Hello ${name},</h2>

              <p style="color: #4a4a4a; line-height: 1.8; font-size: 16px;">
                <strong>Thank you</strong> for contacting us.
              </p>

              <div style="background: linear-gradient(135deg, #e8f9ff 0%, #f3e8ff 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #00d9ff; margin: 25px 0;">
                <p style="color: #1a1a1a; margin: 0; line-height: 1.6; font-size: 15px;">
                  ✅ Your message has been successfully received by our team.<br>
                  ⏱️ We will get back to you as soon as possible.
                </p>
              </div>

              <p style="color: #4a4a4a; line-height: 1.8; font-size: 16px;">
                If you'd like to learn more about our AI solutions for your business,
                feel free to visit our website or reach out to us directly.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://allyncai.com" style="display: inline-block; background: linear-gradient(135deg, #00d9ff 0%, #00b8e6 100%); color: #ffffff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 217, 255, 0.3);">🚀 Visit Our Website</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #fafafa; padding: 40px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; font-size: 16px; color: #4a4a4a;">Best regards,</p>
              <p style="margin: 0 0 25px 0; font-size: 20px; font-weight: bold; color: #1a1a1a;">The Allync AI Team</p>

              <div style="margin: 25px 0; padding: 25px; background-color: #ffffff; border: 2px solid #00d9ff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 217, 255, 0.15);">
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🌐 <a href="https://www.allyncai.com.tr" style="color: #00d9ff; text-decoration: none; font-weight: 500;">www.allyncai.com.tr</a>
                </p>
                <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 14px;">
                  🇹🇷 <a href="tel:+905334940416" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+90 533 494 04 16</a>
                </p>
                <p style="margin: 0; color: #4a4a4a; font-size: 14px;">
                  🇶🇦 <a href="tel:+97451079565" style="color: #00d9ff; text-decoration: none; font-weight: 500;">+974 5107 9565</a>
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
