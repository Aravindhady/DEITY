// lib/api/qikinkTest.ts
// Test file to demonstrate Qikink API integration

import { qikinkService } from './qikinkService';

// Test function to demonstrate API usage
export async function testQikinkIntegration() {
  console.log('Testing Qikink API Integration...');
  
  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await qikinkService.healthCheck();
    console.log('Health check result:', health);
    
    // Test getting products
    console.log('2. Testing get products...');
    const products = await qikinkService.getProducts({ limit: 5 });
    console.log('Products retrieved:', products.data.length);
    
    // If we have products, try getting a specific one
    if (products.data && products.data.length > 0) {
      console.log('3. Testing get specific product...');
      const product = await qikinkService.getProduct(products.data[0].id);
      console.log('Product retrieved:', product.data.name);
    }
    
    console.log('Qikink API integration test completed successfully!');
  } catch (error) {
    console.error('Error during Qikink API test:', error);
    throw error;
  }
}

// Example function showing how to handle errors
export async function exampleWithErrorHandling() {
  try {
    const products = await qikinkService.getProducts({ limit: 5 });
    return products;
  } catch (error) {
    // Properly handle Qikink API errors
    if (error instanceof Error) {
      console.error(`API Error: ${error.message}`);
      if ('status' in error) {
        console.error(`Status Code: ${(error as any).status}`);
      }
    }
    throw error;
  }
}