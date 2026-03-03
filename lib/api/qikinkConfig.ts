// lib/api/qikinkConfig.ts
export const QIKINK_CONFIG = {
  baseURL: process.env.QIKINK_BASE_URL || 'https://api.qikink.com',
  apiKey: process.env.QIKINK_API_KEY || 'DUMMY_API_KEY',
  apiSecret: process.env.QIKINK_API_SECRET || 'DUMMY_API_SECRET',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.QIKINK_API_KEY || 'DUMMY_API_KEY',
    'Authorization': `Bearer ${process.env.QIKINK_API_SECRET || 'DUMMY_API_SECRET'}`,
  },
};

export type QikinkConfigType = typeof QIKINK_CONFIG;