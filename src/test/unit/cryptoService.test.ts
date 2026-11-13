import { describe, it, expect, vi } from 'vitest';
import {
  getSecureRandomInt,
  getSecureRandomElement,
  secureShuffle,
  getSecureRandomInts,
  computeSha1Hex,
} from '../../services/cryptoService';

describe('CryptoService - Cryptographic Randomness & Web Crypto API', () => {
  it('generates random integers strictly within [0, maxExclusive)', () => {
    const max = 10;
    for (let i = 0; i < 500; i++) {
      const val = getSecureRandomInt(max);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(max);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  it('handles boundary condition maxExclusive = 1 correctly', () => {
    expect(getSecureRandomInt(1)).toBe(0);
  });

  it('throws an error if maxExclusive is <= 0', () => {
    expect(() => getSecureRandomInt(0)).toThrow();
    expect(() => getSecureRandomInt(-5)).toThrow();
  });

  it('never calls Math.random during secure random generation', () => {
    const mathRandomSpy = vi.spyOn(Math, 'random');
    getSecureRandomInt(50);
    getSecureRandomInts(20, 100);
    expect(mathRandomSpy).not.toHaveBeenCalled();
    mathRandomSpy.mockRestore();
  });

  it('correctly samples elements from an array uniformly', () => {
    const items = ['alpha', 'bravo', 'charlie', 'delta'];
    const sampled = new Set<string>();

    for (let i = 0; i < 100; i++) {
      const el = getSecureRandomElement(items);
      expect(items).toContain(el);
      sampled.add(el);
    }

    // Over 100 samples with 4 elements, all 4 should be observed
    expect(sampled.size).toBe(items.length);
  });

  it('throws when sampling from an empty array', () => {
    expect(() => getSecureRandomElement([])).toThrow();
  });

  it('shuffles arrays without losing or duplicating elements', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const copy = [...original];
    const shuffled = secureShuffle(copy);

    expect(shuffled.length).toBe(original.length);
    expect([...shuffled].sort((a, b) => a - b)).toEqual(original);
  });

  it('computes known standard SHA-1 hex digests accurately', async () => {
    // Known NIST/RFC test vectors:
    // SHA-1("password") = 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
    const hash1 = await computeSha1Hex('password');
    expect(hash1).toBe('5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

    // SHA-1("admin") = d033e22ae348aeb5660fc2140aec35850c4da997
    const hash2 = await computeSha1Hex('admin');
    expect(hash2).toBe('d033e22ae348aeb5660fc2140aec35850c4da997');

    // SHA-1("") = da39a3ee5e6b4b0d3255bfef95601890afd80709
    const hashEmpty = await computeSha1Hex('');
    expect(hashEmpty).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });
});

