# Backend is Working - Frontend Configuration Fix

## ✅ Good News!

Your backend is **100% working**! Test results confirm:

```
Status: 200
✅ API is working!
Login successful!
User role: admin
```

## The Problem

Your dev server is running on **port 3001**, but your frontend might be configured for **port 3000**.

Current setup:
- Server: `http://localhost:3001` ✓
- Frontend config: Probably pointing to `http://localhost:3000` ✗

## Solution Options

### Option 1: Kill Port 3000 and Use 3001 (Recommended)

**Find and kill process on port 3000:**

```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the actual number shown)
taskkill /PID <PID_NUMBER> /F

# Restart dev server - it should now use port 3000
npm run dev
```

This will make your server run on the default port 3000.

### Option 2: Update Frontend to Use Port 3001

If you want to keep using port 3001, you need to ensure all API calls point to the correct URL.

**Check these files for hardcoded URLs:**

1. **Environment variables** (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_BASE_URL=http://localhost:3001
   ```

2. **API client/utility files**:
   Check `lib/api.ts` or similar files for base URL configuration

3. **Frontend components**:
   Search for `localhost:3000` in your code:
   ```bash
   grep -r "localhost:3000" app/ lib/
   ```

### Option 3: Force Next.js to Always Use Port 3000

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start"
  }
}
```

Then always run:
```bash
npm run dev
```

## How to Access Your App Now

Since your server is on port 3001:

1. **Login page**: `http://localhost:3001/login`
2. **Admin panel**: `http://localhost:3001/admin`
3. **Home page**: `http://localhost:3001`

**Login credentials:**
- Email: `admin@deity.com`
- Password: `admin123`

## Testing Login in Browser

1. Open browser to: `http://localhost:3001/login`

2. Press **F12** → Go to **Console** tab

3. Login with:
   - Email: `admin@deity.com`
   - Password: `admin123`

4. **Expected behavior:**
   - No errors in console
   - Network request to `/api/auth/login` succeeds
   - Redirected to admin dashboard

5. **If you see errors:**
   - Check **Network** tab for failed requests
   - Look at the request URL - it should be `http://localhost:3001/api/auth/login`
   - If it shows `localhost:3000`, your frontend is configured wrong

## Common Frontend Issues

### Issue 1: Hardcoded API URLs

**Wrong:**
```typescript
const API_URL = 'http://localhost:3000';
```

**Correct:**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

### Issue 2: Relative vs Absolute URLs

Using relative URLs (`/api/auth/login`) is better than absolute (`http://localhost:3000/api/auth/login`) because they automatically adapt to the current port.

**Good (relative):**
```typescript
fetch('/api/auth/login', { ... })
```

**Bad (absolute with hardcoded port):**
```typescript
fetch('http://localhost:3000/api/auth/login', { ... })
```

### Issue 3: Environment Variable Not Set

Make sure `.env.local` has:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Or just remove it and use relative URLs throughout your app.

## Quick Fix Steps

### If you want to use port 3000 instead:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Find what's using port 3000
netstat -ano | findstr :3000

# 3. Kill that process
taskkill /PID <PID> /F

# 4. Start server again
npm run dev
# It should now say: Local: http://localhost:3000
```

### If you want to keep port 3001:

1. Update `.env.local`:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3001
   ```

2. Access your app at `http://localhost:3001`

3. Make sure all API calls use relative URLs or the correct port

## Verify Everything Works

Test checklist:

- [ ] Can access `http://localhost:3001/login`
- [ ] Login form submits to correct port
- [ ] No console errors after login
- [ ] Redirected to admin panel after login
- [ ] Admin dashboard loads at `/admin`
- [ ] Can navigate to other pages

## Updated Test Script

I'll update the test script to use port 3001:

```bash
node scripts/test-api-3001.js
```

This will test against the correct port.

## Summary

✅ **Backend**: Working perfectly  
✅ **Database**: Connected  
✅ **API**: Responding correctly  
⚠️ **Port mismatch**: Server on 3001, frontend expects 3000  

**Choose one:**
- Kill port 3000 process and use default port 3000
- OR update frontend config for port 3001
- OR always force port 3000 in package.json

**For now, just access your app at:** `http://localhost:3001/login`
