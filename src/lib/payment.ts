import { WamPaymentSDK } from 'wam-payment-sdk';

if (!process.env.NEXT_PUBLIC_WAM_BUSINESS_ID) {
  throw new Error('WAM_BUSINESS_ID environment variable is required');
}

if (!process.env.WAM_PRIVATE_KEY) {
  throw new Error('WAM_PRIVATE_KEY environment variable is required');
}

export const wamPayment = new WamPaymentSDK({
  businessId: process.env.NEXT_PUBLIC_WAM_BUSINESS_ID,
  privateKey: process.env.WAM_PRIVATE_KEY
});

export function generateOrderReference(): string {
  return `TOUCAN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}