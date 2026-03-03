// lib/api/qikinkService.ts
import { QIKINK_CONFIG } from './qikinkConfig';
import { 
  handleQikinkError, 
  QikinkApiError,
  QikinkNetworkError
} from './qikinkErrors';
import { 
  QikinkProduct, 
  QikinkOrder, 
  QikinkCustomer, 
  QikinkCoupon,
  QikinkGetProductsResponse,
  QikinkGetProductResponse,
  QikinkCreateOrderRequest,
  QikinkCreateOrderResponse,
  QikinkGetOrderResponse,
  QikinkGetCustomerResponse,
  QikinkCreateCustomerRequest,
  QikinkCreateCustomerResponse,
  QikinkBaseResponse
} from '../../types/qikink';

class QikinkService {
  private baseUrl: string;
  private apiKey: string;
  private apiSecret: string;
  private timeout: number;

  constructor() {
    this.baseUrl = QIKINK_CONFIG.baseURL;
    this.apiKey = QIKINK_CONFIG.apiKey;
    this.apiSecret = QIKINK_CONFIG.apiSecret;
    this.timeout = QIKINK_CONFIG.timeout;
  }

  /**
   * Private method to make API requests to Qikink
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'Authorization': `Bearer ${this.apiSecret}`,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Set timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // If response is not JSON, use status text
          errorData = { 
            error: response.statusText, 
            status: response.status 
          };
        }

        throw new QikinkApiError(
          errorData.message || `HTTP error! Status: ${response.status}`,
          response.status,
          errorData.code,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof QikinkApiError) {
        throw error;
      }

      if ((error as any).name === 'AbortError') {
        throw new QikinkApiError('Request timeout', 408, 'TIMEOUT_ERROR');
      }

      throw handleQikinkError(error);
    }
  }

  /**
   * Product-related methods
   */

  async getProducts(
    params?: { 
      page?: number; 
      limit?: number; 
      category?: string; 
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<QikinkGetProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

    return this.makeRequest<QikinkGetProductsResponse>(endpoint);
  }

  async getProduct(productId: string): Promise<QikinkGetProductResponse> {
    return this.makeRequest<QikinkGetProductResponse>(`/products/${productId}`);
  }

  /**
   * Order-related methods
   */

  async createOrder(orderData: QikinkCreateOrderRequest): Promise<QikinkCreateOrderResponse> {
    return this.makeRequest<QikinkCreateOrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId: string): Promise<QikinkGetOrderResponse> {
    return this.makeRequest<QikinkGetOrderResponse>(`/orders/${orderId}`);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<QikinkBaseResponse> {
    return this.makeRequest<QikinkBaseResponse>(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Customer-related methods
   */

  async createCustomer(customerData: QikinkCreateCustomerRequest): Promise<QikinkCreateCustomerResponse> {
    return this.makeRequest<QikinkCreateCustomerResponse>('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  async getCustomer(customerId: string): Promise<QikinkGetCustomerResponse> {
    return this.makeRequest<QikinkGetCustomerResponse>(`/customers/${customerId}`);
  }

  async updateCustomer(customerId: string, customerData: Partial<QikinkCreateCustomerRequest>): Promise<QikinkBaseResponse> {
    return this.makeRequest<QikinkBaseResponse>(`/customers/${customerId}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    });
  }

  /**
   * Coupon-related methods
   */

  async getCoupon(code: string): Promise<{ data: QikinkCoupon } & QikinkBaseResponse> {
    return this.makeRequest<{ data: QikinkCoupon } & QikinkBaseResponse>(`/coupons/${code}`);
  }

  async validateCoupon(
    code: string, 
    customerId?: string, 
    cartTotal?: number
  ): Promise<{ isValid: boolean; discountAmount: number; message?: string } & QikinkBaseResponse> {
    return this.makeRequest<{ isValid: boolean; discountAmount: number; message?: string } & QikinkBaseResponse>('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, customerId, cartTotal }),
    });
  }

  /**
   * Inventory-related methods
   */

  async checkInventory(productId: string, variantId?: string): Promise<{ available: boolean; quantity: number }> {
    const endpoint = variantId 
      ? `/inventory/${productId}/variants/${variantId}`
      : `/inventory/${productId}`;
    
    return this.makeRequest<{ available: boolean; quantity: number }>(endpoint);
  }

  /**
   * Health check method
   */

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const qikinkService = new QikinkService();

// Export the class for potential instantiation elsewhere if needed
export default QikinkService;