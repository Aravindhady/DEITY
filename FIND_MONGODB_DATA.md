# How to Find Your Data in MongoDB Atlas

## Problem: "Admin user not showing in MongoDB"

You're seeing collections like `config`, `local`, `oplog.rs` but NOT your application data.

## Solution: You're Looking at the Wrong Database!

### Understanding MongoDB Atlas Structure

When you connect to MongoDB Atlas, you see **system databases** by default:
- `admin` - System administration database
- `config` - Configuration database  
- `local` - Local replication data
- `oplog.rs` - Replication operation log

**Your actual data is in the `dieti` database!**

## How to View Your Data

### Method 1: Using MongoDB Compass (Recommended)

1. **Open MongoDB Compass**

2. **Connect using your connection string:**
   ```
  mongodb+srv://aravind:Aravind1234@advanced-compiler.9od1kax.mongodb.net/?appName=Advanced-compiler
   ```

3. **Look for the `dieti` database in the left sidebar:**
   - Click on the database dropdown (it might say "admin" or show all databases)
   - Find and click on **`dieti`**
   
4. **You should see:**
   - `users` collection with 1 document (your admin user)
   - Other collections will appear as you add data

### Method 2: Using MongoDB Shell (mongosh)

1. **Connect to the correct database:**
   ```bash
   mongosh "mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority"
   ```

2. **Verify you're in the right database:**
   ```javascript
   db
   // Should show: dieti
   ```

3. **List all collections:**
   ```javascript
   show collections
   // Should show: users
   ```

4. **View your admin user:**
   ```javascript
   db.users.findOne()
   ```

5. **Count documents:**
   ```javascript
   db.users.countDocuments()
   // Should show: 1
   ```

### Method 3: Using MongoDB Atlas Web Interface

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com/)**

2. **Log in to your account**

3. **Click "Browse Collections"**

4. **Look for the `dieti` database:**
   - It might be listed under your cluster name
   - Click on **`dieti`** database
   - You should see the `users` collection

5. **Click on `users` collection** to view your admin user

## Why This Happens

When you first connect to MongoDB Atlas:
- It shows system databases by default
- Your application database (`dieti`) is created when you insert data
- Collections only appear after documents are inserted
- The database name is specified in your connection string

## Your Connection String Breakdown

```
mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority
                                                              ^^^^^
                                                              This is your database name!
```

## Verifying Your Data Exists

Run this test to confirm:

```bash
node scripts/test-db.js
```

If it shows:
```
Collections found:
  - users

Document counts:
  users: 1 documents
```

Then your data IS in MongoDB Atlas, you just need to look in the right place!

## Quick Checklist

✅ Connection string includes `/dieti`  
✅ Test script shows 1 user document  
✅ Admin user was created successfully  

❌ You're looking at `admin`, `local`, or `config` databases  
❌ You expect to see collections before inserting data  

## Still Can't Find It?

### Check These Common Mistakes:

1. **Wrong Cluster**: Make sure you're looking at `cluster0.x2c1o.mongodb.net`
2. **Wrong Database**: Look for `dieti`, not `admin` or `local`
3. **Wrong Region**: If you have multiple clusters, check the correct one
4. **Permissions**: Ensure your MongoDB user has read access to the `dieti` database

### Refresh the Connection:

Sometimes MongoDB Compass or Atlas web interface needs a refresh:
- Click the refresh button
- Disconnect and reconnect
- Clear browser cache (for web interface)

## What You Should See

In the `dieti` database → `users` collection:

```json
{
  "_id": ObjectId("..."),
  "name": "Admin User",
  "email": "admin@deity.com",
  "password": "$2a$10$...",
  "role": "admin",
  "addresses": [],
  "createdAt": ISODate("2026-02-28T..."),
  "updatedAt": ISODate("2026-02-28T...")
}
```

## Next Steps After Finding Your Data

1. ✅ Verify admin user exists in `dieti.users` collection
2. ✅ Login at `http://localhost:3000/login` with:
   - Email: `admin@deity.com`
   - Password: `admin123`
3. ✅ Access admin panel at `http://localhost:3000/admin`
4. ✅ Add products through the UI
5. ✅ Watch new collections appear in MongoDB (`products`, `orders`, etc.)

---

**Remember:** Your data is there! Just make sure you're looking in the `dieti` database, not the system databases.
