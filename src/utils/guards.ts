import type { WebAPICallResult } from '@slack/web-api';

/**
 * Type guard to check if a Slack API response is successful.
 *
 * @param response - The API response to check
 * @returns True if the response has ok: true, false otherwise
 *
 * @example
 * ```typescript
 * const response = await client.chat.postMessage({ channel: 'C123', text: 'Hello' });
 *
 * if (isSuccessResponse(response)) {
 *   console.log('Message posted:', response.ts);
 * } else {
 *   console.error('Error:', response.error);
 * }
 * ```
 */
export function isSuccessResponse<T extends WebAPICallResult>(
  response: T,
): response is T & { ok: true } {
  return response.ok === true;
}

/**
 * Type guard to check if a Slack API response is an error.
 *
 * @param response - The API response to check
 * @returns True if the response has ok: false, false otherwise
 *
 * @example
 * ```typescript
 * const response = await client.chat.postMessage({ channel: 'C123', text: 'Hello' });
 *
 * if (isErrorResponse(response)) {
 *   console.error('API Error:', response.error);
 * }
 * ```
 */
export function isErrorResponse<T extends WebAPICallResult>(
  response: T,
): response is T & { ok: false; error: string } {
  return response.ok === false;
}

/**
 * Type guard to check if a response indicates rate limiting.
 *
 * @param response - The API response to check
 * @returns True if the response indicates rate limiting
 *
 * @example
 * ```typescript
 * const response = await client.chat.postMessage({ channel: 'C123', text: 'Hello' });
 *
 * if (isRateLimited(response)) {
 *   console.log('Rate limited. Please retry later.');
 * }
 * ```
 */
export function isRateLimited<T extends WebAPICallResult>(
  response: T,
): response is T & { ok: false; error: 'rate_limited' } {
  return response.ok === false && response.error === 'rate_limited';
}

/**
 * Type guard to check if a response indicates missing permissions/scopes.
 *
 * @param response - The API response to check
 * @returns True if the response indicates missing scope
 *
 * @example
 * ```typescript
 * const response = await client.chat.postMessage({ channel: 'C123', text: 'Hello' });
 *
 * if (isMissingScope(response)) {
 *   console.error('Missing required scope:', response.needed);
 * }
 * ```
 */
export function isMissingScope<T extends WebAPICallResult>(
  response: T,
): response is T & { ok: false; error: 'missing_scope'; needed?: string } {
  return response.ok === false && response.error === 'missing_scope';
}

/**
 * Type guard to check if a response indicates invalid authentication.
 *
 * @param response - The API response to check
 * @returns True if the response indicates authentication failure
 *
 * @example
 * ```typescript
 * const response = await client.auth.test();
 *
 * if (isAuthError(response)) {
 *   console.error('Authentication failed');
 * }
 * ```
 */
export function isAuthError<T extends WebAPICallResult>(
  response: T,
): response is T & { ok: false; error: string } {
  if (response.ok === false && response.error) {
    const authErrors = [
      'invalid_auth',
      'not_authed',
      'account_inactive',
      'token_revoked',
      'token_expired',
      'no_permission',
      'org_login_required',
      'ekm_access_denied',
    ];
    return authErrors.includes(response.error);
  }
  return false;
}
