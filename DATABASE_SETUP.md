# Database Setup Guide

## MongoDB Connection Issues - Troubleshooting

### Issue: "MongoDB not showing project documents"

This guide will help you resolve MongoDB connection issues.

## Quick Fix

1. **Update your `.env.local` file** with the correct MongoDB connection string (already done)
2. **Restart your development server**
3. **Run the test script** to verify connection

## Running the Test Script

To check if your MongoDB connection is working:

```bash
node scripts/test-db.js
```

This will show you:
- If the connection is successful
- What collections exist in your database
- How many documents are in each collection

## Common Issues and Solutions

### Issue 1: Using Local MongoDB but it's not running

**Symptoms:**
- Connection timeout errors
- "Cannot connect to localhost:27017"

**Solution:**
Start your local MongoDB service:

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Issue 2: Wrong Database Name

Your current configuration uses the `dieti` database on MongoDB Atlas.

**To verify which database you're connecting to:**
- Check the connection string in `.env.local`
- The database name is after the last `/` in the URI

Current: `mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority`
Database name: `dieti`

### Issue 3: Collections Don't Exist Yet

If your database is empty, collections won't show up until you add data.

**Solution:** Create some initial data by:
1. Registering a user account
2. Adding products through the admin panel
3. Placing an order

Collections are created automatically when you first insert data.

### Issue 4: MongoDB Atlas Network Access

**Symptoms:**
- "IP whitelist" errors
- "Network timeout" errors

**Solution:**
1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Add your IP address or use "Allow Access from Anywhere" (0.0.0.0/0) for testing
4. Wait 5 minutes for changes to apply

### Issue 5: Incorrect Credentials

**Symptoms:**
- "Authentication failed" error

**Solution:**
1. Verify username and password in the connection string
2. Make sure special characters in password are URL-encoded
3. Check that the user has read/write permissions on the database

## Switching Between Local and Atlas

### Use MongoDB Atlas (Cloud):
```env
MONGODB_URI=mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority
```

### Use Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/deity
```

Just uncomment the appropriate line in your `.env.local` file.

## Verifying Your Database

### Using MongoDB Compass (GUI):
1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse collections and documents visually

### Using MongoDB Shell:
```bash
mongosh "mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority"
```

Then run commands:
```javascript
// Show all collections
show collections

// Count documents
db.users.countDocuments()
db.products.countDocuments()
db.orders.countDocuments()

// View sample documents
db.users.findOne()
db.products.findOne()
```

## Creating Sample Data

If your database is empty, here's how to populate it:

### 1. Create an Admin User (via MongoDB directly):
```javascript
// In MongoDB shell or Compass
use dieti

db.users.insertOne({
  name: "Admin User",
  email: "admin@deity.com",
  password: "$2a$10$YourHashedPasswordHere", // Generate with bcrypt
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

To generate a password hash:
```javascript
// In Node.js
const bcrypt = require('bcryptjs');
bcrypt.hash("your-password", 10).then(hash => console.log(hash));
```

### 2. Add Products Through Admin Panel:
1. Log in as admin
2. Navigate to /admin
3. Go to Products tab
4. Click "Add Product"
5. Fill in product details

## Next Steps

After fixing your MongoDB connection:
1. Run `node scripts/test-db.js` to verify
2. Start your dev server: `npm run dev`
3. Create an admin user if needed
4. Start adding products and testing features

## Additional Resources

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Compass Guide](https://www.mongodb.com/docs/compass/)
