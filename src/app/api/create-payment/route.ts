import { NextRequest, NextResponse } from 'next/server';
import { wamPayment, generateOrderReference } from '@/lib/payment';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'TTD' } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const reference = generateOrderReference();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const paymentLink = wamPayment.generatePaymentLink({
      amount,
      currency,
      reference,
      returnUrl: `${baseUrl}/success?reference=${reference}`
    });

    return NextResponse.json({
      paymentUrl: paymentLink.url,
      reference: reference
    });
    
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}