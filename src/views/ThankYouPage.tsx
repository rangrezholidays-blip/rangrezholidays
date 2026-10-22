'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageSquare, Phone, Mail, ArrowRight, Clock, Compass } from 'lucide-react';

const WHATSAPP_NUMBER = '918527221039';

export const ThankYouPage: React.FC = () => {
  const searchParams = useSearchParams();
  // Only allow a simple reference like RH-123456 to be displayed.
  const rawRef = searchParams.get('ref') ?? '';
  const reference = /^[A-Za-z0-9-]{3,20}$/.test(rawRef) ? rawRef : '';
  const emailSent = searchParams.get('mail') === '1';

  // Report the inquiry as a conversion to Google Analytics, once per visit.
  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', { inquiry_id: reference || undefined });
    }
  }, [reference]);

  const whatsappText = encodeURIComponent(
    reference
      ? `Namaste Rangrez Holidays! I just submitted an inquiry. My reference number is ${reference}.`
      : 'Namaste Rangrez Holidays! I just submitted an inquiry on your website.'
  );

  const steps = [
    {
      icon: <Compass className="w-5 h-5" />,
      title: 'We review your request',
      text: 'Our travel expert checks your dates, group size and preferences.',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'We contact you within 30 minutes',
      text: 'Expect a call or WhatsApp message with a personalised itinerary and availability.',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: 'You confirm and travel',
      text: 'Once you are happy with the plan, we lock in your booking.',
    },
  ];

  return (
    <div className="bg-[#FAF7F5] min-h-[80vh] py-14 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-11 h-11" />
        </div>

        <h1 className="mt-6 font-serif text-3xl sm:text-4xl font-bold text-[#4A0E35]">
          Thank You for Your Inquiry!
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#523348] leading-relaxed max-w-lg mx-auto">
          Namaste! Your journey details have reached our team at Rangrez Holidays. A travel expert will
          get back to you very shortly.
        </p>

        {reference && (
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EADBDF] text-xs sm:text-sm text-[#4A0E35]">
            <span className="text-[#735467]">Your reference number</span>
            <strong className="tracking-wide">{reference}</strong>
          </div>
        )}

        {emailSent && (
          <p className="mt-4 inline-flex items-start gap-2 text-xs sm:text-sm text-[#523348] max-w-md text-left">
            <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#F05A28]" />
            <span>
              A confirmation email is on its way. If you do not see it within a few minutes, please check your
              Spam or Promotions folder.
            </span>
          </p>
        )}

        {/* What happens next */}
        <div className="mt-10 text-left bg-white rounded-2xl border border-[#F0E6EC] shadow-sm p-5 sm:p-7">
          <h2 className="font-serif text-xl font-bold text-[#4A0E35]">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#FAF4F8] text-[#F05A28] flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4A0E35]">
                    {i + 1}. {step.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#735467] leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Need faster help */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#EADBDF] text-[#4A0E35] hover:bg-[#FAF4F8] text-xs font-bold transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 97604 02549</span>
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs font-bold">
          <Link href="/tours" className="inline-flex items-center gap-1 text-[#4A0E35] hover:text-[#F05A28]">
            <span>Explore more tours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/" className="text-[#735467] hover:text-[#F05A28]">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
