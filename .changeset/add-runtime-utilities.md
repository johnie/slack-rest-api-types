---
"slack-rest-api-types": minor
---

Add comprehensive runtime utility functions and enhanced test coverage

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
