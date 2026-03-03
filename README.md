# DEITY - E-Commerce Fashion Brand

A production-level e-commerce website built with Next.js and MongoDB for the DEITY fashion brand.

## Features

- **Home Page**: Hero sections, product categories, new arrivals
- **Product Pages**: Detailed product views with size, color, quantity options, reviews, and recommendations
- **Shopping Cart**: Drawer-based cart with persistent state
- **Checkout**: Secure payment processing
- **User Profile**: Order history, product tracking, profile management
- **Admin Dashboard**: Product management, stock updates, order management, profit/loss analytics, coupon codes
- **Collections**: Men's, Women's, and Accessories categories
- **About Page**: Brand story and information

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Payments**: Stripe
- **E-commerce Operations**: Qikink API
- **Animations**: Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your MongoDB URI and other secrets
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_URL`: Your app URL
- `NEXTAUTH_SECRET`: Secret for NextAuth (generate a random string)
- `JWT_SECRET`: Secret for JWT tokens
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `QIKINK_BASE_URL`: Qikink API base URL
- `QIKINK_API_KEY`: Qikink API key
- `QIKINK_API_SECRET`: Qikink API secret

## Project Structure

```
/app          # Next.js App Router pages
/components   # React components
/lib          # Utility functions, database connection, API services
/lib/api      # Qikink API integration (service layer, config, errors)
/models       # MongoDB Mongoose models
/types        # TypeScript type definitions
/types/qikink # Qikink-specific type definitions
/store        # Zustand state management
/public       # Static assets
```

## Qikink API Integration

The project includes a comprehensive integration with the Qikink API that handles e-commerce operations like products, orders, customers, and inventory. The integration features:

- Clean service layer architecture in `lib/api/`
- Centralized configuration with proper credential management
- Comprehensive error handling with custom error classes
- Full TypeScript support with dedicated type definitions
- Ready for production deployment

For detailed usage information, see `lib/api/README.md`.
