import { describe, expect, it } from 'vitest';
import { slackIds, slackTimestamps } from './utils';

describe('Slack-specific Patterns', () => {
  describe('Custom matchers', () => {
    it('should validate Slack IDs with custom matcher', () => {
      // Valid Slack IDs
      expect(slackIds.channel).toBeSlackId();
      expect(slackIds.user).toBeSlackId();
      expect(slackIds.bot).toBeSlackId();
      expect(slackIds.team).toBeSlackId();

      // Invalid Slack IDs
      expect('invalid').not.toBeSlackId();
      expect('c1234567890').not.toBeSlackId(); // lowercase
      expect('1234567890').not.toBeSlackId(); // starts with number
      expect('C123').not.toBeSlackId(); // too short
    });

    it('should validate Slack timestamps with custom matcher', () => {
      // Valid timestamps
      expect(slackTimestamps.valid).toBeSlackTimestamp();
      expect('1609459200.000000').toBeSlackTimestamp();

      // Invalid timestamps
      expect('invalid').not.toBeSlackTimestamp();
      expect('1234567890').not.toBeSlackTimestamp(); // missing decimal part
      expect('1234567890.123').not.toBeSlackTimestamp(); // wrong decimal length
      expect('123456789.123456').not.toBeSlackTimestamp(); // wrong integer length
    });
  });

  describe('Slack ID patterns in types', () => {
    it('should work with realistic Slack ID patterns', () => {
      const channelIds = [
        'C1234567890', // Public channel
        'D1234567890', // DM
        'G1234567890', // Private channel/group
      ];

      const userIds = [
        'U1234567890', // Regular user
        'U0123456789', // Another user
        'USLACKBOT', // Slackbot
      ];

      const teamIds = ['T1234567890', 'T0123456789'];

      channelIds.forEach((id) => expect(id).toBeSlackId());
      userIds.forEach((id) => expect(id).toBeSlackId());
      teamIds.forEach((id) => expect(id).toBeSlackId());
    });

    it('should work with Slack timestamp patterns', () => {
      const timestamps = [
        '1234567890.123456',
        '1609459200.000000', // 2021-01-01
        '1640995200.123456', // 2022-01-01
      ];

      timestamps.forEach((ts) => expect(ts).toBeSlackTimestamp());
    });
  });

  describe('Slack API URL patterns', () => {
    it('should recognize common Slack API endpoints', () => {
      const endpoints = [
        'chat.postMessage',
        'conversations.list',
        'users.list',
        'files.upload',
        'auth.test',
        'team.info',
        'channels.list', // Legacy
        'groups.list', // Legacy
      ];

      endpoints.forEach((endpoint) => {
        expect(endpoint).toMatch(/^[a-z]+\.[a-zA-Z]+$/);
      });
    });
  });

  describe('Block Kit patterns', () => {
    it('should validate block types', () => {
      const blockTypes = [
        'section',
        'divider',
        'image',
        'actions',
        'context',
        'input',
        'file',
        'call',
        'header',
        'video',
      ];

      blockTypes.forEach((type) => {
        expect(type).toMatch(/^[a-z_]+$/);
      });
    });

    it('should validate element types', () => {
      const elementTypes = [
        'button',
        'checkboxes',
        'datepicker',
        'image',
        'multi_static_select',
        'overflow',
        'plain_text_input',
        'radio_buttons',
        'static_select',
        'timepicker',
        'url_text_input',
        'email_text_input',
        'number_input',
      ];

      elementTypes.forEach((type) => {
        expect(type).toMatch(/^[a-z_]+$/);
      });
    });
  });

  describe('Error patterns', () => {
    it('should recognize common Slack API errors', () => {
      const commonErrors = [
        'invalid_auth',
        'account_inactive',
        'token_revoked',
        'no_permission',
        'org_login_required',
        'user_is_bot',
        'user_is_restricted',
        'channel_not_found',
        'is_archived',
        'msg_too_long',
        'no_text',
        'rate_limited',
        'not_authed',
        'invalid_arg_name',
        'invalid_array_arg',
        'invalid_charset',
        'invalid_form_data',
        'invalid_post_type',
        'missing_post_type',
        'team_added_to_org',
        'upgrade_required',
        'request_timeout',
        'service_unavailable',
        'fatal_error',
        'internal_error',
      ];

      commonErrors.forEach((error) => {
        expect(error).toMatch(/^[a-z_]+$/);
      });
    });
  });
});
