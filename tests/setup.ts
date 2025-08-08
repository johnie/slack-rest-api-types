import { expect } from 'vitest';

expect.extend({
  toBeSlackId(received: string) {
    const isSlackId = /^[A-Z][A-Z0-9]{8,}$/.test(received);
    return {
      pass: isSlackId,
      message: () =>
        `expected ${received} ${
          isSlackId ? 'not ' : ''
        }to be a valid Slack ID (e.g., 'U12345678' or 'C01234567')`,
    };
  },

  toBeSlackTimestamp(received: string) {
    const isTimestamp = /^\d{10}\.\d{6}$/.test(received);
    return {
      pass: isTimestamp,
      message: () =>
        `expected ${received} ${
          isTimestamp ? 'not ' : ''
        }to be a valid Slack timestamp (e.g., '1609459200.000000')`,
    };
  },
});
