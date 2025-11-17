import { describe, expect, it } from 'vitest';
import type {
	FilesUploadV2Arguments,
	FilesInfoArguments,
	FilesInfoResponse,
	FilesListArguments,
	FilesListResponse,
	ReactionsAddArguments,
	ReactionsAddResponse,
	ReactionsRemoveArguments,
	ReactionsRemoveResponse,
	ReactionsGetArguments,
	ReactionsGetResponse,
	AdminTeamsListArguments,
	AdminTeamsListResponse,
	PinsAddArguments,
	PinsAddResponse,
	PinsListArguments,
	PinsListResponse,
	WebAPICallResult,
} from '@/index';

describe('Files API Tests', () => {
	describe('files.uploadV2', () => {
		it('should type files.uploadV2 request with single file', () => {
			const uploadArgs: FilesUploadV2Arguments = {
				channel: 'C1234567890',
				file: new Blob(['test content']),
				filename: 'test.txt',
				title: 'Test File',
				initial_comment: 'Here is the test file',
			};

			expect(uploadArgs.channel).toBe('C1234567890');
			expect(uploadArgs.filename).toBe('test.txt');
		});

		it('should type files.uploadV2 request with multiple channels', () => {
			const uploadArgs: FilesUploadV2Arguments = {
				channel_id: 'C1234567890',
				file: new Blob(['test']),
				filename: 'test.txt',
			};

			expect(uploadArgs.channel_id).toBe('C1234567890');
		});
	});

	describe('files.info', () => {
		it('should type files.info request', () => {
			const infoArgs: FilesInfoArguments = {
				file: 'F1234567890',
			};

			expect(infoArgs.file).toBe('F1234567890');
		});

		it('should type files.info response with success', () => {
			const infoResponse: FilesInfoResponse = {
				ok: true,
				file: {
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
					channels: ['C1234567890'],
					groups: [],
					ims: [],
				},
			};

			expect(infoResponse.ok).toBe(true);
			expect(infoResponse.file.id).toBe('F1234567890');
			expect(infoResponse.file.name).toBe('test.txt');
		});
	});

	describe('files.list', () => {
		it('should type files.list request', () => {
			const listArgs: FilesListArguments = {
				channel: 'C1234567890',
				user: 'U1234567890',
				count: 20,
				page: 1,
			};

			expect(listArgs.channel).toBe('C1234567890');
			expect(listArgs.count).toBe(20);
		});

		it('should type files.list response with pagination', () => {
			const listResponse: FilesListResponse = {
				ok: true,
				files: [
					{
						id: 'F1234567890',
						created: 1234567890,
						timestamp: 1234567890,
						name: 'test1.txt',
						title: 'Test File 1',
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
						url_private: 'https://files.slack.com/files-pri/T1234-F1234/test1.txt',
						url_private_download:
							'https://files.slack.com/files-pri/T1234-F1234/download/test1.txt',
						permalink: 'https://example.slack.com/files/U1234/F1234/test1.txt',
						permalink_public: 'https://slack-files.com/T1234-F1234-abcd',
						comments_count: 0,
						is_public: false,
						public_url_shared: false,
						display_as_bot: false,
						has_rich_preview: false,
					},
				],
				paging: {
					count: 20,
					total: 50,
					page: 1,
					pages: 3,
				},
			};

			expect(listResponse.ok).toBe(true);
			expect(listResponse.files).toHaveLength(1);
			expect(listResponse.paging?.total).toBe(50);
		});
	});
});

