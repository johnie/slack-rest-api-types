import { describe, expect, it } from 'vitest';
import type {
  ChatPostMessageArguments,
  ChatPostMessageResponse,
  ConversationsListResponse,
  UsersListResponse,
  WebAPICallResult,
} from '@/index';

describe('Integration Tests', () => {
  describe('Type compatibility with realistic API data', () => {
    it('should work with chat.postMessage request data', () => {
      const messageArgs: ChatPostMessageArguments = {
        channel: 'C1234567890',
        text: 'Hello, world!',
        thread_ts: '1234567890.123456',
        reply_broadcast: false,
      };

      // Should compile without errors and have expected properties
      expect(messageArgs.channel).toBe('C1234567890');
      expect(messageArgs.text).toBe('Hello, world!');
    });

    it('should work with chat.postMessage response data', () => {
      const messageResponse: ChatPostMessageResponse = {
        ok: true,
        channel: 'C1234567890',
        ts: '1234567890.123456',
        message: {
          type: 'message',
          subtype: undefined,
          text: 'Hello, world!',
          ts: '1234567890.123456',
          username: 'bot',
          bot_id: 'B1234567890',
        },
      };

      expect(messageResponse.ok).toBe(true);
      expect(messageResponse.channel).toBe('C1234567890');
      expect(messageResponse.message?.text).toBe('Hello, world!');
    });

    it('should work with conversations.list response data', () => {
      const conversationsResponse: ConversationsListResponse = {
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
            topic: {
              value: 'Company-wide announcements and work-based matters',
              creator: 'U1234567890',
              last_set: 1234567890,
            },
            purpose: {
              value:
                'This channel is for team-wide communication and announcements.',
              creator: 'U1234567890',
              last_set: 1234567890,
            },
            num_members: 4,
          },
        ],
        response_metadata: {
          next_cursor: '',
        },
      };

      expect(conversationsResponse.ok).toBe(true);
      expect(conversationsResponse.channels).toHaveLength(1);
      expect(conversationsResponse.channels?.[0]?.name).toBe('general');
    });

    it('should work with users.list response data', () => {
      const usersResponse: UsersListResponse = {
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
              fields: {},
              status_text: '',
              status_emoji: '',
              status_expiration: 0,
              avatar_hash: 'abc123',
              email: 'john.doe@example.com',
              image_24: 'https://example.com/avatar_24.jpg',
              image_32: 'https://example.com/avatar_32.jpg',
              image_48: 'https://example.com/avatar_48.jpg',
              image_72: 'https://example.com/avatar_72.jpg',
              image_192: 'https://example.com/avatar_192.jpg',
              image_512: 'https://example.com/avatar_512.jpg',
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
            has_2fa: false,
          },
        ],
        cache_ts: 1234567890,
        response_metadata: {
          next_cursor: '',
        },
      };

      expect(usersResponse.ok).toBe(true);
      expect(usersResponse.members).toHaveLength(1);
      expect(usersResponse.members?.[0]?.name).toBe('john.doe');
    });

    it('should handle error responses', () => {
      const errorResponse: WebAPICallResult = {
        ok: false,
        error: 'channel_not_found',
        response_metadata: { warnings: ['Channel not found'] },
      };

      expect(errorResponse.ok).toBe(false);
      expect(errorResponse.error).toBe('channel_not_found');
    });
  });

  describe('Type guards and validation', () => {
    it('should allow type narrowing based on ok field', () => {
      function handleResponse(response: ChatPostMessageResponse) {
        if (response.ok) {
          // In this branch, TypeScript should know response.error is undefined
          expect(response.ts).toBeDefined();
          expect(response.channel).toBeDefined();
        } else {
          // In this branch, TypeScript should know we have an error
          expect(response.error).toBeDefined();
        }
      }

      const successResponse: ChatPostMessageResponse = {
        ok: true,
        channel: 'C1234567890',
        ts: '1234567890.123456',
        message: {
          type: 'message',
          text: 'Hello',
          ts: '1234567890.123456',
        },
      };

      const errorResponse: ChatPostMessageResponse = {
        ok: false,
        error: 'channel_not_found',
      };

      handleResponse(successResponse);
      handleResponse(errorResponse);
    });
  });
});
