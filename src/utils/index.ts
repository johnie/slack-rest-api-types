/**
 * Runtime utility functions for working with Slack API types.
 *
 * This module provides helper functions for:
 * - Type guards for response validation
 * - Pagination handling (cursor and offset-based)
 * - Block Kit validation
 *
 * @module utils
 *
 * @example
 * ```typescript
 * import { isSuccessResponse, hasNextPage, isKnownBlock } from 'slack-rest-api-types/utils';
 *
 * const response = await makeSlackAPICall();
 * if (isSuccessResponse(response)) {
 *   console.log('Success!');
 * }
 * ```
 */

export * from './blocks';
export * from './guards';
export * from './pagination';
