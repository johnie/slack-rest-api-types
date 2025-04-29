# slack-rest-api-types

[![NPM Version](https://img.shields.io/npm/v/slack-rest-api-types.svg)](https://www.npmjs.com/package/slack-rest-api-types)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> TypeScript type definitions for Slack Web API REST endpoints.

## Overview

`slack-rest-api-types` is a lightweight package that exports TypeScript type definitions from the official `@slack/web-api` package. It provides access to request and response types for Slack's Web API without including the full API client implementation.

This is particularly useful when:

- You're working with a different HTTP client but want Slack's typing
- You need to mock Slack API responses in tests
- You're developing applications that interact with Slack's API but use alternative HTTP clients

## Installation

```bash
# Using npm
npm install slack-rest-api-types

# Using yarn
yarn add slack-rest-api-types

# Using pnpm
pnpm add slack-rest-api-types
```

## Usage

Import the types you need in your TypeScript projects:

```typescript
import {
  ConversationsListResponse,
  ConversationsListArguments,
} from "slack-rest-api-types";

// Example with a custom client
async function listChannels(token: string): Promise<ConversationsListResponse> {
  const params: ConversationsListArguments = {
    exclude_archived: true,
    types: "public_channel,private_channel",
  };

  // Use with your preferred HTTP client
  const response = await fetchFromSlack("/conversations.list", params, token);
  return response as ConversationsListResponse;
}
```

## Available Types

This package exports all request and response type definitions from `@slack/web-api`, including:

- API method argument types (e.g., `ChatPostMessageArguments`)
- API response types (e.g., `ChatPostMessageResponse`)
- Various shared types used throughout the Slack API

## How It Works

The package simply re-exports the type definitions from `@slack/web-api` without including the actual implementation code. The entire package consists of TypeScript declaration files (`.d.ts`), making it very lightweight.

## Benefits

- **Minimal dependencies**: Only includes types, not the full Slack client
- **Type safety**: Get full TypeScript type checking when working with Slack's API
- **Lightweight**: Much smaller than including the full `@slack/web-api` package
- **Flexibility**: Use with any HTTP client or API wrapper of your choice

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Lint the code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## License

MIT © [Johnie Hjelm](https://github.com/johnie)
