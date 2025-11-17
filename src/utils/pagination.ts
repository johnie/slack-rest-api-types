import type { WebAPICallResult } from '@slack/web-api';

/**
 * Type for responses that support cursor-based pagination.
 */
export type CursorPaginatedResponse = WebAPICallResult & {
  response_metadata?: {
    next_cursor?: string;
  };
};

/**
 * Type for responses that support offset-based pagination (legacy).
 */
export type OffsetPaginatedResponse = WebAPICallResult & {
  paging?: {
    count: number;
    total: number;
    page: number;
    pages: number;
  };
};

/**
 * Checks if a response has more pages available (cursor-based pagination).
 *
 * @param response - The API response to check
 * @returns True if there is a next_cursor and it's not empty
 *
 * @example
 * ```typescript
 * const response = await client.conversations.list({ limit: 100 });
 *
 * if (hasNextPage(response)) {
 *   const nextResponse = await client.conversations.list({
 *     limit: 100,
 *     cursor: extractCursor(response)
 *   });
 * }
 * ```
 */
export function hasNextPage(response: CursorPaginatedResponse): boolean {
  return !!(
    response.response_metadata?.next_cursor &&
    response.response_metadata.next_cursor.length > 0
  );
}

/**
 * Extracts the cursor from a paginated response.
 *
 * @param response - The API response containing pagination data
 * @returns The next cursor string, or undefined if not available
 *
 * @example
 * ```typescript
 * const response = await client.users.list({ limit: 100 });
 * const cursor = extractCursor(response);
 *
 * if (cursor) {
 *   const nextResponse = await client.users.list({ limit: 100, cursor });
 * }
 * ```
 */
export function extractCursor(
  response: CursorPaginatedResponse,
): string | undefined {
  return response.response_metadata?.next_cursor;
}

/**
 * Type guard to check if a response uses cursor-based pagination.
 *
 * @param response - The API response to check
 * @returns True if the response has response_metadata with cursor support
 *
 * @example
 * ```typescript
 * const response = await client.conversations.list();
 *
 * if (hasCursor(response)) {
 *   console.log('Supports cursor pagination');
 * }
 * ```
 */
export function hasCursor(
  response: WebAPICallResult,
): response is CursorPaginatedResponse {
  return 'response_metadata' in response;
}

/**
 * Checks if there are more pages in an offset-based paginated response.
 *
 * @param response - The API response to check
 * @returns True if the current page is less than total pages
 *
 * @example
 * ```typescript
 * const response = await client.files.list({ count: 20, page: 1 });
 *
 * if (hasMorePages(response)) {
 *   const nextResponse = await client.files.list({ count: 20, page: 2 });
 * }
 * ```
 */
export function hasMorePages(response: OffsetPaginatedResponse): boolean {
  if (!response.paging) return false;
  return response.paging.page < response.paging.pages;
}

/**
 * Type guard to check if a response uses offset-based pagination.
 *
 * @param response - The API response to check
 * @returns True if the response has paging metadata
 *
 * @example
 * ```typescript
 * const response = await client.files.list();
 *
 * if (hasOffsetPaging(response)) {
 *   console.log('Supports offset pagination');
 * }
 * ```
 */
export function hasOffsetPaging(
  response: WebAPICallResult,
): response is OffsetPaginatedResponse {
  return 'paging' in response;
}

/**
 * Gets the total number of items across all pages (offset-based pagination).
 *
 * @param response - The API response with paging data
 * @returns The total count, or undefined if not available
 *
 * @example
 * ```typescript
 * const response = await client.files.list();
 * const total = getTotalCount(response);
 *
 * console.log(`Total files: ${total}`);
 * ```
 */
export function getTotalCount(
  response: OffsetPaginatedResponse,
): number | undefined {
  return response.paging?.total;
}
