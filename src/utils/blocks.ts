import type { Block, KnownBlock } from '@slack/types';

/**
 * Type guard to check if a value is a valid Slack Block.
 *
 * @param value - The value to check
 * @returns True if the value is a Block
 *
 * @example
 * ```typescript
 * const maybeBlock = { type: 'section', text: { type: 'mrkdwn', text: 'Hello' } };
 *
 * if (isBlock(maybeBlock)) {
 *   console.log('Valid block:', maybeBlock.type);
 * }
 * ```
 */
export function isBlock(value: unknown): value is Block {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'string'
  );
}

/**
 * Type guard to check if a value is a KnownBlock (one of the official Slack block types).
 *
 * @param value - The value to check
 * @returns True if the value is a KnownBlock
 *
 * @example
 * ```typescript
 * const block = { type: 'section', text: { type: 'mrkdwn', text: 'Hello' } };
 *
 * if (isKnownBlock(block)) {
 *   // TypeScript knows this is a known block type
 *   console.log('Known block type:', block.type);
 * }
 * ```
 */
export function isKnownBlock(value: unknown): value is KnownBlock {
  if (!isBlock(value)) return false;

  const knownBlockTypes = [
    'actions',
    'context',
    'divider',
    'file',
    'header',
    'image',
    'input',
    'rich_text',
    'section',
    'video',
  ];

  return knownBlockTypes.includes(value.type);
}

/**
 * Type guard to check if a block is a section block.
 *
 * @param block - The block to check
 * @returns True if the block is a section block
 *
 * @example
 * ```typescript
 * const block = { type: 'section', text: { type: 'mrkdwn', text: 'Hello' } };
 *
 * if (isSectionBlock(block)) {
 *   console.log('Section text:', block.text?.text);
 * }
 * ```
 */
export function isSectionBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'section' }> {
  return block.type === 'section';
}

/**
 * Type guard to check if a block is an actions block.
 *
 * @param block - The block to check
 * @returns True if the block is an actions block
 *
 * @example
 * ```typescript
 * const block = { type: 'actions', elements: [...] };
 *
 * if (isActionsBlock(block)) {
 *   console.log('Number of actions:', block.elements.length);
 * }
 * ```
 */
export function isActionsBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'actions' }> {
  return block.type === 'actions';
}

/**
 * Type guard to check if a block is a divider block.
 *
 * @param block - The block to check
 * @returns True if the block is a divider block
 *
 * @example
 * ```typescript
 * const block = { type: 'divider' };
 *
 * if (isDividerBlock(block)) {
 *   console.log('This is a divider');
 * }
 * ```
 */
export function isDividerBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'divider' }> {
  return block.type === 'divider';
}

/**
 * Type guard to check if a block is a header block.
 *
 * @param block - The block to check
 * @returns True if the block is a header block
 *
 * @example
 * ```typescript
 * const block = { type: 'header', text: { type: 'plain_text', text: 'Title' } };
 *
 * if (isHeaderBlock(block)) {
 *   console.log('Header text:', block.text.text);
 * }
 * ```
 */
export function isHeaderBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'header' }> {
  return block.type === 'header';
}

/**
 * Type guard to check if a block is an image block.
 *
 * @param block - The block to check
 * @returns True if the block is an image block
 *
 * @example
 * ```typescript
 * const block = { type: 'image', image_url: 'https://...', alt_text: 'Image' };
 *
 * if (isImageBlock(block)) {
 *   console.log('Image URL:', block.image_url);
 * }
 * ```
 */
export function isImageBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'image' }> {
  return block.type === 'image';
}

/**
 * Type guard to check if a block is a context block.
 *
 * @param block - The block to check
 * @returns True if the block is a context block
 *
 * @example
 * ```typescript
 * const block = { type: 'context', elements: [...] };
 *
 * if (isContextBlock(block)) {
 *   console.log('Context elements:', block.elements.length);
 * }
 * ```
 */
export function isContextBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'context' }> {
  return block.type === 'context';
}

/**
 * Type guard to check if a block is an input block.
 *
 * @param block - The block to check
 * @returns True if the block is an input block
 *
 * @example
 * ```typescript
 * const block = { type: 'input', label: {...}, element: {...} };
 *
 * if (isInputBlock(block)) {
 *   console.log('Input label:', block.label.text);
 * }
 * ```
 */
export function isInputBlock(
  block: Block,
): block is Extract<KnownBlock, { type: 'input' }> {
  return block.type === 'input';
}

/**
 * Validates that an array contains only valid blocks.
 *
 * @param blocks - Array of potential blocks
 * @returns True if all items in the array are valid blocks
 *
 * @example
 * ```typescript
 * const blocks = [
 *   { type: 'section', text: { type: 'mrkdwn', text: 'Hello' } },
 *   { type: 'divider' }
 * ];
 *
 * if (validateBlocks(blocks)) {
 *   // Safe to use as blocks
 * }
 * ```
 */
export function validateBlocks(blocks: unknown[]): blocks is Block[] {
  return blocks.every((block) => isBlock(block));
}

/**
 * Filters an array to only include known block types.
 *
 * @param blocks - Array of blocks to filter
 * @returns Array containing only known block types
 *
 * @example
 * ```typescript
 * const blocks = [...];
 * const knownBlocks = filterKnownBlocks(blocks);
 * ```
 */
export function filterKnownBlocks(blocks: Block[]): KnownBlock[] {
  return blocks.filter(isKnownBlock);
}
