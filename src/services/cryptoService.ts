/**
 * Cryptographically Secure Random Number Generator Service
 *
 * Implements rejection sampling using window.crypto.getRandomValues
 * to completely eliminate modulo bias.
 *
 * Math.random() is strictly prohibited across the entire PassGuard codebase.
 */

/**
 * Returns a cryptographically secure random integer in the range [0, maxExclusive).
 * Uses unbiased rejection sampling.
 *
 * @param maxExclusive Upper bound (exclusive). Must be > 0 and <= 2^32 - 1.
 */
export function getSecureRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) {
    throw new Error('maxExclusive must be greater than 0');
  }
  if (maxExclusive === 1) {
    return 0;
  }

  // 2^32 = 4294967296
  const MAX_UINT32 = 0x100000000;
  // Calculate rejection limit: largest multiple of maxExclusive <= MAX_UINT32
  const limit = MAX_UINT32 - (MAX_UINT32 % maxExclusive);

  const buffer = new Uint32Array(1);

  // Rejection sampling loop: discard any sample >= limit
  while (true) {
    crypto.getRandomValues(buffer);
    const candidate = buffer[0];
    if (candidate < limit) {
      return candidate % maxExclusive;
    }
  }
}

/**
 * Returns a random element from an array using cryptographically secure unbiased sampling.
 */
export function getSecureRandomElement<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new Error('Cannot sample from an empty array');
  }
  const index = getSecureRandomInt(array.length);
  return array[index];
}

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm
 * with cryptographically secure unbiased indices.
 */
export function secureShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Generates an array of secure random integers in the range [0, maxExclusive)
 */
export function getSecureRandomInts(count: number, maxExclusive: number): number[] {
  const result: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    result[i] = getSecureRandomInt(maxExclusive);
  }
  return result;
}

/**
 * Computes SHA-1 hash of a string using Web Crypto API.
 * Returns lowercase hex string (40 characters).
 */
export async function computeSha1Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
