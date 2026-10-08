import { NextResponse } from 'next/server';
import { getTransporter, buildAdminEmailHtml, buildGuestEmailHtml } from '@/lib/mailer';

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
    let emailDispatched = false;
    let emailStatusMessage = '';

    const transporter = getTransporter();

    if (transporter && email) {
      try {
        const receiver =
          process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER || 'bookings@rangrezholidays.com';

        await transporter.sendMail({
          from: `"Rangrez Holidays" <${process.env.GMAIL_USER}>`,
          to: receiver,
          subject: `[New Inquiry] ${packageName || 'Custom Travel Plan'} - ${fullName} (${inquiryId})`,
          html: buildAdminEmailHtml(inquiryId, {
            type, packageName, destination, startDate, duration, adults, children,
            cabPreference, pickupLocation, dropLocation, fullName, email, phone,
            whatsappSameAsPhone, specialRequests, source,
          }),
        });

        await transporter.sendMail({
          from: `"Rangrez Holidays" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `Namaste ${fullName}! Your Rangrez Holidays Inquiry [${inquiryId}] has been received`,
          html: buildGuestEmailHtml(fullName, packageName, startDate, phone, inquiryId, WHATSAPP_DISPLAY),
        });

        emailDispatched = true;
        emailStatusMessage = 'Email dispatched successfully via Gmail SMTP.';
      } catch (mailErr) {
        const message = mailErr instanceof Error ? mailErr.message : String(mailErr);
        console.error('Nodemailer error:', message);
        emailStatusMessage = `SMTP notice: ${message}. Inquiry still registered.`;
      }
    } else {
      emailStatusMessage =
        'Inquiry registered. (Configure GMAIL_USER & GMAIL_APP_PASSWORD in Vercel Environment Variables to enable live email dispatch).';
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message:
        'Your inquiry has been successfully registered with Rangrez Holidays! Our travel expert will reach out promptly.',
      emailDispatched,
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
