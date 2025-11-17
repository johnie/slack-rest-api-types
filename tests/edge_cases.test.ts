import { describe, expect, it } from 'vitest';
import type {
	WebAPICallResult,
	ChatPostMessageResponse,
	ConversationsListResponse,
	UsersListResponse,
	AdminTeamsListResponse,
	FilesListResponse,
} from '@/index';

describe('Edge Cases and Error Scenarios', () => {
	describe('Error responses', () => {
		it('should type generic error response', () => {
			const errorResponse: WebAPICallResult = {
				ok: false,
				error: 'channel_not_found',
			};

			expect(errorResponse.ok).toBe(false);
			if (!errorResponse.ok) {
				expect(errorResponse.error).toBe('channel_not_found');
			}
		});

		it('should type error with needed field', () => {
			const errorResponse: ChatPostMessageResponse = {
				ok: false,
				error: 'missing_scope',
				needed: 'chat:write',
			};

			expect(errorResponse.ok).toBe(false);
			if (!errorResponse.ok) {
				expect(errorResponse.error).toBe('missing_scope');
				expect(errorResponse.needed).toBe('chat:write');
			}
		});

		it('should type error with provided field', () => {
			const errorResponse: ChatPostMessageResponse = {
				ok: false,
				error: 'missing_scope',
				provided: 'identify,users:read',
			};

			expect(errorResponse.ok).toBe(false);
			if (!errorResponse.ok) {
				expect(errorResponse.provided).toBe('identify,users:read');
			}
		});

		it('should narrow error types using type guards', () => {
			const response: ChatPostMessageResponse = {
				ok: false,
				error: 'invalid_auth',
			};

			// Type guard based on ok field
			if (response.ok) {
				// Success path
				expect(response.channel).toBeDefined();
			} else {
				// Error path
				expect(response.error).toBe('invalid_auth');
			}
		});
	});

	describe('Rate limiting', () => {
		it('should type rate limited response', () => {
			const rateLimitedResponse: WebAPICallResult & {
				ok: false;
				error: 'rate_limited';
			} = {
				ok: false,
				error: 'rate_limited',
			};

			expect(rateLimitedResponse.ok).toBe(false);
			expect(rateLimitedResponse.error).toBe('rate_limited');
		});

		it('should type response metadata with retry_after', () => {
			const response: ConversationsListResponse & {
				response_metadata?: {
					warnings?: string[];
					messages?: string[];
					retry_after?: number;
				};
			} = {
				ok: false,
				error: 'rate_limited',
				response_metadata: {
					retry_after: 30,
				},
			};

			expect(response.response_metadata?.retry_after).toBe(30);
		});
	});

	describe('Cursor-based pagination', () => {
		it('should type conversations.list with cursor pagination', () => {
			const response: ConversationsListResponse = {
				ok: true,
				channels: [
					{
						id: 'C1234567890',
						name: 'general',
						is_channel: true,
						is_group: false,
						is_im: false,
						is_mpim: false,
						is_private: false,
						created: 1234567890,
						is_archived: false,
						is_general: true,
						unlinked: 0,
						name_normalized: 'general',
						is_shared: false,
						is_org_shared: false,
						is_member: true,
						is_pending_ext_shared: false,
						pending_shared: [],
						context_team_id: 'T1234567890',
						updated: 1234567890,
						creator: 'U1234567890',
						is_ext_shared: false,
						shared_team_ids: ['T1234567890'],
						pending_connected_team_ids: [],
						is_moved: 0,
					},
				],
				response_metadata: {
					next_cursor: 'dGVhbTpDMDYxRkE1UEI=',
				},
			};

			expect(response.ok).toBe(true);
			expect(response.response_metadata?.next_cursor).toBeTruthy();
			expect(response.response_metadata?.next_cursor?.length).toBeGreaterThan(0);
		});

		it('should type users.list with cursor pagination', () => {
			const response: UsersListResponse = {
				ok: true,
				members: [
					{
						id: 'U1234567890',
						team_id: 'T1234567890',
						name: 'john.doe',
						deleted: false,
						color: '9f69e7',
						real_name: 'John Doe',
						tz: 'America/New_York',
						tz_label: 'Eastern Standard Time',
						tz_offset: -18000,
						profile: {
							title: 'Software Engineer',
							phone: '',
							skype: '',
							real_name: 'John Doe',
							real_name_normalized: 'John Doe',
							display_name: 'John',
							display_name_normalized: 'John',
							status_text: 'Working remotely',
							status_emoji: ':house:',
							status_expiration: 0,
							avatar_hash: 'abc123',
							email: 'john.doe@example.com',
							team: 'T1234567890',
						},
						is_admin: false,
						is_owner: false,
						is_primary_owner: false,
						is_restricted: false,
						is_ultra_restricted: false,
						is_bot: false,
						is_app_user: false,
						updated: 1234567890,
					},
				],
				response_metadata: {
					next_cursor: 'dXNlcjpVMDYxTkZUVDI=',
				},
			};

			expect(response.ok).toBe(true);
			expect(response.members).toHaveLength(1);
			expect(response.response_metadata?.next_cursor).toBe('dXNlcjpVMDYxTkZUVDI=');
		});

		it('should handle empty cursor (last page)', () => {
			const response: AdminTeamsListResponse = {
				ok: true,
				teams: [],
				response_metadata: {
					next_cursor: '',
				},
			};

			expect(response.ok).toBe(true);
			expect(response.response_metadata?.next_cursor).toBe('');
		});
	});

	describe('Offset-based pagination (legacy)', () => {
		it('should type files.list with paging metadata', () => {
			const response: FilesListResponse = {
				ok: true,
				files: [
					{
						id: 'F1234567890',
						created: 1234567890,
						timestamp: 1234567890,
						name: 'test.txt',
						title: 'Test File',
						mimetype: 'text/plain',
						filetype: 'text',
						pretty_type: 'Plain Text',
						user: 'U1234567890',
						mode: 'hosted',
						editable: false,
						is_external: false,
						external_type: '',
						username: '',
						size: 1024,
						url_private: 'https://files.slack.com/files-pri/T1234-F1234/test.txt',
						url_private_download:
							'https://files.slack.com/files-pri/T1234-F1234/download/test.txt',
						permalink: 'https://example.slack.com/files/U1234/F1234/test.txt',
						permalink_public: 'https://slack-files.com/T1234-F1234-abcd',
						comments_count: 0,
						is_public: false,
						public_url_shared: false,
						display_as_bot: false,
						has_rich_preview: false,
					},
				],
				paging: {
					count: 100,
					total: 350,
					page: 2,
					pages: 4,
				},
			};

			expect(response.ok).toBe(true);
			expect(response.paging?.page).toBe(2);
			expect(response.paging?.pages).toBe(4);
			expect(response.paging?.total).toBe(350);
		});
	});

	describe('Response metadata with warnings', () => {
		it('should type response with warning messages', () => {
			const response: ConversationsListResponse & {
				response_metadata?: {
					warnings?: string[];
					messages?: string[];
				};
			} = {
				ok: true,
				channels: [],
				response_metadata: {
					warnings: ['missing_charset'],
					messages: ['[WARN] some warning message'],
				},
			};

			expect(response.ok).toBe(true);
			expect(response.response_metadata?.warnings).toContain('missing_charset');
			expect(response.response_metadata?.messages?.length).toBeGreaterThan(0);
		});
	});

	describe('Type narrowing patterns', () => {
		it('should narrow success response types', () => {
			const response: ChatPostMessageResponse = {
				ok: true,
				channel: 'C1234567890',
				ts: '1234567890.123456',
				message: {
					type: 'message',
					text: 'Hello',
					user: 'U1234567890',
					ts: '1234567890.123456',
				},
			};

			// TypeScript should narrow based on ok: true
			if (response.ok) {
				expect(response.channel).toBe('C1234567890');
				expect(response.ts).toBe('1234567890.123456');
				// error should not be accessible in this branch
				// @ts-expect-error - error property doesn't exist on success response
				expect(response.error).toBeUndefined();
			}
		});

		it('should narrow error response types', () => {
			const response: ChatPostMessageResponse = {
				ok: false,
				error: 'not_in_channel',
			};

			if (!response.ok) {
				expect(response.error).toBe('not_in_channel');
				// Success fields should not be accessible
				// @ts-expect-error - channel doesn't exist on error response
				expect(response.channel).toBeUndefined();
			}
		});

		it('should handle union types with multiple error possibilities', () => {
			const responses: ChatPostMessageResponse[] = [
				{ ok: true, channel: 'C123', ts: '123' },
				{ ok: false, error: 'channel_not_found' },
				{ ok: false, error: 'not_in_channel' },
			];

			responses.forEach((response) => {
				if (response.ok) {
					expect(response.channel).toBeDefined();
				} else {
					expect(response.error).toBeDefined();
					expect(['channel_not_found', 'not_in_channel']).toContain(
						response.error
					);
				}
			});
		});
	});

	describe('Empty and null responses', () => {
		it('should handle empty arrays in successful responses', () => {
			const response: ConversationsListResponse = {
				ok: true,
				channels: [],
			};

			expect(response.ok).toBe(true);
			expect(response.channels).toHaveLength(0);
		});

		it('should handle optional fields in responses', () => {
			const response: ChatPostMessageResponse = {
				ok: true,
				channel: 'C1234567890',
				ts: '1234567890.123456',
				// message is optional
			};

			expect(response.ok).toBe(true);
			expect(response.message).toBeUndefined();
		});
	});

	describe('Common error codes', () => {
		const commonErrors = [
			'invalid_auth',
			'not_authed',
			'account_inactive',
			'token_revoked',
			'no_permission',
			'org_login_required',
			'ekm_access_denied',
			'missing_scope',
			'invalid_arguments',
			'invalid_arg_name',
			'invalid_charset',
			'invalid_form_data',
			'invalid_post_type',
			'missing_post_type',
			'team_added_to_org',
			'request_timeout',
			'fatal_error',
			'internal_error',
		];

		commonErrors.forEach((errorCode) => {
			it(`should type error: ${errorCode}`, () => {
				const response: WebAPICallResult = {
					ok: false,
					error: errorCode,
				};

				expect(response.ok).toBe(false);
				expect(response.error).toBe(errorCode);
			});
		});
	});
});
