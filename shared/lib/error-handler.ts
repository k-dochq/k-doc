/**
 * Convert database-related errors to user-friendly messages
 */
export function getDatabaseErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'An unknown error occurred. Please try again later.';
  }

  const errorMessage = error.message.toLowerCase();

  // Database connection errors
  if (errorMessage.includes('connection') || errorMessage.includes('connect')) {
    return 'Database connection failed. Please try again later.';
  }

  // Timeout errors
  if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
    return 'Request timeout. Please try again later.';
  }

  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'Network connection issue. Please check your internet connection.';
  }

  // Permission errors
  if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
    return 'Access denied. Please contact administrator.';
  }

  // Data not found errors
  if (errorMessage.includes('not found') || errorMessage.includes('no data')) {
    return 'Requested data not found.';
  }

  // Duplicate data errors
  if (errorMessage.includes('duplicate') || errorMessage.includes('unique')) {
    return 'Data already exists.';
  }

  // Prisma-related errors
  if (errorMessage.includes('prisma')) {
    return 'Database processing error. Please try again later.';
  }

  // Default error message
  return `Error occurred while loading data: ${error.message}`;
}

/**
 * Helper function for error logging
 */
export function logDatabaseError(error: unknown, context: string): void {
  console.error(`[${context}] Database error:`, error);

  // Send to external logging service in production
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, DataDog, etc.
    // Example: Sentry.captureException(error, { tags: { context } });
  }
}

/**
 * Safely handle errors and return user-friendly messages
 */
export function handleDatabaseError(error: unknown, context: string): Error {
  logDatabaseError(error, context);
  const userMessage = getDatabaseErrorMessage(error);
  return new Error(userMessage);
}
