import { NextResponse } from 'next/server';
import { isSmtpConfigured } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Diagnostic health check. Shows WHICH settings the live server can see,
// but never reveals any secret value.
export function GET() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  return NextResponse.json(
    {
      status: 'ok',
      brand: 'Rangrez Holidays',
      smtpConfigured: isSmtpConfigured(),
      // which code is running
      source: 'nextjs-app-router',
      vercelEnv: process.env.VERCEL_ENV ?? null, // should be "production" on the live site
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      // what the server can see
      hasGmailUser: Boolean(user),
      hasGmailAppPassword: Boolean(pass),
      gmailUserLooksLikeEmail: Boolean(user && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)),
      appPasswordLength: pass ? pass.length : 0, // a Google app password is 16 characters
      // exact names of related variables (shows typos, extra spaces, wrong case)
      relatedVariableNames: Object.keys(process.env).filter((k) =>
        /gmail|notif|smtp|mail/i.test(k)
      ),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}