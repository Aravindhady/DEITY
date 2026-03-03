# Quick Start Guide - Deity E-commerce Platform

## ✅ MongoDB Connection Status: WORKING

Your MongoDB connection is successfully configured and working!

**Current Status:**
- ✓ Connected to MongoDB Atlas
- ✓ Database name: `dieti`
- ⚠ Database is currently empty (this is normal for new setups)

## Next Steps to Get Started

### Step 1: Create an Admin User

Since the database is empty, you need to create an admin user first. You have two options:

#### Option A: Create via MongoDB Directly (Recommended for First Setup)

1. **Generate a password hash** using Node.js:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10).then(hash => console.log('Hashed password:', hash));"
   ```
   
2. **Copy the hashed password** from the output

3. **Open MongoDB Compass** or MongoDB Shell and connect to your database:
   - Connection string: `mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority`

4. **Create the users collection** and insert admin user:
   ```javascript
   // In MongoDB Shell
   use dieti
   
   db.users.insertOne({
     _id: ObjectId(),
     name: "Admin User",
     email: "admin@deity.com",
     password: "$2a$10$YOUR_HASHED_PASSWORD_HERE", // Replace with actual hash
     role: "admin",
     addresses: [],
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

5. **Verify the user was created**:
   ```javascript
   db.users.findOne({ email: "admin@deity.com" })
   ```

#### Option B: Register Normally and Update Role

1. Go to your app's signup page: `http://localhost:3000/signup`
2. Register with your admin credentials
3. Then update the role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Step 2: Restart Your Development Server

After creating the admin user:

```bash
npm run dev
```

Your server should be running at `http://localhost:3000`

### Step 3: Log in as Admin

1. Navigate to `http://localhost:3000/login`
2. Use the admin credentials you just created:
   - Email: `admin@deity.com`
   - Password: `admin123` (or whatever you set)

### Step 4: Access Admin Dashboard

Once logged in, navigate to the admin panel:
- URL: `http://localhost:3000/admin`

You should now see the admin dashboard with tabs for:
- Statistics
- Products
- Orders
- Coupons

### Step 5: Add Your First Product

1. Click on the **Products** tab
2. Click **Add Product** button
3. Fill in product details:
   - Name: e.g., "Classic T-Shirt"
   - Description: Product description
   - Price: 999
   - Category: Select appropriate category
   - Upload images (use URLs or placeholder images)
   - Add sizes and stock quantities
   - Add colors if applicable
4. Click **Create Product**

### Step 6: Verify Products Are Saved

Run the test script again to see your data:

```bash
node scripts/test-db.js
```

You should now see:
```
Collections found:
  - users
  - products

Document counts:
  users: 1 documents
  products: 1 documents
```

### Step 7: Test the User Experience

1. Open a new incognito/private browser window
2. Visit `http://localhost:3000`
3. Browse products
4. Create a regular user account
5. Add items to cart
6. Place a test order

### Step 8: View Orders in Admin Panel

Back in the admin panel (`/admin`):
- Go to **Orders** tab
- You should see the order you just placed
- Update order status to test the functionality

## Common Tasks

### Check Database Contents Anytime

```bash
node scripts/test-db.js
```

### Reset Everything (Start Fresh)

If you want to clear all data and start over:

```javascript
// In MongoDB Shell
use dieti
db.dropDatabase()
```

Then recreate your admin user.

### Add Sample Products Programmatically

Create a file `scripts/add-sample-products.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const Product = require('../models/Product').default;

async function addSampleProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const sampleProducts = [
      {
        name: "Classic White Tee",
        slug: "classic-white-tee",
        description: "Premium quality cotton t-shirt",
        price: 999,
        category: "unisex",
        images: ["/images/product1.jpg"],
        sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 15 }, { size: "L", stock: 20 }],
        colors: [{ name: "White", hex: "#FFFFFF" }],
        sku: "TSHIRT-001",
        stock: 45,
        isNewArrival: true,
      },
      // Add more products...
    ];

    await Product.insertMany(sampleProducts);
    console.log(`Added ${sampleProducts.length} products successfully!`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

addSampleProducts();
```

Then run:
```bash
node scripts/add-sample-products.js
```

## Troubleshooting

### Issue: Can't access admin panel after login

**Solution:** Make sure you're logged in with an account that has `role: "admin"` in the database.

### Issue: Products not showing up

**Solution:** 
1. Run `node scripts/test-db.js` to verify products are in database
2. Check browser console for errors
3. Try refreshing the page

### Issue: Cart not working

**Solution:** Clear browser cookies and localStorage, then try again.

## Additional Resources

- **User Manual**: See `USER_MANUAL.md` for user-facing features
- **Developer Manual**: See `DEVELOPER_MANUAL.md` for technical details
- **Database Setup**: See `DATABASE_SETUP.md` for MongoDB troubleshooting

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify MongoDB connection with the test script
4. Review the documentation files

---

**Happy Coding! 🚀**