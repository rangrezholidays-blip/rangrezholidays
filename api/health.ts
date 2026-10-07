import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isSmtpConfigured } from './_lib/mailer';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    brand: 'Rangrez Holidays',
    smtpConfigured: isSmtpConfigured(),
  });
}
