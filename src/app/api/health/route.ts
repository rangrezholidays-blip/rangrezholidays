import { NextResponse } from 'next/server';
import { isSmtpConfigured } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    brand: 'Rangrez Holidays',
    smtpConfigured: isSmtpConfigured(),
  });
}
