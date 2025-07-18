# 🦜 Toucan Restaurant - WAM Payment SDK Demo

A Caribbean restaurant ordering system demonstrating the **WAM Payment SDK** integration with Next.js. This project showcases how to implement secure payment processing for an e-commerce application using the official WAM Payment SDK.

## 🌟 Features

- **Caribbean Restaurant Menu** - 8 authentic dishes across appetizers, mains, desserts, and drinks
- **Shopping Cart** - Add, remove, and manage order quantities
- **WAM Payment Integration** - Secure payment processing with HMAC-SHA256 signatures
- **Responsive Design** - Simple, mobile-friendly interface
- **TypeScript Support** - Full type safety throughout the application

## 🚀 WAM Payment SDK Implementation

This project demonstrates the key features of the [WAM Payment SDK](https://www.npmjs.com/package/wam-payment-sdk):

### SDK Configuration
```typescript
// src/lib/payment.ts
import { WamPaymentSDK } from 'wam-payment-sdk';

export const wamPayment = new WamPaymentSDK({
  businessId: process.env.NEXT_PUBLIC_WAM_BUSINESS_ID,
  privateKey: process.env.WAM_PRIVATE_KEY
});
```

### Payment Link Generation
```typescript
// src/app/api/create-payment/route.ts
const paymentLink = wamPayment.generatePaymentLink({
  amount: totalAmount,        // Amount in cents
  currency: 'TTD',           // Trinidad & Tobago Dollar
  reference: orderReference,  // Unique order ID
  returnUrl: successPageUrl   // Post-payment redirect
});
```

### Error Handling & Validation
The implementation includes comprehensive error handling:
- Input validation for amounts and currency
- HMAC signature verification
- Secure environment variable management
- Graceful error fallbacks in the UI

### Security Best Practices
- ✅ Private keys stored in environment variables
- ✅ HTTPS-only payment communications
- ✅ Input validation on all payment parameters
- ✅ Signed payment URLs with HMAC-SHA256
- ✅ No sensitive data exposed to client-side

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- WAM Business Account with API credentials

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
cp .env.local.example .env.local
```

3. **Add your WAM credentials to `.env.local`:**
```env
NEXT_PUBLIC_WAM_BUSINESS_ID=your-business-id-here
WAM_PRIVATE_KEY=your-private-key-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/
│   ├── api/create-payment/route.ts  # Payment API endpoint
│   ├── success/page.tsx             # Post-payment success page
│   └── page.tsx                     # Main restaurant interface
├── data/menu.ts                     # Restaurant menu items
├── hooks/useCart.ts                 # Shopping cart logic
├── lib/payment.ts                   # WAM SDK configuration
└── types/menu.ts                    # TypeScript definitions
```

## 🔧 Key Implementation Details

### Payment Flow
1. **Add Items to Cart** - Users browse menu and add items
2. **Calculate Total** - Cart calculates total amount in cents
3. **Generate Payment Link** - Server-side API creates signed WAM payment URL
4. **Redirect to WAM Pay** - User completes payment on WAM platform
5. **Return to Success Page** - User redirected back with order reference

### Cart Management (`src/hooks/useCart.ts`)
- Add/remove items
- Update quantities
- Calculate totals
- Persist state during session

### Payment API (`src/app/api/create-payment/route.ts`)
- Validates payment amounts
- Generates unique order references
- Creates signed payment URLs
- Returns payment link to frontend

### Success Handling (`src/app/success/page.tsx`)
- Displays payment confirmation
- Shows order reference
- Provides link to order again

## 🌍 Environment Configuration

The SDK automatically selects the correct payment gateway:

- **Development**: `https://wam-payments-v2-git-development-zed-io.vercel.app`
- **Staging**: `https://pay-staging.wam.money`
- **Production**: `https://pay.wam.money`

Override with `WAM_PAY_URL` environment variable if needed.

## 📱 Usage Example

1. Browse the Toucan restaurant menu
2. Add Caribbean dishes to your cart
3. Click "Cart" to review your order
4. Click "Checkout with WAM Pay"
5. Complete payment on the WAM platform
6. Return to see your order confirmation

## 🔐 Security Notes

- Never expose `WAM_PRIVATE_KEY` in client-side code
- Use environment variables for all sensitive configuration
- The SDK handles HMAC-SHA256 signature generation automatically
- All payment URLs are cryptographically signed

## 🤝 WAM Payment SDK

This project uses the official WAM Payment SDK. For more information:
- [NPM Package](https://www.npmjs.com/package/wam-payment-sdk)
- [GitHub Repository](https://github.com/wam-digital/wam-payment-sdk)

## 📄 License

MIT License - see LICENSE file for details.
