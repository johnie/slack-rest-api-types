import type { ChatPostMessageResponse } from '@/index';

export const slackIds = {
  channel: 'C1234567890',
  user: 'U0123456789',
  bot: 'B987654321A',
  team: 'T123456789',
};

export const slackTimestamps = {
  valid: '1234567890.123456',
  invalid: 'invalid-timestamp',
};

export const mockPostMessageResponse: ChatPostMessageResponse = {
  ok: true,
  channel: 'C1234567890',
  ts: '1234567890.123456',
  message: {
    type: 'message',
    text: 'Hello, world!',
    ts: '1234567890.123456',
    username: 'bot',
    bot_id: 'B1234567890',
  },
};
