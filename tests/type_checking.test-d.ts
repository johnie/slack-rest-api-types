import { describe, expectTypeOf, it } from 'vitest';
import type {
  Block,
  ChatPostMessageArguments,
  ChatPostMessageResponse,
  ConversationsListArguments,
  ConversationsListResponse,
  KnownBlock,
  UsersListArguments,
  UsersListResponse,
  WebAPICallResult,
} from '../index';

describe('Type Checking', () => {
  describe('Chat API Types', () => {
    it('should have correct ChatPostMessageArguments type', () => {
      expectTypeOf<ChatPostMessageArguments>().toMatchTypeOf<{
        channel: string;
        text?: string;
        blocks?: Block[];
      }>();

      // Test that required fields are enforced
      expectTypeOf<ChatPostMessageArguments>().toHaveProperty('channel');
      expectTypeOf<ChatPostMessageArguments['channel']>().toBeString();
    });

    it('should have correct ChatPostMessageResponse type', () => {
      expectTypeOf<ChatPostMessageResponse>().toMatchTypeOf<WebAPICallResult>();
      expectTypeOf<ChatPostMessageResponse>().toHaveProperty('ok');
      expectTypeOf<ChatPostMessageResponse['ok']>().toBeBoolean();
    });
  });

  describe('Conversations API Types', () => {
    it('should have correct ConversationsListResponse type', () => {
      expectTypeOf<ConversationsListResponse>().toMatchTypeOf<WebAPICallResult>();
      expectTypeOf<ConversationsListResponse>().toHaveProperty('channels');
    });
  });

  describe('Users API Types', () => {
    it('should have correct UsersListArguments type', () => {
      expectTypeOf<UsersListArguments>().toMatchTypeOf<{
        cursor?: string;
        include_locale?: boolean;
        limit?: number;
      }>();
    });

    it('should have correct UsersListResponse type', () => {
      expectTypeOf<UsersListResponse>().toMatchTypeOf<WebAPICallResult>();
      expectTypeOf<UsersListResponse>().toHaveProperty('members');
    });
  });

  describe('Block Kit Types', () => {
    it('should have Block and KnownBlock types', () => {
      expectTypeOf<Block>().toBeObject();
      expectTypeOf<KnownBlock>().toBeObject();

      // KnownBlock should be a subset of Block
      expectTypeOf<KnownBlock>().toMatchTypeOf<Block>();
    });
  });

  describe('Base API Types', () => {
    it('should have WebAPICallResult base type', () => {
      expectTypeOf<WebAPICallResult>().toMatchTypeOf<{
        ok: boolean;
        error?: string;
        warning?: string;
        response_metadata?: any;
      }>();
    });
  });
});