describe('Reactions API Tests', () => {
	describe('reactions.add', () => {
		it('should type reactions.add request', () => {
			const addArgs: ReactionsAddArguments = {
				channel: 'C1234567890',
				name: 'thumbsup',
				timestamp: '1234567890.123456',
			};

			expect(addArgs.channel).toBe('C1234567890');
			expect(addArgs.name).toBe('thumbsup');
		});

		it('should type reactions.add response', () => {
			const addResponse: ReactionsAddResponse = {
				ok: true,
			};

			expect(addResponse.ok).toBe(true);
		});
	});

	describe('reactions.remove', () => {
		it('should type reactions.remove request', () => {
			const removeArgs: ReactionsRemoveArguments = {
				channel: 'C1234567890',
				name: 'thumbsup',
				timestamp: '1234567890.123456',
			};

			expect(removeArgs.name).toBe('thumbsup');
		});

		it('should type reactions.remove response', () => {
			const removeResponse: ReactionsRemoveResponse = {
				ok: true,
			};

			expect(removeResponse.ok).toBe(true);
		});
	});

	describe('reactions.get', () => {
		it('should type reactions.get request', () => {
			const getArgs: ReactionsGetArguments = {
				channel: 'C1234567890',
				timestamp: '1234567890.123456',
			};

			expect(getArgs.channel).toBe('C1234567890');
		});

		it('should type reactions.get response', () => {
			const getResponse: ReactionsGetResponse = {
				ok: true,
				type: 'message',
				message: {
					type: 'message',
					text: 'Great work!',
					user: 'U1234567890',
					ts: '1234567890.123456',
					reactions: [
						{
							name: 'thumbsup',
							count: 3,
							users: ['U1234567890', 'U0987654321', 'U1111111111'],
						},
						{
							name: 'heart',
							count: 1,
							users: ['U1234567890'],
						},
					],
				},
			};

			expect(getResponse.ok).toBe(true);
			expect(getResponse.message?.reactions).toHaveLength(2);
			expect(getResponse.message?.reactions?.[0].count).toBe(3);
		});
	});
});

describe('Admin API Tests', () => {
	describe('admin.teams.list', () => {
		it('should type admin.teams.list request with cursor', () => {
			const listArgs: AdminTeamsListArguments = {
				limit: 100,
				cursor: 'dGVhbTpDMDYxRkE1UEI=',
			};

			expect(listArgs.limit).toBe(100);
			expect(listArgs.cursor).toBeDefined();
		});

		it('should type admin.teams.list response with cursor pagination', () => {
			const listResponse: AdminTeamsListResponse = {
				ok: true,
				teams: [
					{
						id: 'T1234567890',
						name: 'Acme Corp',
						domain: 'acme-corp',
						email_domain: 'acme.com',
						icon: {
							image_default: true,
						},
						is_verified: false,
						discoverable: 'unlisted',
						primary_owner: {
							user_id: 'U1234567890',
							email: 'owner@acme.com',
						},
						team_url: 'https://acme-corp.slack.com/',
					},
				],
				response_metadata: {
					next_cursor: 'dXNlcjpVMDYxTkZUVDI=',
				},
			};

			expect(listResponse.ok).toBe(true);
			expect(listResponse.teams).toHaveLength(1);
			expect(listResponse.response_metadata?.next_cursor).toBeTruthy();
		});
	});
});

describe('Pins API Tests', () => {
	describe('pins.add', () => {
		it('should type pins.add request', () => {
			const addArgs: PinsAddArguments = {
				channel: 'C1234567890',
				timestamp: '1234567890.123456',
			};

			expect(addArgs.channel).toBe('C1234567890');
			expect(addArgs.timestamp).toBe('1234567890.123456');
		});

		it('should type pins.add response', () => {
			const addResponse: PinsAddResponse = {
				ok: true,
			};

			expect(addResponse.ok).toBe(true);
		});
	});

	describe('pins.list', () => {
		it('should type pins.list request', () => {
			const listArgs: PinsListArguments = {
				channel: 'C1234567890',
			};

			expect(listArgs.channel).toBe('C1234567890');
		});

		it('should type pins.list response', () => {
			const listResponse: PinsListResponse = {
				ok: true,
				items: [
					{
						type: 'message',
						channel: 'C1234567890',
						message: {
							type: 'message',
							user: 'U1234567890',
							text: 'Important message',
							ts: '1234567890.123456',
						},
						created: 1234567890,
						created_by: 'U1234567890',
					},
				],
			};

			expect(listResponse.ok).toBe(true);
			expect(listResponse.items).toHaveLength(1);
			expect(listResponse.items?.[0].type).toBe('message');
		});
	});
});
