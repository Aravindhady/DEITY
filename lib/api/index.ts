// lib/api/index.ts
// Main entry point for API services

export { qikinkService, default as QikinkService } from './qikinkService';
export { QIKINK_CONFIG } from './qikinkConfig';
export type { QikinkConfigType } from './qikinkConfig';

// Export error classes
export {
  QikinkApiError,
  QikinkNetworkError,
  QikinkAuthError,
  QikinkRateLimitError,
  QikinkValidationError,
  handleQikinkError
} from './qikinkErrors';

// Export types
export type {
  // Base types
  QikinkBaseResponse,
  QikinkPaginatedResponse,

  // Entity types
  QikinkProduct,
  QikinkProductVariant,
  QikinkOrder,
  QikinkOrderItem,
  QikinkAddress,
  QikinkCustomer,
  QikinkInventory,
  QikinkCoupon,

  // Request/Response types
  QikinkCreateOrderRequest,
  QikinkCreateOrderResponse,
  QikinkGetProductResponse,
  QikinkGetProductsResponse,
  QikinkGetOrderResponse,
  QikinkGetCustomerResponse,
  QikinkCreateCustomerRequest,
  QikinkCreateCustomerResponse,
} from '../../types/qikink';