# Qikink API Integration

This directory contains the complete integration for the Qikink API, providing a clean service layer architecture with proper error handling and type safety.

## Files Structure

- `qikinkConfig.ts` - Centralized configuration for Qikink API
- `qikinkService.ts` - Main service class with all API methods
- `qikinkErrors.ts` - Error handling utilities and custom error classes
- `index.ts` - Main export file for easy imports
- `qikinkTest.ts` - Test functions demonstrating usage

## Getting Started

### Environment Variables

The integration uses the following environment variables:

```env
QIKINK_BASE_URL=https://api.qikink.com
QIKINK_API_KEY=DUMMY_API_KEY
QIKINK_API_SECRET=DUMMY_API_SECRET
```

These are already added to `.env.example`. Copy them to your `.env` file and update with real credentials when ready for production.

### Import and Usage

```typescript
import { qikinkService } from '@/lib/api';

// Example: Get products
try {
  const response = await qikinkService.getProducts({ limit: 10 });
  console.log(response.data); // Array of products
} catch (error) {
  console.error('Error fetching products:', error);
}
```

## Available Methods

### Products
- `getProducts(params)` - Get paginated list of products
- `getProduct(productId)` - Get a specific product

### Orders
- `createOrder(orderData)` - Create a new order
- `getOrder(orderId)` - Get a specific order
- `updateOrderStatus(orderId, status)` - Update order status

### Customers
- `createCustomer(customerData)` - Create a new customer
- `getCustomer(customerId)` - Get a specific customer
- `updateCustomer(customerId, customerData)` - Update customer details

### Coupons
- `getCoupon(code)` - Get coupon details
- `validateCoupon(code, customerId?, cartTotal?)` - Validate a coupon

### Inventory
- `checkInventory(productId, variantId?)` - Check inventory availability

### Health Check
- `healthCheck()` - Check API connectivity

## Error Handling

The integration provides custom error classes:

- `QikinkApiError` - Base API error
- `QikinkNetworkError` - Network-related errors
- `QikinkAuthError` - Authentication errors
- `QikinkRateLimitError` - Rate limiting errors
- `QikinkValidationError` - Validation errors

## Types

All API responses are fully typed using the interfaces defined in `types/qikink.ts`.

## Production Ready

The integration is designed to be production-ready:
- Centralized configuration
- Proper error handling
- Type safety
- Timeout handling
- Clean separation of concerns

To switch to production credentials, simply update the environment variables in your deployment environment.