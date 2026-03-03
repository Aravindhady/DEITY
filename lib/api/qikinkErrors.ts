// lib/api/qikinkErrors.ts

export class QikinkApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = 'QikinkApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class QikinkNetworkError extends QikinkApiError {
  public readonly originalError: any;

  constructor(message: string, originalError: any) {
    super(message, 500, 'NETWORK_ERROR');
    this.name = 'QikinkNetworkError';
    this.originalError = originalError;
  }
}

export class QikinkAuthError extends QikinkApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTH_ERROR');
  }
}

export class QikinkRateLimitError extends QikinkApiError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class QikinkValidationError extends QikinkApiError {
  constructor(details: any, message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

// Error handling utility function
export const handleQikinkError = (error: any): QikinkApiError => {
  if (error instanceof QikinkApiError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new QikinkNetworkError('Network error occurred', error);
  }

  if (error.response) {
    // API responded with error status
    const { status, data } = error.response;
    const message = data?.message || `API error: ${status}`;
    const code = data?.code;

    switch (status) {
      case 401:
        return new QikinkAuthError(message);
      case 429:
        return new QikinkRateLimitError(message);
      case 400:
        return new QikinkValidationError(data?.details || data, message);
      default:
        return new QikinkApiError(message, status, code, data);
    }
  }

  // Network error or other unknown error
  return new QikinkApiError(
    error.message || 'An unknown error occurred',
    500,
    'UNKNOWN_ERROR'
  );
};