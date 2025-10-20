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
<body style="margin: 0; padding: 0; font-family: 'Impact', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 217, 255, 0.1); border: 1px solid #2b2c2c;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00d9ff 0%, #b537f2 100%); padding: 40px 30px; text-align: center;">
              <img src="https://allyncai.com/logo-mail.svg" width="50" height="50" alt="Allync AI" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: bold; letter-spacing: 2px;">ALLYNC AI</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; letter-spacing: 1px;">📩 NEW CONTACT FORM SUBMISSION</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #00d9ff; margin-top: 0; font-size: 20px; font-weight: bold; letter-spacing: 2px;">CONTACT DETAILS</h2>

              <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #2b2c2c; padding: 12px; border-radius: 4px; width: 120px; font-weight: bold; color: #00d9ff; letter-spacing: 1px;">NAME:</td>
                  <td style="padding: 12px; color: #e0e0e0;">${name}</td>
                </tr>
                <tr>
                  <td style="background-color: #2b2c2c; padding: 12px; border-radius: 4px; font-weight: bold; color: #00d9ff; letter-spacing: 1px;">EMAIL:</td>
                  <td style="padding: 12px;"><a href="mailto:${email}" style="color: #00d9ff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="background-color: #2b2c2c; padding: 12px; border-radius: 4px; font-weight: bold; color: #00d9ff; letter-spacing: 1px;">PHONE:</td>
                  <td style="padding: 12px; color: #e0e0e0;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="background-color: #2b2c2c; padding: 12px; border-radius: 4px; font-weight: bold; color: #00d9ff; letter-spacing: 1px;">BUSINESS:</td>
                  <td style="padding: 12px; color: #e0e0e0;">${business}</td>
                </tr>
              </table>

              <div style="background-color: #2b2c2c; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35;">
                <h3 style="color: #ff6b35; margin-top: 0; margin-bottom: 10px; font-weight: bold; letter-spacing: 2px;">MESSAGE:</h3>
                <p style="color: #e0e0e0; line-height: 1.6; margin: 0; white-space: pre-wrap; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${message || 'No message'}</p>
              </div>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #2b2c2c;">
              <p style="margin: 0 0 10px 0; font-size: 20px; font-weight: bold; color: #00d9ff; letter-spacing: 2px;">ALLYNC AI</p>
              <p style="margin: 0 0 15px 0; color: #888888; font-size: 14px; letter-spacing: 1px;">AI-POWERED BUSINESS AUTOMATION</p>
              <p style="margin: 0 0 10px 0; color: #888888; font-size: 13px;">
                📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none;">info@allyncai.com</a> | 🌍 <a href="https://allyncai.com" style="color: #00d9ff; text-decoration: none;">allyncai.com</a>
              </p>
              <p style="margin: 15px 0 0 0; color: #555555; font-size: 12px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
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
<body style="margin: 0; padding: 0; font-family: 'Impact', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 217, 255, 0.1); border: 1px solid #2b2c2c;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00d9ff 0%, #b537f2 100%); padding: 50px 40px; text-align: center;">
              <img src="https://allyncai.com/logo-mail.svg" width="50" height="50" alt="Allync AI" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">ALLYNC AI</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; letter-spacing: 1px;">İŞLETME OTOMASYONU ÇÖZÜMLERİ</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #00d9ff; margin-top: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 24px;">Merhaba ${name},</h2>

              <p style="color: #e0e0e0; line-height: 1.8; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                Bizimle iletişime geçtiğiniz için <strong style="color: #00d9ff;">teşekkür ederiz</strong>.
              </p>

              <div style="background-color: #2b2c2c; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35; margin: 25px 0;">
                <p style="color: #e0e0e0; margin: 0; line-height: 1.6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ✅ Mesajınız ekibimize başarıyla ulaşmıştır.<br>
                  ⏱️ En kısa sürede size geri dönüş yapacağız.
                </p>
              </div>

              <p style="color: #e0e0e0; line-height: 1.8; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                İşletmeniz için AI çözümlerimiz hakkında daha fazla bilgi almak isterseniz,
                web sitemizi ziyaret edebilir veya doğrudan bize ulaşabilirsiniz.
              </p>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #2b2c2c;">
              <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #888888; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Saygılarımızla,</p>
              <p style="margin: 0 0 20px 0; font-size: 22px; font-weight: bold; color: #00d9ff; letter-spacing: 2px;">ALLYNC AI EKİBİ</p>

              <div style="margin: 20px 0; padding: 20px; background-color: #2b2c2c; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  🌍 <a href="https://allyncai.com" style="color: #00d9ff; text-decoration: none;">www.allyncai.com</a>
                </p>
              </div>

              <p style="margin: 20px 0 0 0; color: #555555; font-size: 12px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
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
<body style="margin: 0; padding: 0; font-family: 'Impact', 'Arial Black', 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 217, 255, 0.1); border: 1px solid #2b2c2c;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #00d9ff 0%, #b537f2 100%); padding: 50px 40px; text-align: center;">
              <img src="https://allyncai.com/logo-mail.svg" width="50" height="50" alt="Allync AI" style="display: block; margin: 0 auto 15px auto;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 2px;">ALLYNC AI</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; letter-spacing: 1px;">BUSINESS AUTOMATION SOLUTIONS</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #00d9ff; margin-top: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 24px;">Hello ${name},</h2>

              <p style="color: #e0e0e0; line-height: 1.8; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <strong style="color: #00d9ff;">Thank you</strong> for contacting us.
              </p>

              <div style="background-color: #2b2c2c; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35; margin: 25px 0;">
                <p style="color: #e0e0e0; margin: 0; line-height: 1.6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  ✅ Your message has been successfully received by our team.<br>
                  ⏱️ We will get back to you as soon as possible.
                </p>
              </div>

              <p style="color: #e0e0e0; line-height: 1.8; font-size: 16px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                If you'd like to learn more about our AI solutions for your business,
                feel free to visit our website or reach out to us directly.
              </p>
            </td>
          </tr>

          <!-- Footer / Signature -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #2b2c2c;">
              <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #888888; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Best regards,</p>
              <p style="margin: 0 0 20px 0; font-size: 22px; font-weight: bold; color: #00d9ff; letter-spacing: 2px;">THE ALLYNC AI TEAM</p>

              <div style="margin: 20px 0; padding: 20px; background-color: #2b2c2c; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  📧 <a href="mailto:info@allyncai.com" style="color: #00d9ff; text-decoration: none;">info@allyncai.com</a>
                </p>
                <p style="margin: 0 0 8px 0; color: #888888; font-size: 14px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  🌍 <a href="https://allyncai.com" style="color: #00d9ff; text-decoration: none;">www.allyncai.com</a>
                </p>
              </div>

              <p style="margin: 20px 0 0 0; color: #555555; font-size: 12px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
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
