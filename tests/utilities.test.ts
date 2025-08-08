import { describe, expect, expectTypeOf, it } from 'vitest';
import type {
  Block,
  ChatPostMessageArguments,
  ConversationsListArguments,
  HeaderBlock,
  SectionBlock,
  WebAPICallResult,
} from '@/index';

describe('Utilities and Edge Cases', () => {
  describe('Optional and required fields', () => {
    it('should require only necessary fields in ChatPostMessageArguments', () => {
      const minimalArgs: ChatPostMessageArguments = {
        channel: 'C1234567890',
        attachments: [],
      };
      expect(minimalArgs.channel).toBe('C1234567890');

      // Should work with text only
      const textOnlyArgs: ChatPostMessageArguments = {
        channel: 'C1234567890',
        text: 'Hello',
      };
      expect(textOnlyArgs.text).toBe('Hello');

      // Should work with blocks only
      const blocksOnlyArgs: ChatPostMessageArguments = {
        channel: 'C1234567890',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'Hello',
            },
          },
        ],
      };
      expect(blocksOnlyArgs.blocks).toHaveLength(1);
    });

    it('should make all fields optional in ConversationsListArguments', () => {
      // Should work with no arguments
      const noArgs: ConversationsListArguments = {};
      expect(typeof noArgs).toBe('object');

      // Should work with all arguments
      const allArgs: ConversationsListArguments = {
        cursor: 'dXNlcjpVMDYxTkZUVDI=',
        exclude_archived: true,
        limit: 100,
        types: 'public_channel,private_channel',
        team_id: 'T1234567890',
      };
      expect(allArgs.limit).toBe(100);
    });
  });

  describe('Block Kit types', () => {
    it('should work with different block types', () => {
      const sectionBlock: SectionBlock = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'This is a section block',
        },
      };

      const dividerBlock: Block = {
        type: 'divider',
      };

      const headerBlock: HeaderBlock = {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'This is a header',
        },
      };

      const blocks: Block[] = [sectionBlock, dividerBlock, headerBlock];
      expect(blocks).toHaveLength(3);
      expect(blocks[0]?.type).toBe('section');
      expect(blocks[1]?.type).toBe('divider');
      expect(blocks[2]?.type).toBe('header');
    });

    it('should handle complex block structures', () => {
      const complexBlock: SectionBlock = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Pick a date for the deadline.',
        },
        accessory: {
          type: 'datepicker',
          initial_date: '1990-04-28',
          placeholder: {
            type: 'plain_text',
            text: 'Select a date',
          },
          action_id: 'datepicker-action',
        },
      };

      expect(complexBlock.type).toBe('section');
      expect(complexBlock.accessory?.type).toBe('datepicker');
    });
  });

  describe('Union types and polymorphism', () => {
    it('should handle different response types as WebAPICallResult', () => {
      function handleApiResponse(response: WebAPICallResult): string {
        if (response.ok) {
          return 'Success';
        } else {
          return `Error: ${response.error || 'Unknown error'}`;
        }
      }

      const successResponse: WebAPICallResult = { ok: true };
      const errorResponse: WebAPICallResult = {
        ok: false,
        error: 'invalid_auth',
      };

      expect(handleApiResponse(successResponse)).toBe('Success');
      expect(handleApiResponse(errorResponse)).toBe('Error: invalid_auth');
    });
  });

  describe('Type compatibility', () => {
    it('should be compatible with JSON serialization', () => {
      const args: ChatPostMessageArguments = {
        channel: 'C1234567890',
        text: 'Hello, world!',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'Hello',
            },
          },
        ],
      };

      // Should be able to serialize and deserialize
      const serialized = JSON.stringify(args);
      const deserialized = JSON.parse(serialized) as ChatPostMessageArguments;

      expect(deserialized.channel).toBe(args.channel);
      expect(deserialized.text).toBe(args.text);
    });

    it('should work with generic HTTP client interfaces', () => {
      // Simulate a generic HTTP client
      interface HttpClient {
        post<T>(url: string, data: unknown): Promise<T>;
      }

      async function postMessage(
        client: HttpClient,
        args: ChatPostMessageArguments,
      ) {
        return client.post('/api/chat.postMessage', args);
      }

      // This should compile without type errors
      expectTypeOf(postMessage).toBeFunction();
      expectTypeOf(postMessage)
        .parameter(1)
        .toMatchTypeOf<ChatPostMessageArguments>();
    });
  });
});
