# Coupon System - Quick Start Guide

## ✅ What's Been Implemented

### Backend (APIs)
- ✅ **GET /api/admin/coupons** - Fetch all coupons with usage stats
- ✅ **POST /api/admin/coupons** - Create new coupon
- ✅ **PUT /api/admin/coupons/[id]** - Update existing coupon
- ✅ **DELETE /api/admin/coupons/[id]** - Delete coupon
- ✅ **POST /api/coupons/validate** - User applies coupon at checkout
- ✅ **PUT /api/coupons/validate** - Record coupon usage after purchase

### Frontend (UI)
- ✅ **Admin Dashboard → Coupons Tab** - Full coupon management interface
  - Create/Edit/Delete coupons
  - View usage statistics
  - Progress bars showing usage %
  - Status indicators (Active/Scheduled/Expired)

### Database
- ✅ Updated **Coupon Model** with:
  - `minPurchase` - Minimum order amount required
  - `maxDiscount` - Maximum discount cap for percentage coupons
  - `usageLimit` - Total times coupon can be used
  - `usedCount` - Current usage count
  - `usedBy[]` - Array tracking who used the coupon

---

## 🚀 How to Create Your First Coupon

### Step 1: Login as Admin
```
1. Go to http://localhost:3001/login
2. Email: admin@deity.com
3. Password: admin123
4. Click "Login"
```

### Step 2: Navigate to Coupons
```
1. After login, go to /admin
2. Click on "Coupons" tab
3. You'll see the coupon management interface
```

### Step 3: Create a Test Coupon

Click **"Add Coupon"** and fill in:

**Example: 25% OFF Summer Sale**
```
Coupon Code: SUMMER25
Discount Type: Percentage
Discount Value: 25
Description: Summer Sale 2026 - 25% Off
Minimum Purchase: 1000
Maximum Discount: 500
Valid From: [Today's Date]
Valid Until: [Date 3 months from now]
Usage Limit: 100
☑ Active Coupon
```

Then click **"Create Coupon"**

### Step 4: Verify Coupon Created

You should see your coupon in the table:
- **Code**: SUMMER25 (in green)
- **Type**: Percentage badge
- **Value**: 25% (Max: ₹500)
- **Min Purchase**: ₹1000
- **Valid Period**: Date range
- **Usage**: 0 / 100 (with progress bar)
- **Status**: Active (green badge)

---

## 🛒 How Customers Use Coupons

### At Checkout:

1. Customer adds items to cart (e.g., ₹2000 total)
2. Goes to `/checkout`
3. Enters coupon code: `SUMMER25`
4. Clicks "Apply"
5. System validates:
   - ✓ Is code valid? Yes
   - ✓ Is order ≥ ₹1000? Yes (₹2000)
   - ✓ Not expired? Yes
   - ✓ Usage available? Yes (0/100)
6. Calculates discount: 25% of ₹2000 = ₹500 (capped at max)
7. New total: ₹2000 - ₹500 = **₹1500**
8. Customer completes purchase

---

## 📊 Key Features Explained

### 1. Minimum Purchase Limit
**Use Case**: Protect profit margins

**Example**:
```
Min Purchase: ₹1000
Order Amount: ₹800
Result: ❌ Error "Minimum purchase of ₹1000 required"

Order Amount: ₹1200
Result: ✓ Coupon works
```

### 2. Maximum Discount Cap
**Use Case**: Prevent excessive discounts on large orders

**Example**:
```
Coupon: 50% OFF, Max ₹500
Order: ₹2000
Calculation: 50% of 2000 = ₹1000
Applied: ₹500 (capped at max)
Final: ₹1500
```

### 3. Usage Limit
**Use Case**: Create scarcity and control costs

**Example**:
```
Usage Limit: 100
Used Count: 95
Remaining: 5 uses

When 100th user redeems:
Next users see: "Coupon usage limit reached"
```

### 4. Date Scheduling
**Use Case**: Plan promotions in advance

**Example**:
```
Valid From: January 1, 2026
Valid Until: March 31, 2026

Before Jan 1: Shows as "Scheduled"
Jan 1 - Mar 31: Shows as "Active"
After Mar 31: Shows as "Expired"
```

---

## 🎯 Common Coupon Strategies

### Strategy 1: New Customer Welcome
```
Code: WELCOME20
Type: Percentage
Value: 20%
Min Purchase: ₹500
Max Discount: ₹300
Usage Limit: 1000
Valid: Ongoing
Goal: Acquire new customers
```

### Strategy 2: High-Value Order Booster
```
Code: BIG500
Type: Fixed
Value: ₹500
Min Purchase: ₹3000
Usage Limit: 50
Valid: 1 month
Goal: Increase average order value
```

### Strategy 3: Flash Sale
```
Code: FLASH70
Type: Percentage
Value: 70%
Min Purchase: ₹2000
Max Discount: ₹1500
Usage Limit: 20
Valid: 24 hours only
Goal: Create urgency and buzz
```

