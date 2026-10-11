import { NextResponse } from 'next/server';
import {
  getTransporter,
  buildAdminEmailHtml,
  buildGuestEmailHtml,
  buildGuestEmailText,
} from '@/lib/mailer';

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WHATSAPP_DISPLAY = '+91 97604 02549';

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) ?? {};

    // Normalize field names: MultiStepBookingModal sends startDate/adults/
    // children/cabPreference; ContactPage sends travelDate/guests/
    // vehiclePreference. Accept either so both forms work correctly.
    const type: string = body.type || 'custom_plan';
    const packageName: string | undefined = body.packageName;
    const destination: string | undefined = body.destination;
    const startDate: string | undefined = body.startDate || body.travelDate;
    const duration: string | undefined = body.duration;
    const adults: number = Number(body.adults ?? body.guests ?? 2) || 2;
    const children: number = Number(body.children ?? 0) || 0;
    const cabPreference: string | undefined = body.cabPreference || body.vehiclePreference;
    const pickupLocation: string | undefined = body.pickupLocation;
    const dropLocation: string | undefined = body.dropLocation;
    const fullName: string = body.fullName;
    const email: string = body.email || '';
    const phone: string = body.phone;
    const whatsappSameAsPhone: boolean = body.whatsappSameAsPhone ?? true;
    const specialRequests: string | undefined = body.specialRequests;
    const source: string | undefined = body.source;

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    const inquiryId = `RH-${Date.now().toString().slice(-6)}`;

    const transporter = getTransporter();
    const sender = `"Rangrez Holidays" <${process.env.GMAIL_USER}>`;
    const teamInbox =
      process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER || 'bookings@rangrezholidays.com';
    const customerEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let adminEmailSent = false;
    let guestEmailSent = false;
    const notes: string[] = [];

    if (!transporter) {
      notes.push(
        'Inquiry registered. (Configure GMAIL_USER & GMAIL_APP_PASSWORD in Vercel Environment Variables to enable live email dispatch).'
      );
    } else {
      // 1) Notification to the team. Always sent, even if the customer left no email.
      try {
        await transporter.sendMail({
          from: sender,
          to: teamInbox,
          replyTo: customerEmailOk ? email : undefined,
          subject: `[New Inquiry] ${packageName || 'Custom Travel Plan'} - ${fullName} (${inquiryId})`,
          html: buildAdminEmailHtml(inquiryId, {
            type, packageName, destination, startDate, duration, adults, children,
            cabPreference, pickupLocation, dropLocation, fullName, email, phone,
            whatsappSameAsPhone, specialRequests, source,
          }),
        });
        adminEmailSent = true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Team notification email failed:', message);
        notes.push(`Team notification failed: ${message}`);
      }

      // 2) Thank-you email to the customer (separate, so one failure cannot hide the other).
      if (customerEmailOk) {
        try {
          await transporter.sendMail({
            from: sender,
            to: email,
            replyTo: teamInbox,
            subject: `Thank you ${fullName}! Your Rangrez Holidays inquiry [${inquiryId}] has been received`,
            html: buildGuestEmailHtml(fullName, packageName, startDate, phone, inquiryId, WHATSAPP_DISPLAY),
            text: buildGuestEmailText(fullName, packageName, startDate, phone, inquiryId, WHATSAPP_DISPLAY),
          });
          guestEmailSent = true;
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          console.error('Customer thank-you email failed:', message);
          notes.push(`Customer confirmation failed: ${message}`);
        }
      } else {
        notes.push('No valid customer email provided, so no confirmation email was sent.');
      }
    }

    const emailDispatched = adminEmailSent || guestEmailSent;
    const emailStatusMessage = notes.length
      ? notes.join(' ')
      : 'Emails dispatched successfully via Gmail SMTP.';

    return NextResponse.json({
      success: true,
      inquiryId,
      message:
        'Your inquiry has been successfully registered with Rangrez Holidays! Our travel expert will reach out promptly.',
      emailDispatched,
      adminEmailSent,
      guestEmailSent,
      emailStatusMessage,
      inquiry: {
        id: inquiryId,
        fullName,
        phone,
        startDate,
        packageName: packageName || 'Custom Tour',
      },
    });
  } catch (err) {
    console.error('Inquiry error:', err);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or reach out on WhatsApp.' },
      { status: 500 }
    );
  }
}
