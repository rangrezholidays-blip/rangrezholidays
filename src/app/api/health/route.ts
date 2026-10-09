import { NextResponse } from 'next/server';
import { isSmtpConfigured } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PLACEHOLDER = 'your-email@gmail.com';

// Shows only the first letter and the domain, e.g. "r***@gmail.com"
function mask(email?: string) {
  if (!email) return null;
  const [name, domain] = email.split('@');
  return `${name.slice(0, 1)}***@${domain ?? '?'}`;
}

// Diagnostic health check. Shows WHICH settings the live server can see,
// but never reveals any secret value.
export function GET() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Independent check, written here instead of in mailer.ts
  const routeCheck = Boolean(user && pass && user.trim() !== PLACEHOLDER);

  return NextResponse.json(
    {
      status: 'ok',
      brand: 'Rangrez Holidays',
      smtpConfigured: isSmtpConfigured(),
      source: 'nextjs-app-router',
      vercelEnv: process.env.VERCEL_ENV ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      hasGmailUser: Boolean(user),
      hasGmailAppPassword: Boolean(pass),
      gmailUserMasked: mask(user),
      gmailUserIsPlaceholder: user?.trim() === PLACEHOLDER,
      gmailUserLength: user ? user.length : 0,
      appPasswordLength: pass ? pass.length : 0,
      // if routeCheck is true but smtpConfigured is false, mailer.ts differs from the original
      routeCheck,
      relatedVariableNames: Object.keys(process.env).filter((k) =>
        /gmail|notif|smtp|mail/i.test(k)
      ),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}