import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkBreachedPassword } from '../../services/breachChecker';

describe('BreachChecker - k-Anonymity Privacy Model', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('transmits ONLY the 5-character prefix and never the plaintext or full hash', async () => {
    let capturedUrl = '';
    const secretPassword = 'MySecretCustomVaultKey2026!';
    // Mock fetch for HIBP range API
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      capturedUrl = url;
      // Extract the 5-char prefix from URL to mock the response
      const prefixMatch = url.match(/\/range\/([A-Fa-f0-9]{5})$/);
      expect(prefixMatch).not.toBeNull();
      return {
        ok: true,
        status: 200,
        text: async () => '1E4C9B93F3F0682250B6CF8331B7EE68FD8:12345\r\n00000000000000000000000000000000000:1',
      } as Response;
    });

    const result = await checkBreachedPassword(secretPassword);

    // 1. Verify URL ends with exactly 5 hex characters after /range/
    const urlMatch = capturedUrl.match(/\/range\/([A-Fa-f0-9]{5})$/);
    expect(urlMatch).not.toBeNull();
    const transmittedPrefix = urlMatch![1];
    expect(transmittedPrefix.length).toBe(5);

    // 2. Strict verification: ensure plaintext password is NOT anywhere in the request URL
    expect(capturedUrl).not.toContain(secretPassword);

    // 3. Strict verification: ensure full 40-character hash is NOT in the URL
    expect(capturedUrl.length).toBeLessThan(50);

    // 4. Verify result object contains correct prefix and suffix metadata
    expect(result.checked).toBe(true);
    expect(result.hashPrefix.length).toBe(5);
    expect(result.hashSuffix.length).toBe(35);
  });

  it('reports not breached when suffix is not found in returned range', async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        text: async () => '00000000000000000000000000000000000:1\r\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF:2',
      } as Response;
    });

    const result = await checkBreachedPassword('UniqUeP@ssw0rd999!');
    expect(result.checked).toBe(true);
    expect(result.isBreached).toBe(false);
    expect(result.breachCount).toBe(0);
  });

  it('handles network error / offline state gracefully without crashing', async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      throw new Error('Failed to fetch (offline)');
    });

    const result = await checkBreachedPassword('anypassword');
    expect(result.checked).toBe(false);
    expect(result.offline).toBe(true);
    expect(result.error).toContain('offline');
  });
});
