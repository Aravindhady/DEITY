# Backend Testing Guide

## Issue: "Backend is not working and login API not responding"

### Current Status

✅ **Database**: Connected successfully  
✅ **Admin User**: Created in database  
✅ **Password Hash**: Valid and working  
⚠️ **Dev Server**: Need to verify it's running  

### Step-by-Step Testing

#### 1. Start Development Server

First, make sure your dev server is running:

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

**Keep this terminal running while testing.**

#### 2. Test Login API Directly

Open a NEW terminal and run:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@deity.com\",\"password\":\"admin123\"}"
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@deity.com",
    "role": "admin"
  }
}
```

**If you get an error:**
- `ECONNREFUSED`: Dev server is not running
- `404`: API route doesn't exist
- `500`: Server error (check terminal for details)

#### 3. Test from Browser

1. Open browser to: `http://localhost:3000/login`

2. Open Developer Tools (F12)

3. Go to Network tab

4. Try to login with:
   - Email: `admin@deity.com`
   - Password: `admin123`

5. Check the network request:
   - Look for `login` request
   - Check Request URL: `http://localhost:3000/api/auth/login`
   - Check Response status
   - Check Response payload

#### 4. Common Issues and Fixes

**Issue 1: Server Not Starting**

Error: `Port 3000 is in use`

Fix:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npx next dev -p 3001
```

**Issue 2: API Route Not Found (404)**

Check if the file exists:
```
app/api/auth/login/route.ts
```

Verify file structure:
```bash
ls app/api/auth/login/
```

Should show:
```
route.ts
```

**Issue 3: Database Connection Error**

Check `.env.local` has correct MongoDB URI:
```bash
cat .env.local | grep MONGODB_URI
```

Should show:
```
MONGODB_URI=mongodb+srv://aravind:Aravind123@cluster0.x2c1o.mongodb.net/dieti?retryWrites=true&w=majority
```

**Issue 4: CORS or Network Errors**

Add CORS headers if calling from different origin. Create middleware:

File: `middleware.ts`
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

#### 5. Verify All API Routes Exist

Run this to check all required API files:

```bash
# Windows PowerShell
Get-ChildItem -Recurse -Filter "route.ts" app/api/ | Select-Object FullName
```

Should include:
- `app\api\auth\login\route.ts`
- `app\api\auth\register\route.ts`
- `app\api\admin\stats\route.ts`
- `app\api\admin\products\route.ts`
- `app\api\admin\orders\route.ts`
- etc.

#### 6. Check for TypeScript Errors

Run TypeScript compiler to check for errors:

```bash
npx tsc --noEmit
```

Fix any errors before continuing.

#### 7. Clear Cache and Restart

Sometimes Next.js cache causes issues:

```bash
# Delete .next folder
Remove-Item -Recurse -Force .next

# Reinstall dependencies (if needed)
npm install

# Restart dev server
npm run dev
```

### Quick Diagnostic Script

Create a file `scripts/test-api.js`:

```javascript
async function testAPI() {
  try {
    console.log('Testing API endpoint...\n');
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@deity.com',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('\n✅ API is working!');
    } else {
      console.log('\n⚠️  API returned error:', data.error);
    }
  } catch (error) {
    console.error('✗ Error connecting to API:', error.message);
    console.log('\nMake sure dev server is running: npm run dev');
  }
}

testAPI();
```

Then run:
```bash
node scripts/test-api.js
```

### Expected Workflow

1. ✅ Start dev server: `npm run dev`
2. ✅ Server starts at `http://localhost:3000`
3. ✅ Navigate to login page
4. ✅ Enter credentials
5. ✅ Click login button
6. ✅ API receives POST request
7. ✅ Database validates user
8. ✅ JWT token generated
9. ✅ Token stored in cookie
10. ✅ User redirected to dashboard

### Debugging Tips

**In Terminal (Server-side):**
- Look for error messages
- Check for "Ready" message
- Watch for incoming requests

**In Browser (Client-side):**
- F12 → Console: Check for JavaScript errors
- F12 → Network: Check API requests/responses
- Check cookies are being set

**Common Frontend Issues:**
- Wrong API URL in frontend code
- Missing Content-Type header
- Not awaiting async operations
- Form not preventing default submission

### Still Not Working?

Provide these details when asking for help:

1. **Terminal output** when running `npm run dev`
2. **Browser console errors** (F12 → Console)
3. **Network tab errors** (F12 → Network)
4. **Error from test script**: `node scripts/test-api.js`
5. **What happens when you try to login** (specific error message)

---

**Next Steps:**
1. Start dev server: `npm run dev`
2. Run API test: `node scripts/test-api.js`
3. Try login in browser
4. Report any errors you see
