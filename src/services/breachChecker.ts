import { computeSha1Hex } from './cryptoService';
import { BreachCheckResult } from '../types/breach';

/**
 * Checks a password against Have I Been Pwned Pwned Passwords database
 * using the mathematically sound k-Anonymity model.
 *
 * Privacy Guarantee:
 * - Only the first 5 characters of the SHA-1 hash are transmitted.
 * - The remaining 35 characters of the hash and the plaintext password
 *   NEVER leave client-side browser memory.
 * - More than 500 distinct password hashes share each 5-character prefix,
 *   rendering it mathematically impossible for the external API or ISP
 *   to determine the user's password.
 */
export async function checkBreachedPassword(password: string): Promise<BreachCheckResult> {
  const startTime = performance.now();

  if (!password) {
    return {
      checked: false,
      isBreached: false,
      breachCount: 0,
      hashPrefix: '',
      hashSuffix: '',
      fullHashMasked: '',
      durationMs: 0,
      offline: false,
    };
  }

  try {
    // Step 1: Compute SHA-1 hash locally in browser using Web Crypto API
    const sha1Hex = (await computeSha1Hex(password)).toUpperCase();
    const prefix = sha1Hex.substring(0, 5);
    const suffix = sha1Hex.substring(5);
    const maskedHash = `${prefix}***********************************`;

    // Step 2: Transmit ONLY the 5-character prefix to HIBP k-Anonymity range API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'Add-Padding': 'true', // Prevents response size side-channel analysis
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HIBP API returned HTTP ${response.status}`);
    }

    const responseText = await response.text();
    const lines = responseText.split('\r\n');

    // Step 3: Match the 35-character suffix locally in browser memory
    let breachCount = 0;
    let isBreached = false;

    for (const line of lines) {
      const [returnedSuffix, countStr] = line.trim().split(':');
      if (returnedSuffix && returnedSuffix.toUpperCase() === suffix) {
        breachCount = parseInt(countStr, 10) || 0;
        isBreached = breachCount > 0;
        break;
      }
    }

    const durationMs = Math.round(performance.now() - startTime);

    return {
      checked: true,
      isBreached,
      breachCount,
      hashPrefix: prefix,
      hashSuffix: suffix,
      fullHashMasked: maskedHash,
      durationMs,
      offline: false,
    };
  } catch (err: unknown) {
    const durationMs = Math.round(performance.now() - startTime);
    const errorMessage = err instanceof Error ? err.message : 'Network error';

    return {
      checked: false,
      isBreached: false,
      breachCount: 0,
      hashPrefix: '',
      hashSuffix: '',
      fullHashMasked: '',
      durationMs,
      offline: true,
      error: `Breach check failed (${errorMessage}). Analysis completed safely offline.`,
    };
  }
}