### Strategy 4: Clear Inventory
```
Code: CLEAR30
Type: Percentage
Value: 30%
Min Purchase: None
Max Discount: ₹400
Usage Limit: Unlimited
Valid: Until stock lasts
Goal: Move old inventory
```

---

## 🔧 Testing Your Coupon System

### Test Scenarios:

**Test 1: Valid Coupon Application**
```
1. Add products worth ₹1500 to cart
2. Go to checkout
3. Apply code: SUMMER25
4. Expected: ₹500 discount (25% capped at max)
5. Final amount: ₹1000
```

**Test 2: Below Minimum Purchase**
```
1. Add products worth ₹800 to cart
2. Apply code: SUMMER25 (Min: ₹1000)
3. Expected: Error message
4. Message: "Minimum purchase of ₹1000 required"
```

**Test 3: Expired Coupon**
```
1. Set coupon validUntil to yesterday
2. Try to apply at checkout
3. Expected: Error
4. Message: "Coupon has expired"
```

**Test 4: Usage Limit Reached**
```
1. Set usageLimit to 5
2. Use coupon 5 times (via different test orders)
3. 6th attempt should fail
4. Message: "Coupon usage limit reached"
```

---

## 📱 Admin Dashboard Features

### What You Can Do:

1. **View All Coupons**
   - See complete list with stats
   - Filter by status (active/expired)
   - Check usage percentages

2. **Create Coupons**
   - Simple form interface
   - Real-time validation
   - Auto-uppercase codes

3. **Edit Coupons**
   - Click edit button
   - Modify any field
   - Save changes instantly

4. **Delete Coupons**
   - One-click deletion
   - Confirmation dialog
   - Immediate removal

5. **Monitor Usage**
   - See how many times used
   - Track which users redeemed
   - View order amounts and discounts

---

## 🎨 UI Features

### Table Display:
- **Color-coded badges** for types and status
- **Progress bars** showing usage %
- **Date ranges** with expiry warnings
- **Action buttons** for edit/delete

### Form Features:
- **Date pickers** for validity periods
- **Number inputs** with min/max validation
- **Dropdown** for discount type
- **Checkbox** for active status
- **Tooltips** explaining fields

### Smart Validation:
- Can't set end date before start date
- Percentage must be 0-100
- Required fields enforced
- Duplicate codes prevented

---

## 💡 Pro Tips

### For Better Results:

1. **Always Set Minimum Purchase**
   - Protects your profit margins
   - Encourages larger orders
   - Recommended: 1.5x your average order value

2. **Use Maximum Discount Caps**
   - Essential for percentage discounts
   - Prevents accidental huge discounts
   - Set at 20-30% of average order value

3. **Track Usage Religiously**
   - Monitor which coupons perform best
   - Adjust limits based on demand
   - Kill underperforming coupons

4. **Create Urgency**
   - Short validity periods (1-4 weeks)
   - Limited usage counts
   - Flash sales work well

5. **Test Before Launch**
   - Create small test coupon first
   - Verify calculations are correct
   - Test edge cases (minimum purchase, etc.)

---

## ⚠️ Important Notes

### Remember:

1. **Codes are Case-Insensitive**
   - `SUMMER25` = `summer25` = `Summer25`
   - System auto-converts to uppercase

2. **Can't Edit Code After Creation**
   - Code field is disabled in edit mode
   - Create new coupon if you need different code

3. **Usage Tracking is Automatic**
   - Every redemption recorded in database
   - UsedBy array stores full history
   - Can trace back to specific orders

4. **Validation Happens in Real-Time**
   - Instant feedback at checkout
   - No manual approval needed
   - System enforces all rules automatically

---

## 🆘 Troubleshooting

### Issue: Can't Create Coupon
**Solution**: Check all required fields:
- Code (not empty)
- Type selected
- Value entered
- Both dates set

### Issue: Coupon Not Working at Checkout
**Check**:
- Is coupon active?
- Is order amount ≥ minimum purchase?
- Has usage limit been reached?
- Is coupon not expired?
- Is code spelled correctly?

### Issue: Wrong Discount Amount
**Verify**:
- For percentage: (order × value) / 100
- For fixed: value amount
- Check if maxDiscount cap applied
- Ensure discount ≤ order amount

---

## 📈 Next Steps

Your coupon system is fully functional! Now you can:

1. ✅ Create unlimited coupons
2. ✅ Set custom rules and limits
3. ✅ Track usage and performance
4. ✅ Manage from admin dashboard
5. ✅ Customers can apply at checkout

**Ready to launch your first promotion!** 🚀

---

## Files Modified/Created

### Backend APIs:
- `models/Coupon.ts` - Updated schema
- `app/api/admin/coupons/route.ts` - GET/POST endpoints
- `app/api/admin/coupons/[id]/route.ts` - PUT/DELETE endpoints
- `app/api/coupons/validate/route.ts` - User validation endpoint

### Frontend UI:
- `app/components/admin/AdminCoupons.tsx` - Complete coupon management interface

### Documentation:
- `COUPON_SYSTEM_GUIDE.md` - Comprehensive guide
- `QUICK_START_COUPONS.md` - This file

---

**Happy Selling! 💰**
