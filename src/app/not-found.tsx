import Link from 'next/link';

// Rendered with a real HTTP 404 status; Next.js adds <meta name="robots" content="noindex"> automatically.
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-serif text-3xl font-bold text-[#4A0E35]">Page Not Found</h1>
      <p className="mt-2 text-sm text-[#735467] max-w-md">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-[#4A0E35] text-white font-bold text-xs shadow-md hover:bg-[#380927]"
      >
        Back to Home
      </Link>
    </div>
  );
}
