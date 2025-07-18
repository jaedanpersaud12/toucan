'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your order at Toucan Restaurant!
        </p>
        {reference && (
          <p className="text-sm text-gray-500 mb-6">
            Order Reference: {reference}
          </p>
        )}
        <p className="text-sm text-gray-600 mb-6">
          Your delicious Caribbean meal will be prepared shortly. 
          We'll contact you when it's ready for pickup or delivery.
        </p>
        <Link
          href="/"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-500 inline-block"
        >
          Order Again
        </Link>
      </div>
    </div>
  );
}