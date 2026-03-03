// LocalStorage cache utilities for admin dashboard

const CACHE_PREFIX = 'deity_admin_cache_';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Get cached data from localStorage
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export function getCachedData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) {
      return null;
    }

    const cacheData: CacheData<T> = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is expired
    if (now - cacheData.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cacheData.data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

/**
 * Save data to localStorage cache
 * @param key - Cache key
 * @param data - Data to cache
 */
export function setCachedData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

/**
 * Clear all admin cache
 */
export function clearAdminCache(): void {
  if (typeof window === 'undefined') return;
  
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Remove specific cache item
 * @param key - Cache key
 */
export function removeCachedItem(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheKey = `${CACHE_PREFIX}${key}`;
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.error('Error removing cache:', error);
  }
}
