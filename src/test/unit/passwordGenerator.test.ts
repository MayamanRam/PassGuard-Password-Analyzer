import { describe, it, expect } from 'vitest';
import { generatePassword, generatePasswordBatch } from '../../services/passwordGenerator';

describe('PasswordGenerator - Secure CSPRNG Generation', () => {
  it('generates passwords of exact requested lengths', () => {
    const lengths = [8, 12, 16, 24, 32, 64, 128];
    for (const len of lengths) {
      const pwd = generatePassword({ length: len });
      expect(pwd.length).toBe(len);
    }
  });

  it('clamps length between 8 and 128 characters', () => {
    const minClamped = generatePassword({ length: 4 });
    expect(minClamped.length).toBe(8);

    const maxClamped = generatePassword({ length: 250 });
    expect(maxClamped.length).toBe(128);
  });

  it('guarantees at least 1 character from each selected class when requireAllSelected is true', () => {
    for (let i = 0; i < 50; i++) {
      const pwd = generatePassword({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        requireAllSelected: true,
      });

      expect(/[A-Z]/.test(pwd)).toBe(true);
      expect(/[a-z]/.test(pwd)).toBe(true);
      expect(/[0-9]/.test(pwd)).toBe(true);
      expect(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?~]/.test(pwd)).toBe(true);
    }
  });

  it('strictly excludes ambiguous characters when requested', () => {
    const ambiguous = new Set(['0', 'O', 'o', '1', 'l', 'I']);
    for (let i = 0; i < 50; i++) {
      const pwd = generatePassword({
        length: 32,
        excludeAmbiguous: true,
      });

      for (const char of pwd) {
        expect(ambiguous.has(char)).toBe(false);
      }
    }
  });

  it('throws an error if all character sets are disabled', () => {
    expect(() =>
      generatePassword({
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      })
    ).toThrow('At least one character set must be selected');
  });

  it('generates batch of unique passwords with correct metadata', () => {
    const batch = generatePasswordBatch({ count: 10, length: 20 });
    expect(batch.length).toBe(10);

    const uniqueSet = new Set(batch.map((b) => b.password));
    expect(uniqueSet.size).toBe(10); // All 10 are unique

    for (const item of batch) {
      expect(item.password.length).toBe(20);
      expect(item.entropy).toBeGreaterThan(60);
      expect(item.score).toBeGreaterThanOrEqual(3);
    }
  });
});

