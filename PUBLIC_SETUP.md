# DEITY E-Commerce - Setup Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Stripe account (for payments)

## Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Set up Environment Variables**
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/deity
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/deity

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-string-here
JWT_SECRET=generate-another-random-string-here

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

3. **Add Images**
- Add your product images to `/public/images/`
- See `/public/images/README.md` for required image paths

4. **Run Development Server**
```bash
npm run dev
```

5. **Create Admin User**
You'll need to create an admin user directly in MongoDB or through a script:
```javascript
// In MongoDB shell or Compass
db.users.insertOne({
  name: "Admin",
  email: "admin@deity.com",
  password: "$2a$10$...", // bcrypt hash of your password
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use a tool like bcrypt to hash passwords:
```bash
npm install -g bcrypt-cli
bcrypt "your-password"
```

## Features Implemented

✅ Homepage with hero sections, categories, and new arrivals
✅ Product detail pages with size, color, quantity selection
✅ Shopping cart drawer
✅ Checkout and payment (Stripe integration)
✅ User profile with order history and tracking
✅ Admin dashboard with:
  - Statistics and profit/loss
  - Product management (CRUD)
  - Order management
  - Coupon code management
✅ Authentication system
✅ Animations throughout the site
✅ Responsive design
✅ About page
✅ Collection pages

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

For deployment to Vercel/Netlify:
- Connect your repository
- Add environment variables in the platform's dashboard
- Deploy!

## Notes

- The Stripe integration requires proper API keys from your Stripe dashboard
- Make sure MongoDB is running and accessible
- Update image paths in the codebase to match your actual images
- Configure CORS if deploying API separately
- Set up proper authentication middleware for production

