# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`slack-rest-api-types` is a lightweight TypeScript type definitions package for Slack Web API REST endpoints. It provides complete type safety without runtime dependencies by re-exporting types from `@slack/web-api` and `@slack/types`.

**Key characteristics:**
- Types-only package (no runtime code)
- Re-exports from official Slack packages
- Published to npm with declaration files only
- Uses pnpm as package manager

## Core Architecture

The entire implementation is in `src/index.ts` which simply re-exports types from:
- `@slack/types` - Core Slack type definitions
- `@slack/web-api/dist/types/request/index` - API request parameter types
- `@slack/web-api/dist/types/response/index` - API response types
- `@slack/web-api/dist/WebClient` - WebClient types

The build process (`npm run build`) uses TypeScript with `emitDeclarationOnly: true` to generate only `.d.ts` files in the `dist/` directory.

## Development Commands

### Building
```bash
npm run build          # Clean and compile TypeScript declarations
npm run build:clean    # Remove dist directory
```

### Testing
```bash
npm test               # Run tests once with Vitest
npm run test:watch     # Run tests in watch mode
```

Tests are located in `tests/` and include:
- `integration.test.ts` - Type compatibility tests with realistic API data
- `slack_patterns.test.ts` - Slack-specific pattern tests
- `utilities.test.ts` - Utility function tests

Vitest is configured with:
- Type checking enabled (runs `tsc` for type validation)
- Setup file at `tests/setup.ts`
- Path alias `@` points to `src/`

### Code Quality
```bash
npm run format         # Format code with Biome
npm run check-format   # Check and fix formatting/linting
npm run check-exports  # Validate package exports with @arethetypeswrong/cli
```

Biome configuration (`biome.json`):
- Uses single quotes for JavaScript
- 4-space indentation for JSON
- Organizes imports automatically

### CI and Release
```bash
npm run ci            # Full CI pipeline: build, format, export check, test
npm run release       # Run CI and publish with changesets
npm run local-release # Version and publish locally (for testing)
```

The project uses [Changesets](https://github.com/changesets/changesets) for version management:
- Changelog generated via `@changesets/changelog-github`
- Commits are automatically created
- Published as public package to npm

## Testing Strategy

Tests focus on **type compatibility** rather than runtime behavior since this is a types-only package. Key patterns:

1. **Integration tests** validate that types work with realistic Slack API data structures
2. **Type narrowing tests** ensure discriminated unions work (e.g., checking `response.ok` narrows types)
3. Tests use actual type assignments to verify TypeScript compilation

Example test pattern:
```typescript
const messageResponse: ChatPostMessageResponse = {
  ok: true,
  channel: 'C1234567890',
  ts: '1234567890.123456',
  // ...
};
expect(messageResponse.ok).toBe(true);
```

## Publishing Workflow

1. Create a changeset: `npx changeset`
2. Commit changes
3. On merge to main, GitHub Actions (if configured) or manual `npm run release` publishes to npm
4. Only `dist/` directory is published (specified in `package.json` files field)

## Node Version

Supports Node v22.17.1 and v24.11.0 (see `.nvmrc`).
