import nodemailer from 'nodemailer';

// Escape user-supplied text before placing it in an HTML email.
function esc(value?: string | number | null): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Reads GMAIL_USER / GMAIL_APP_PASSWORD from Vercel's Environment Variables
// (Project -> Settings -> Environment Variables). Never hardcode these.
export function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (user && pass && user !== 'your-email@gmail.com') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }
  return null;
}

export function isSmtpConfigured(): boolean {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  return Boolean(user && pass && user !== 'your-email@gmail.com');
}

export function buildAdminEmailHtml(inquiryId: string, fields: {
  type: string;
  packageName?: string;
  destination?: string;
  startDate?: string;
  duration?: string;
  adults: number;
  children: number;
  cabPreference?: string;
  pickupLocation?: string;
  dropLocation?: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappSameAsPhone: boolean;
  specialRequests?: string;
  source?: string;
}) {
  const {
    type, packageName, destination, startDate, duration, adults, children,
    cabPreference, pickupLocation, dropLocation, fullName, email, phone,
    whatsappSameAsPhone, specialRequests, source,
  } = fields;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0d0db; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #4A0E35 0%, #580B3A 50%, #F05A28 100%); padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 700;">RANGREZ HOLIDAYS</h1>
        <p style="margin: 4px 0 0; font-size: 13px; letter-spacing: 3px; color: #FFA000; text-transform: uppercase;">Royal India Tours & Luxury Taxi Rental</p>
      </div>
      <div style="padding: 24px 28px; color: #2D1A25;">
        <div style="background-color: #FDF6EE; border-left: 4px solid #F05A28; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px;">
          <p style="margin: 0; font-weight: 600; color: #4A0E35; font-size: 15px;">New Inquiry [ID: ${inquiryId}]</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #735467;">Type: ${esc(type)}${source ? ` • Source: ${esc(source)}` : ''}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          ${packageName ? `<tr><td style="padding: 8px 0; color: #735467; width: 40%;">Tour Package:</td><td style="padding: 8px 0; font-weight: 600; color: #4A0E35;">${esc(packageName)}</td></tr>` : ''}
          ${destination ? `<tr><td style="padding: 8px 0; color: #735467;">Destination/Route:</td><td style="padding: 8px 0; font-weight: 600;">${esc(destination)}</td></tr>` : ''}
          ${startDate ? `<tr><td style="padding: 8px 0; color: #735467;">Travel Date:</td><td style="padding: 8px 0; font-weight: 600;">${esc(startDate)}</td></tr>` : ''}
          ${duration ? `<tr><td style="padding: 8px 0; color: #735467;">Duration:</td><td style="padding: 8px 0;">${esc(duration)}</td></tr>` : ''}
          ${cabPreference ? `<tr><td style="padding: 8px 0; color: #735467;">Vehicle / Cab Preference:</td><td style="padding: 8px 0; font-weight: 600; color: #F05A28;">${esc(cabPreference)}</td></tr>` : ''}
          ${pickupLocation ? `<tr><td style="padding: 8px 0; color: #735467;">Pickup Point:</td><td style="padding: 8px 0;">${esc(pickupLocation)}</td></tr>` : ''}
          ${dropLocation ? `<tr><td style="padding: 8px 0; color: #735467;">Drop-off Point:</td><td style="padding: 8px 0;">${esc(dropLocation)}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #735467;">Travelers:</td><td style="padding: 8px 0;">${adults} Adults, ${children} Children</td></tr>
        </table>
        <h3 style="font-size: 15px; color: #4A0E35; border-bottom: 1px solid #EADBDF; padding-bottom: 6px; margin: 20px 0 10px;">Guest Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #735467; width: 40%;">Name:</td><td style="padding: 6px 0; font-weight: 600;">${esc(fullName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #735467;">Phone:</td><td style="padding: 6px 0; font-weight: 600; color: #4A0E35;">${esc(phone)} ${whatsappSameAsPhone ? '(WhatsApp Available)' : ''}</td></tr>
          <tr><td style="padding: 6px 0; color: #735467;">Email:</td><td style="padding: 6px 0;">${esc(email)}</td></tr>
          ${specialRequests ? `<tr><td style="padding: 6px 0; color: #735467;">Special Requests:</td><td style="padding: 6px 0; font-style: italic;">${esc(specialRequests)}</td></tr>` : ''}
        </table>
      </div>
      <div style="background-color: #FAF4F8; padding: 14px 24px; text-align: center; font-size: 12px; color: #735467;">
        Rangrez Holidays • Golden Triangle • Rajasthan • Char Dham • Luxury Chauffeur Rental
      </div>
    </div>
  `;
}

export function buildGuestEmailHtml(fullName: string, packageName: string | undefined, startDate: string | undefined, phone: string, inquiryId: string, whatsappNumber: string) {
  return `
    <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; color: #333; line-height: 1.6;">
      <h2 style="color: #4A0E35;">Namaste ${esc(fullName)},</h2>
      <p>Thank you for choosing <strong>Rangrez Holidays</strong> for your journey! We have received your inquiry for <strong>${esc(packageName) || 'your customized tour / taxi rental'}</strong>.</p>
      <p>Our dedicated travel concierge is reviewing your preferred dates (${esc(startDate) || 'Flexible'}) and will contact you via WhatsApp/Phone at <strong>${esc(phone)}</strong> with a personalized itinerary and availability options within 30 minutes.</p>
      <p>If you need instant priority assistance, feel free to chat with us directly on WhatsApp at <strong>${whatsappNumber}</strong>.</p>
      <br/>
      <p style="color: #735467; font-size: 13px;">Warm regards,<br/><strong>Team Rangrez Holidays</strong></p>
    </div>
  `;
}
