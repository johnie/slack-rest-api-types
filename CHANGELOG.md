# slack-rest-api-types

## 1.2.0

### Minor Changes

- [#32](https://github.com/johnie/slack-rest-api-types/pull/32) [`0b4b8e4`](https://github.com/johnie/slack-rest-api-types/commit/0b4b8e47e18182b82cf6110aba2993e40341beed) Thanks [@johnie](https://github.com/johnie)! - Add comprehensive runtime utility functions and enhanced test coverage

  This release introduces a new `/utils` submodule with powerful runtime utilities for working with Slack API responses, alongside extensive test coverage and improved documentation.

  ### ✨ New Features

  **Runtime Utilities Module** (`slack-rest-api-types/utils`):

  - **Type Guards**: Validate and narrow Slack API response types

    - `isSuccessResponse()` - Check for successful responses
    - `isErrorResponse()` - Check for error responses
    - `isRateLimited()` - Detect rate limiting
    - `isMissingScope()` - Identify missing permission errors
    - `isAuthError()` - Detect authentication errors

  - **Pagination Helpers**: Simplify cursor and offset-based pagination

    - `hasNextPage()` - Check if more pages exist
    - `extractCursor()` - Extract next page cursor
    - `hasCursor()` - Type guard for cursor pagination
    - `hasMorePages()` - Check for additional pages (offset-based)
    - `hasOffsetPaging()` - Type guard for offset pagination
    - `getTotalCount()` - Get total item count

  - **Block Kit Utilities**: Validate and filter Slack blocks
    - `isKnownBlock()` - Validate block types
    - `filterKnownBlocks()` - Filter out unknown blocks
    - Type guards for specific block types (Section, Actions, Context, Divider, Image, Input, Header)

  ### 🧪 Testing Enhancements

  - Comprehensive API method tests for Files, Reactions, Admin, and Pins APIs
  - Extensive edge case and error scenario coverage
  - Integration tests demonstrating real-world usage patterns

  ### 📚 Documentation Improvements

  - Enhanced README with detailed runtime utilities documentation and examples
  - Added CLAUDE.md with project guidance and development instructions
  - Updated CONTRIBUTING.md with Biome usage and utility function standards

  ### 🏗️ Build System Updates

  - New `/utils` export path for tree-shakeable utility functions
  - Separate TypeScript configuration for utility module compilation
  - Updated build process to support both types and runtime utilities

  ### 🔧 Developer Experience

  - Node.js version updated to v24.11.0
  - Simplified exports from Slack web API
  - Improved type definitions and compiler options

## 1.1.2

### Patch Changes

- [#20](https://github.com/johnie/slack-rest-api-types/pull/20) [`62884e5`](https://github.com/johnie/slack-rest-api-types/commit/62884e5c47cc882661ceec8ff2ac610bcfc31234) Thanks [@johnie](https://github.com/johnie)! - deps: update dependencies

## 1.1.1

### Patch Changes

- [#16](https://github.com/johnie/slack-rest-api-types/pull/16) [`20cc542`](https://github.com/johnie/slack-rest-api-types/commit/20cc542a98728afacacc7b9780dba8fdb903bf93) Thanks [@dependabot](https://github.com/apps/dependabot)! - deps: bump the dependencies group with 3 updates

## 1.1.0

### Minor Changes

- [#13](https://github.com/johnie/slack-rest-api-types/pull/13) [`32900dd`](https://github.com/johnie/slack-rest-api-types/commit/32900dda19b0d4aee8c30d39aa7c946fe258ae92) Thanks [@johnie](https://github.com/johnie)! - fix: add vitest for testing and update dependencies

### Patch Changes

- [#4](https://github.com/johnie/slack-rest-api-types/pull/4) [`7fde0a2`](https://github.com/johnie/slack-rest-api-types/commit/7fde0a2903f54455e2a7fc37ca7d4d4a8afeccf0) Thanks [@dependabot](https://github.com/apps/dependabot)! - deps: bump the dependencies group with 2 updates

- [#3](https://github.com/johnie/slack-rest-api-types/pull/3) [`5384380`](https://github.com/johnie/slack-rest-api-types/commit/5384380668cf860a2644aa05c76689743d75b8fa) Thanks [@dependabot](https://github.com/apps/dependabot)! - deps: bump the dependencies group with 2 updates

- [#14](https://github.com/johnie/slack-rest-api-types/pull/14) [`a1484a5`](https://github.com/johnie/slack-rest-api-types/commit/a1484a5ad5a226f847fbf755572c4050974d2898) Thanks [@johnie](https://github.com/johnie)! - feat: add initial exports for Slack API types and WebClient

## 1.0.1

### Patch Changes

- 654908d: Add changeset workflow
