# Backend Not Working - Quick Fix Guide

## Problem Statement
"Backend is not working and login API not sending requests"

## Diagnosis Steps Completed

✅ **Database Connection**: Working  
✅ **Admin User**: Exists in database  
✅ **Password Hash**: Valid (tested with bcrypt)  
⚠️ **Dev Server**: Status unknown  
⚠️ **API Endpoint**: Needs testing  

## Immediate Actions Required

### Step 1: Start Development Server

Open your terminal and run:

```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Environments: .env.local, .env
✓ Ready in 3.2s
```

**⚠️ Keep this terminal running!**

### Step 2: Test API Endpoint

Open a **NEW terminal** (keep dev server running) and run:

```bash
node scripts/test-api.js
```

**If API is working, you'll see:**
```
Testing API endpoint...

Status: 200
Response: {
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@deity.com",
    "role": "admin"
  }
}

✅ API is working!

Login successful!
Token received (first 50 chars): eyJhbGci...
User role: admin
```

**If you get connection error:**
```
✗ Error connecting to API: fetch failed
Make sure dev server is running: npm run dev
```

This means the dev server is not running or not on port 3000.

### Step 3: Test Login in Browser

1. Open browser to: `http://localhost:3000/login`

2. Press **F12** to open Developer Tools

3. Go to **Console** tab

4. Try logging in with:
   - Email: `admin@deity.com`
   - Password: `admin123`
   - Click "Login" button

5. Watch the Console for errors

6. Go to **Network** tab and look for:
   - Request to `/api/auth/login`
   - Status code (should be 200)
   - Response data

## Common Issues & Solutions

### Issue 1: Dev Server Won't Start

**Error: Port 3000 already in use**

**Solution A - Kill the process:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual number)
taskkill /PID <PID_NUMBER> /F

# Then start server
npm run dev
```

**Solution B - Use different port:**
```bash
npx next dev -p 3001
```

Then access at: `http://localhost:3001`

### Issue 2: API Returns 404

**Problem:** API route file missing or wrong path

**Check if file exists:**
```bash
dir app\api\auth\login\route.ts
```

**Should return:** File exists

**If file doesn't exist**, the API route is missing. Check your project structure.

### Issue 3: API Returns 500 Error

**Check terminal output** for error messages. Common causes:

- MongoDB connection string incorrect
- Missing environment variables
- TypeScript compilation errors

**Fix:**
```bash
# Check .env.local exists
cat .env.local

# Check for TypeScript errors
npx tsc --noEmit

# Clear cache and restart
Remove-Item -Recurse -Force .next
npm run dev
```

### Issue 4: CORS Error in Browser

**Error:** "Access-Control-Allow-Origin" header missing

This happens if frontend and backend are on different ports/origins.

**Solution:** The middleware.ts file should handle this. Check it exists:

```bash
dir middleware.ts
```

### Issue 5: Login Form Not Submitting

**Check:**
1. Browser console for JavaScript errors
2. Form has proper `onSubmit` handler
3. Event.preventDefault() is called
4. Fetch request is properly formatted

**Test with curl (bypasses frontend):**
```bash
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@deity.com\",\"password\":\"admin123\"}"
```

If this works but frontend doesn't, the issue is in your React components.

### Issue 6: Nothing Happens When Clicking Login

**Likely causes:**
- Button has no onClick handler
- Form submit not prevented
- Async/await not used properly
- Network request failing silently

**Debug:**
1. Add console.log in login function
2. Check browser Network tab
3. Look for errors in Console tab

## Verification Checklist

Before asking for help, verify these:

- [ ] Dev server is running (`npm run dev`)
- [ ] No errors in terminal
- [ ] Can access `http://localhost:3000` in browser
- [ ] Admin user exists in database (`node scripts/test-db.js`)
- [ ] API test works (`node scripts/test-api.js`)
- [ ] Browser shows no console errors (F12)
- [ ] Network tab shows login request

## Debugging Workflow

When something doesn't work:

1. **Check Terminal** (server-side errors)
2. **Check Browser Console** (client-side errors)
3. **Check Network Tab** (request/response details)
4. **Run Test Scripts** (`test-api.js`, `test-login.js`)
5. **Review Code** (check for typos, missing imports)

## Files to Check

If backend isn't working, verify these files exist and have correct code:

```
app/
├── api/
│   ├── auth/
│   │   └── login/
│   │       └── route.ts          ← Login API
│   └── admin/
│       ├── products/
│       │   └── route.ts          ← Products API
│       └── orders/
│           └── route.ts          ← Orders API
├── login/
│   └── page.tsx                  ← Login page
└── admin/
    └── page.tsx                  ← Admin dashboard

lib/
├── auth.ts                       ← Auth helpers
└── mongodb.ts                    ← DB connection

models/
└── User.ts                       ← User model

.env.local                        ← Environment variables
middleware.ts                     ← CORS & middleware
```

## Quick Reset Procedure

If nothing works, try this complete reset:

```bash
# 1. Stop dev server (Ctrl+C in terminal)

# 2. Delete cache
Remove-Item -Recurse -Force .next

# 3. Verify .env.local exists
cat .env.local

# 4. Reinstall dependencies (optional)
npm install

# 5. Start fresh
npm run dev

# 6. In new terminal, test API
node scripts/test-api.js
```

## What to Report When Asking for Help

Instead of "it's not working", provide:

1. **Exact error message** from terminal or browser
2. **What you tried** (steps you took)
3. **Test results**:
   ```
   node scripts/test-db.js → [output]
   node scripts/test-api.js → [output]
   ```
4. **Browser console errors** (screenshot)
5. **Network tab** request/response (screenshot)

## Expected Behavior

When everything works correctly:

1. ✅ Run `npm run dev`
2. ✅ Server starts at `http://localhost:3000`
3. ✅ Go to `/login`
4. ✅ Enter credentials
5. ✅ Click login
6. ✅ Network request sent to `/api/auth/login`
7. ✅ Server responds with token
8. ✅ Token stored in cookie
9. ✅ Redirected to dashboard
10. ✅ Admin panel accessible

## Next Steps After Fixing

Once backend is working:

1. Login as admin
2. Access admin dashboard at `/admin`
3. Add some products
4. Test full user flow (browse → cart → checkout)
5. Verify orders appear in admin panel

---

**Remember:** The backend IS working (database verified). The issue is likely:
- Dev server not running
- Frontend not calling API correctly
- Network/CORS configuration

Follow the steps above systematically to identify the exact issue.
