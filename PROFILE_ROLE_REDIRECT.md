# Profile Page - Role-Based Redirect ✅

## What Was Implemented

The `/profile` page now automatically redirects users based on their role:
- **Admin users** → Redirected to `/admin`
- **Regular users** → Stay on `/profile` (or can be redirected to `/`)

---

## How It Works

### Login Flow:

```
User logs in
    ↓
Check user role via /api/auth/me
    ↓
If Admin → Redirect to /admin
If User  → Show profile page
```

### Technical Implementation:

```typescript
useEffect(() => {
  const checkUserAndRedirect = async () => {
    // 1. Check if user is logged in
    const response = await fetch('/api/auth/me');
    
    if (!response.ok) {
      router.push('/login'); // Not logged in
      return;
    }

    const data = await response.json();
    const userData = data.user;
    
    // 2. Redirect based on role
    if (userData.role === 'admin') {
      router.push('/admin'); // Admin goes to admin dashboard
    } else {
      // Regular user stays on profile page
      // (Optional: uncomment router.push('/') to send to home)
    }
  };

  checkUserAndRedirect();
}, [router]);
```

---

## User Scenarios

### Scenario 1: Admin Logs In
```
1. Admin visits /profile
2. System checks role → "admin"
3. Automatically redirects to /admin
4. Admin sees dashboard with stats, products, orders, coupons
```

### Scenario 2: Regular User Logs In
```
1. User visits /profile
2. System checks role → "user"
3. Stays on /profile page
4. User sees their account info, order history, etc.
```

### Scenario 3: Not Logged In
```
1. Anyone visits /profile
2. System checks auth → Not authenticated
3. Redirects to /login
4. Must login first
```

---

## File Modified

### `app/profile/page.tsx`

#### Changes:
✅ Added role checking via API  
✅ Auto-redirect admin to `/admin`  
✅ Keep regular users on `/profile`  
✅ Handle loading state  
✅ Handle redirect state  
✅ Proper TypeScript null checks  

---

## Code Structure

### Main Logic:
```typescript
// 1. Check authentication and get user data
const response = await fetch('/api/auth/me');
const userData = data.user;

// 2. Check role
if (userData.role === 'admin') {
  router.push('/admin');
} else {
  // Regular user
}

// 3. Fallback redirect if admin ends up here somehow
useEffect(() => {
  const checkRole = async () => {
    const response = await fetch('/api/auth/me');
    if (response.ok) {
      const data = await response.json();
      if (data.user?.role === 'admin') {
        router.push('/admin');
      }
    }
  };
  checkRole();
}, [router]);
```

---

## Routes Summary

| Route | Who Sees It | What Happens |
|-------|-------------|--------------|
| `/profile` | Regular User | Shows profile page with account info |
| `/profile` | Admin | Auto-redirects to `/admin` |
| `/admin` | Admin | Shows admin dashboard |
| `/admin` | Regular User | Redirects to `/` (home) |
| `/` | Anyone | Home page (for regular users) |

---

## Benefits

### For Admins:
✅ Seamless experience - auto-redirected to dashboard  
✅ No manual navigation needed  
✅ Always land in the right place  

### For Regular Users:
✅ Can access their profile  
✅ See order history  
✅ Manage account settings  

### For Security:
✅ Role-based access control  
✅ Prevents unauthorized access  
✅ Clear separation of user types  

---

## Testing Scenarios

### Test 1: Admin Access
```
1. Login as admin@deity.com / admin123
2. Navigate to /profile
3. Should auto-redirect to /admin
4. See admin dashboard ✅
```

### Test 2: Regular User Access
```
1. Login as regular user
2. Navigate to /profile
3. Should stay on profile page
4. See account info ✅
```

### Test 3: Unauthenticated Access
```
1. Logout (or incognito mode)
2. Navigate to /profile
3. Should redirect to /login
4. Must login first ✅
```

---

## Additional Features

### Loading States:
```tsx
if (loading) {
  return <div>Loading...</div>;
}

if (redirecting) {
  return <div>Redirecting...</div>;
}
```

### Error Handling:
```tsx
try {
  // Check auth
} catch (error) {
  console.error('Error checking user:', error);
  router.push('/login');
}
```

---

## Optional Configuration

### Want regular users to go to home instead?

In `app/profile/page.tsx`, uncomment this line:

```typescript
if (userData.role === 'admin') {
  router.push('/admin');
} else {
  router.push('/'); // ← Uncomment this line
}
```

Now regular users will be redirected to home page (`/`) instead of staying on profile.

---

## Summary

✅ **Admin Login** → Auto-redirect to `/admin`  
✅ **User Login** → Stay on `/profile` (or redirect to `/`)  
✅ **Not Logged In** → Redirect to `/login`  
✅ **Role Checking** → Via secure API endpoint  
✅ **Seamless UX** → Automatic, no manual navigation  
✅ **Secure** → Prevents unauthorized access  

**Profile page now has smart role-based routing!** 🎉

---

## Quick Reference

### Files Changed:
- `app/profile/page.tsx` (+50 lines approximately)

### Key Functions:
- `checkUserAndRedirect()` - Main auth & role checker
- `checkRole()` - Fallback redirect for admins

### API Used:
- `GET /api/auth/me` - Get current user data with role

---

**Happy Managing! 👤🔐**
