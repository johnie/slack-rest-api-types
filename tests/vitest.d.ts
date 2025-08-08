import 'vitest';

declare module 'vitest' {
  interface CustomMatchers<R = unknown> {
    toBeSlackId(): R;
    toBeSlackTimestamp(): R;
  }

  interface Assertion<T> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
