import '@testing-library/jest-dom';

// Ensure crypto is globally available in jsdom testing environment
if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
  const nodeCrypto = await import('crypto');
  // @ts-expect-error type polyfill for jsdom
  globalThis.crypto = nodeCrypto.webcrypto;
}
