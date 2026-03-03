# Deity E-commerce Platform - Developer Manual

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Architecture Overview](#architecture-overview)
6. [Frontend Implementation](#frontend-implementation)
7. [Backend Implementation](#backend-implementation)
8. [Database Design](#database-design)
9. [Authentication System](#authentication-system)
10. [API Endpoints](#api-endpoints)
11. [State Management](#state-management)
12. [Styling and UI Framework](#styling-and-ui-framework)
13. [Payment Integration](#payment-integration)
14. [Deployment](#deployment)
15. [Testing](#testing)
16. [Performance Optimization](#performance-optimization)
17. [Future Enhancements](#future-enhancements)
18. [Troubleshooting](#troubleshooting)

## Overview

The Deity E-commerce Platform is a modern, full-stack e-commerce application built with Next.js 14, MongoDB, and Tailwind CSS. It features a responsive UI with admin capabilities, secure authentication, and payment processing via Stripe.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom-built components with Tailwind
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: React Context API, Zustand (cart store)
- **HTTP Client**: Native fetch API
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Server Framework**: Next.js App Router (built-in API routes)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **Database**: MongoDB with Mongoose ODM
- **Payment Processing**: Stripe

### Database
- **Database**: MongoDB (document-based)
- **ODM**: Mongoose
- **Models**: User, Product, Order, Coupon, Review

### Development Tools
- **Package Manager**: npm
- **Module Bundler**: Next.js built-in bundler
- **Linting**: ESLint (implied)
- **Formatting**: Prettier (implied)
- **Environment Variables**: .env files

## Project Structure

```
deity-final/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   │   ├── admin/         # Admin-specific API routes
│   │   ├── auth/          # Authentication routes
│   │   ├── cart/          # Cart routes
│   │   ├── orders/        # Order routes
│   │   ├── payment/       # Payment routes
│   │   └── products/      # Product routes
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── checkout/      # Checkout components
│   │   ├── products/      # Product components
│   │   └── ...            # Other component categories
│   ├── context/           # React Context providers
│   ├── data/              # Static data files
│   ├── globals.css        # Global styles
│   └── ...                # Other pages
├── components/            # UI components
├── images/                # Static image assets
├── lib/                   # Utility functions and libraries
│   ├── api/               # API utility functions
│   ├── utils/             # General utilities
│   ├── api.ts             # API helper functions
│   ├── auth.ts            # Authentication helpers
│   └── mongodb.ts         # Database connection
├── models/                # Mongoose models
├── public/                # Public assets
├── store/                 # State management stores
├── types/                 # TypeScript type definitions
├── .env.example           # Environment variable examples
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Development Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- MongoDB (local instance or cloud Atlas)
- Stripe account for payment processing

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd deity-final
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Architecture Overview

### Frontend Architecture
- **Next.js App Router**: Handles routing and server-side rendering
- **Component-Based**: Reusable, modular components
- **Client-Side Rendering**: Interactive components use "use client" directive
- **Server Actions**: API calls handled through fetch requests

### Backend Architecture
- **API Routes**: Next.js API routes in `/app/api`
- **Middleware**: Authentication and authorization
- **Database Layer**: Mongoose models and schemas
- **Business Logic**: Separated into API routes and utility functions

### Data Flow
1. User interacts with UI components
2. Components trigger API calls to Next.js API routes
3. API routes authenticate requests and interact with database
4. Database operations performed using Mongoose models
5. Responses sent back to frontend components
6. Components update UI based on responses

## Frontend Implementation

### Component Structure
Components are organized by functionality:
- **Reusable Components**: Buttons, inputs, cards
- **Page-Specific Components**: Complex components tied to specific pages
- **Admin Components**: Specialized components for admin functionality

### Key Frontend Patterns
- **Client Components**: Components requiring interactivity use `"use client"`
- **Server Components**: Components that render on the server by default
- **State Management**: React hooks (useState, useEffect) and external stores
- **Context Providers**: Global state management for cart and user data

### Page Organization
- **Static Imports**: Components imported at the top of files
- **Dynamic Imports**: Heavy components loaded dynamically when needed
- **Code Splitting**: Automatic by Next.js for different routes

## Backend Implementation

### API Route Structure
API routes are located in `/app/api` and follow this pattern:
```
/app/api/
├── route.ts              # For single routes (GET, POST)
└── [param]/route.ts      # For dynamic routes (GET, POST, PUT, DELETE)
```

### Authentication Middleware
The `lib/auth.ts` file contains authentication helpers:
- `requireAuth`: Requires valid JWT token
- `requireAdmin`: Requires valid JWT token AND admin role

### Database Connection
Database connection is established using the singleton pattern in `lib/mongodb.ts`:
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

## Database Design

### User Model
```typescript
interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'admin';
  addresses: [{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }];
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Model
```typescript
interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'mens' | 'womens' | 'accessories' | 'unisex';
  subcategory?: string;
  collections: string[];
  sizes: [{
    size: string;
    stock: number;
  }];
  colors: [{
    name: string;
    hex: string;
    images?: string[];
  }];
  tags: string[];
  isNewArrival: boolean;
  isLimitedEdition: boolean;
  isExclusive: boolean;
  isBestSeller: boolean;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Model
```typescript
interface IOrder {
  userId: ObjectId;
  orderNumber: string;
  items: [{
    productId: ObjectId;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Coupon Model
```typescript
interface ICoupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Review Model
```typescript
interface IReview {
  userId: ObjectId;
  productId: ObjectId;
  orderId: ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Authentication System

### JWT-Based Authentication
1. **Login Process**:
   - User submits credentials to `/api/auth/login`
   - Server validates credentials against database
   - JWT token is generated and returned
   - Token is stored in browser cookie

2. **Token Structure**:
   - Contains userId, email, and role
   - Expires after 7 days
   - Signed with JWT_SECRET from environment

3. **Protected Routes**:
   - Middleware checks for valid token
   - Admin routes additionally verify admin role
   - Unauthorized requests return 401/403 status

### Role-Based Access Control
- **User Role**: Standard e-commerce functionality
- **Admin Role**: Full access to admin dashboard and API routes
- Role assignment happens during user registration or manually in database

## API Endpoints

### Public API Endpoints
- `GET /api/products` - Get all products with filtering options
- `GET /api/products/[slug]` - Get specific product by slug
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/payment/create-intent` - Create Stripe payment intent

### User-Protected API Endpoints
- `GET /api/orders` - Get user's orders
- `GET /api/cart` - Get user's cart
- `PUT /api/cart` - Update user's cart
- `DELETE /api/cart` - Clear user's cart

### Admin-Protected API Endpoints
- `GET /api/admin/stats` - Get business analytics
- `GET/POST /api/admin/products` - Manage products
- `GET/PUT /api/admin/products/[id]` - Manage specific product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/[id]` - Update specific order
- `GET/POST/DELETE /api/admin/coupons` - Manage coupons

## State Management

### Client-Side State
- **React Hooks**: useState, useEffect, useContext
- **Zustand**: Cart state management in `store/cartStore.ts`
- **Context API**: User authentication state in `context/CartContext.tsx`

### Cart Management
- **Zustand Store**: Persistent cart state
- **Cookie Storage**: Cart data persisted across sessions
- **Real-time Updates**: Cart updates reflected immediately across app

## Styling and UI Framework

### Tailwind CSS
- **Configuration**: Custom theme with brand colors in `tailwind.config.js`
- **Utility Classes**: Component styling using atomic classes
- **Responsive Design**: Mobile-first approach with breakpoints

### Custom Components
- **Reusability**: Components built for reusability across pages
- **Consistency**: Consistent design language throughout application
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## Payment Integration

### Stripe Integration
- **Payment Intents**: Server-side creation of payment intents
- **Client-Side Handling**: Secure card information handling
- **Webhooks**: Future implementation for payment confirmation

### Security Considerations
- **PCI Compliance**: Card information never touches our servers
- **Tokenization**: Payment information securely tokenized by Stripe
- **HTTPS**: All payment-related communications encrypted

## Deployment

### Production Setup
1. **Build Application**:
   ```bash
   npm run build
   ```

2. **Start Production Server**:
   ```bash
   npm start
   ```

### Environment Configuration
- **Production Variables**: Separate configuration for production
- **Database**: MongoDB Atlas or self-hosted production database
- **CDN**: Static asset optimization
- **SSL**: HTTPS enforcement

### Platform Deployment
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative hosting option
- **Self-Hosting**: Node.js server with reverse proxy

## Testing

### Testing Strategy
While not explicitly shown in the codebase, testing should include:
- **Unit Tests**: Individual function and component testing
- **Integration Tests**: API route and database interaction testing
- **End-to-End Tests**: User flow testing

### Recommended Tools
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Playwright**: Alternative end-to-end testing

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Automatic by Next.js
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Identify large bundles and optimize
- **Caching**: Browser caching and service worker implementation

### Backend Optimizations
- **Database Indexing**: Proper indexing on frequently queried fields
- **Pagination**: Implement pagination for large datasets
- **Caching**: Redis or in-memory caching for frequently accessed data
- **API Optimization**: Minimize database queries and optimize aggregations

## Future Enhancements

### Immediate Improvements
1. **Better Error Handling**: More comprehensive error boundaries and user feedback
2. **Form Validation**: Client-side and server-side validation improvements
3. **Loading States**: Better loading indicators and skeleton screens
4. **Accessibility**: Improve WCAG compliance

### Feature Additions
1. **User Reviews**: Allow users to submit and manage product reviews
2. **Wishlist**: Product wishlisting functionality
3. **Inventory Management**: Real-time inventory tracking
4. **Advanced Analytics**: More detailed business intelligence
5. **Email Notifications**: Automated email system for order updates
6. **Multi-language Support**: Internationalization (i18n) implementation

### Technical Improvements
1. **Microservices Architecture**: Break monolith into services
2. **GraphQL API**: Replace REST API with GraphQL for flexible data fetching
3. **Serverless Functions**: Move to serverless architecture for better scaling
4. **Real-time Features**: WebSocket integration for live updates
5. **Advanced Search**: Elasticsearch integration for better search functionality

### Security Enhancements
1. **Rate Limiting**: Implement rate limiting to prevent abuse
2. **Input Sanitization**: More robust input validation and sanitization
3. **Audit Logging**: Track user actions and system events
4. **Two-Factor Authentication**: Enhanced user security

## Troubleshooting

### Common Issues

**Issue**: Database connection fails
- **Solution**: Verify MONGODB_URI in environment variables and ensure MongoDB is running

**Issue**: Authentication not working
- **Solution**: Check JWT_SECRET environment variable and ensure tokens aren't expired

**Issue**: Payment processing failing
- **Solution**: Verify Stripe keys and ensure proper API communication

**Issue**: Build failures
- **Solution**: Check for TypeScript errors and ensure all dependencies are installed

### Debugging Tips
- Use browser developer tools to inspect API requests and responses
- Check server logs for error messages
- Verify environment variables are properly set
- Test API routes individually using tools like Postman

### Performance Monitoring
- Monitor API response times
- Track database query performance
- Analyze bundle sizes and loading times
- Monitor user session and authentication performance