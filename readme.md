# slack-rest-api-types

[![NPM Version](https://img.shields.io/npm/v/slack-rest-api-types.svg)](https://www.npmjs.com/package/slack-rest-api-types) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![npm downloads](https://img.shields.io/npm/dm/slack-rest-api-types.svg)](https://www.npmjs.com/package/slack-rest-api-types)

> Lightweight TypeScript type definitions for Slack Web API REST endpoints and tools.

## Why slack-rest-api-types?

Building Slack applications with TypeScript but don't want the full `@slack/web-api` client? This package gives you **complete type safety** for Slack's Web API or tools without any runtime dependencies.

**Perfect for:**

- 🔧 Custom HTTP clients (fetch, axios, ky, etc.)
- 🧪 Testing and mocking Slack API responses
- 📦 Lightweight applications where bundle size matters
- 🎯 Type-safe API integrations without vendor lock-in

## Installation

```bash
npm install slack-rest-api-types
# or
bun add slack-rest-api-types
# or
pnpm add slack-rest-api-types
```

## Quick Start

```typescript
import {
  ChatPostMessageArguments,
  ChatPostMessageResponse,
  ConversationsListResponse,
} from 'slack-rest-api-types';

// ✅ Fully typed request parameters
const messageData: ChatPostMessageArguments = {
  channel: 'C1234567890',
  text: 'Hello from TypeScript! 👋',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Bold text* and _italic text_',
      },
    },
  ],
};

// ✅ Fully typed response handling
async function sendMessage(
  data: ChatPostMessageArguments
): Promise<ChatPostMessageResponse> {
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json() as ChatPostMessageResponse;
}
```

## Real-World Examples

### Custom HTTP Client Integration

```typescript
import axios from 'axios';
import {
  ConversationsListArguments,
  ConversationsListResponse,
  UsersListResponse,
} from 'slack-rest-api-types';

class SlackClient {
  constructor(private token: string) {}

  async getChannels(
    params: ConversationsListArguments = {}
  ): Promise<ConversationsListResponse> {
    const { data } = await axios.get<ConversationsListResponse>(
      'https://slack.com/api/conversations.list',
      {
        headers: { Authorization: `Bearer ${this.token}` },
        params,
      }
    );
    return data;
  }

  async getUsers(): Promise<UsersListResponse> {
    const { data } = await axios.get<UsersListResponse>(
      'https://slack.com/api/users.list',
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return data;
  }
}
```

### Testing with Mock Data

```typescript
import { describe, it, expect } from 'vitest';
import {
  ChatPostMessageResponse,
  ConversationsListResponse,
} from 'slack-rest-api-types';

describe('Slack Integration Tests', () => {
  it('should handle message posting response', () => {
    const mockResponse: ChatPostMessageResponse = {
      ok: true,
      channel: 'C1234567890',
      ts: '1234567890.123456',
      message: {
        type: 'message',
        text: 'Hello, world!',
        ts: '1234567890.123456',
        user: 'U1234567890',
      },
    };

    expect(mockResponse.ok).toBe(true);
    expect(mockResponse.channel).toBe('C1234567890');
  });

  it('should handle error responses', () => {
    const errorResponse: ChatPostMessageResponse = {
      ok: false,
      error: 'channel_not_found',
    };

    if (!errorResponse.ok) {
      expect(errorResponse.error).toBe('channel_not_found');
    }
  });
});
```

### Advanced Error Handling

```typescript
import {
  WebAPICallResult,
  ChatPostMessageResponse,
} from 'slack-rest-api-types';

function isSuccessResponse<T extends WebAPICallResult>(
  response: T
): response is T & { ok: true } {
  return response.ok === true;
}

async function safeSendMessage(messageData: ChatPostMessageArguments) {
  try {
    const response = await sendMessage(messageData);

    if (isSuccessResponse(response)) {
      console.log(`Message sent successfully: ${response.ts}`);
      return response;
    } else {
      console.error(`Failed to send message: ${response.error}`);
      throw new Error(response.error);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}
```

## Available Types

This package exports all request and response types from the official Slack Web API

### From Custom Types

Replace your hand-written Slack types:

```typescript
// Before - Manual type definitions
interface SlackMessage {
  channel: string;
  text?: string;
  // ... incomplete definitions
}

// After - Complete, official types
import type { ChatPostMessageArguments } from 'slack-rest-api-types';
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and add tests
4. Run the test suite: `pnpm test`
5. Submit a pull request

## FAQ

**Q: Does this package include the Slack SDK?**  
A: No, this is types-only. Use your preferred HTTP client for making requests.

**Q: How often are types updated?**  
A: We track the official `@slack/web-api` package and update accordingly.

**Q: Can I use this with JavaScript?**  
A: While designed for TypeScript, the package works with JavaScript projects (types are ignored).

**Q: Are all Slack API methods covered?**  
A: Yes, we re-export all types from the official Slack packages.

## License

MIT © [Johnie Hjelm](https://github.com/johnie)
