# Deity E-commerce Platform - User Manual

Welcome to the Deity E-commerce Platform! This manual provides detailed instructions for both administrators and regular users on how to navigate and use the platform effectively.

## Table of Contents
1. [Getting Started](#getting-started)
2. [User Role Guide](#user-role-guide)
3. [Admin Role Guide](#admin-role-guide)
4. [Troubleshooting](#troubleshooting)
5. [FAQ](#faq)

---

## Getting Started

### Accessing the Platform
- Visit the website at [your-domain.com]
- Register for a new account or log in with existing credentials
- The platform offers two primary roles: Regular User and Administrator

---

## User Role Guide

### Registration and Account Creation
1. Navigate to the **Signup** page
2. Fill in required information:
   - Name
   - Email address
   - Password (minimum 8 characters)
   - Phone number (optional)
3. Click **Create Account**
4. Verify your email if required
5. Your account will be created with the 'user' role by default

### Browsing Products
- **Home Page**: View featured products, new arrivals, and promotions
- **Collections**: Browse by category (Men's, Women's, Accessories, Unisex)
- **Search**: Use the search bar to find specific products
- **Filters**: Filter products by category, price, and availability

### Product Details
1. Click on any product to view detailed information
2. Product details include:
   - High-resolution images
   - Description
   - Price and compare-at price (if applicable)
   - Available sizes and colors
   - Stock availability
   - Customer reviews and ratings
   - Related products

### Adding Products to Cart
1. Select desired size and color
2. Choose quantity (maximum based on available stock)
3. Click **Add to Cart**
4. Cart drawer will open automatically
5. Continue shopping or proceed to checkout

### Managing Your Cart
- View cart by clicking the cart icon in the header
- Adjust quantities or remove items
- See updated totals in real-time
- Proceed to checkout when ready

### Checkout Process
1. Click **Proceed to Checkout**
2. Enter or confirm shipping address
3. Select shipping method
4. Review order summary
5. Select payment method (credit card via Stripe)
6. Review and confirm order
7. Receive order confirmation email

### User Profile Management
#### Viewing Profile
- Click on your name/email in the header to access your profile
- View personal information, order history, and saved addresses

#### Editing Profile
1. Navigate to **Profile** → **Edit Profile**
2. Update information as needed:
   - Name
   - Email
   - Phone number
   - Saved addresses
3. Save changes

#### Managing Addresses
- Add multiple addresses for shipping convenience
- Mark one address as default
- Edit or delete existing addresses

#### Order History
- View all past orders
- Track order status (pending, processing, shipped, delivered, cancelled)
- View order details including items, prices, and shipping information
- Print receipts if needed

### Discounts and Coupons
- View available discounts on the **Discounts** page
- Apply coupon codes during checkout if available
- Some coupons may have minimum purchase requirements or expiration dates

---

## Admin Role Guide

### Accessing Admin Dashboard
1. Log in with an account that has 'admin' role
2. Navigate to **/admin** or click the Admin link if available
3. The dashboard will display with four main sections

### Admin Dashboard Overview
The admin dashboard contains four main tabs:
- **Statistics**: Business metrics and analytics
- **Products**: Product management
- **Orders**: Order management
- **Coupons**: Discount code management

### Statistics Tab
Provides comprehensive business analytics:
- **Total Revenue**: Overall sales figures
- **Profit**: Calculated profit based on costs
- **Profit Margin**: Percentage profitability
- **Total Orders**: Number of orders processed
- **Paid Orders**: Successfully completed transactions
- **Pending Orders**: Orders awaiting processing
- **Total Products**: Count of active products
- **Low Stock Items**: Products with less than 10 units in stock
- **Total Users**: Registered user count

Visual charts show revenue breakdown:
- Revenue vs. Cost comparison
- Profit visualization
- Performance trends

### Product Management
#### Viewing Products
- All products displayed in a table format
- Columns: Product image/name, category, price, stock level, actions
- Low stock items highlighted in red
- Pagination for large inventories

#### Adding New Products
1. Click **Add Product** button
2. Fill in product details:
   - **Basic Information**:
     - Product name
     - Description
     - Price and compare-at price
     - Category (men's, women's, accessories, unisex)
     - Subcategory
     - SKU (Stock Keeping Unit)
     - Current stock level
   - **Media**: Upload product images (multiple allowed)
   - **Attributes**:
     - Tags for searchability
     - Collections for grouping
     - Sizes with individual stock counts
     - Colors with name and hex code
   - **Flags**: Mark as new arrival, limited edition, exclusive, or best seller
3. Click **Create Product**
4. Success message confirms addition

#### Editing Products
1. From the product list, click the **Edit** icon (pencil) for the desired product
2. Modify any product details as needed
3. Click **Update Product** to save changes
4. Changes are reflected immediately on the live site

#### Deleting Products
1. From the product list, click the **Delete** icon (trash can) for the desired product
2. Confirm deletion when prompted
3. Product is permanently removed from inventory and store
4. Warning: This action cannot be undone

### Order Management
#### Viewing Orders
- All orders displayed in chronological order (newest first)
- Columns: Order number, customer info, items count, total amount, status, date
- Customers can be identified by name and email

#### Updating Order Status
1. Locate the order in the table
2. Use the dropdown menu in the Status column to select new status:
   - **Pending**: Initial order state
   - **Processing**: Order being prepared
   - **Shipped**: Order dispatched
   - **Delivered**: Order received by customer
   - **Cancelled**: Order cancelled
3. Changes update in real-time
4. Customers receive notifications for status changes

### Coupon Management
#### Viewing Coupons
- All discount codes displayed in table format
- Columns: Code, type, value, expiration date, usage statistics, status, actions
- Types: Percentage off or fixed amount discount
- Usage shows how many times used vs. limit

#### Adding New Coupons
1. Click **Add Coupon** button
2. Fill in coupon details:
   - Unique code
   - Type (percentage or fixed amount)
   - Discount value
   - Validity period (start and end dates)
   - Usage limits (optional)
3. Save the new coupon
4. Coupon becomes active immediately

#### Deleting Coupons
1. Click the **Delete** icon for the coupon to remove
2. Confirm deletion when prompted
3. Coupon is deactivated and unavailable for use
4. Warning: This action cannot be undone

---

## Troubleshooting

### Common Issues for Users
**Issue**: Cannot log in
- Solution: Check email and password. Reset password if needed.

**Issue**: Items not showing in cart
- Solution: Ensure JavaScript is enabled and try refreshing the page.

**Issue**: Payment declined
- Solution: Verify payment information and contact your bank if issues persist.

**Issue**: Forgot password
- Solution: Use the "Forgot Password" link to reset your password via email.

### Common Issues for Admins
**Issue**: Cannot access admin panel
- Solution: Verify your account has 'admin' role. Contact system administrator if needed.

**Issue**: Product images not uploading
- Solution: Ensure images meet size requirements and format (JPEG, PNG).

**Issue**: Sales data not updating
- Solution: Data updates in real-time; refresh the page if needed.

---

## FAQ

### For Users
**Q: How do I change my shipping address?**
A: Go to Profile → Edit Profile → Manage Addresses to add or update addresses.

**Q: Can I cancel an order after placing it?**
A: Yes, if the order status is still "Pending". Contact customer service for assistance.

**Q: How do I track my order?**
A: Visit Profile → Order History to view the status of all your orders.

### For Admins
**Q: How do I add a new admin user?**
A: Currently, admin users must be created directly in the database with the role set to "admin".

**Q: What does the profit calculation assume?**
A: The system assumes a 40% cost ratio by default, which can be adjusted in the backend.

**Q: Can I export sales data?**
A: Data is displayed in the Statistics tab; direct export functionality is not currently available.

**Q: How do I know when inventory is low?**
A: The dashboard highlights products with fewer than 10 items in stock.

---

## Support

For additional assistance:
- Email: support@deity.com
- Live Chat: Available on the website during business hours
- Knowledge Base: Coming soon

For technical issues or feature requests, contact your system administrator.