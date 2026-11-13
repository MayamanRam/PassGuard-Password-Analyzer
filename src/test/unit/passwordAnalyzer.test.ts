import { describe, it, expect } from 'vitest';
import { analyzePassword } from '../../services/passwordAnalyzer';

describe('PasswordAnalyzer - Real-Time Strength & Pattern Detection', () => {
  it('handles empty input gracefully without errors', () => {
    const res = analyzePassword('');
    expect(res.score).toBe(0);
    expect(res.label).toBe('Very Weak');
    expect(res.guesses).toBe(0);
    expect(res.composition.length).toBe(0);
    expect(res.patterns).toEqual([]);
    expect(res.isCommonPassword).toBe(false);
  });

  it('classifies very short passwords as Very Weak or Weak', () => {
    const res = analyzePassword('aB1!');
    expect(res.score).toBeLessThanOrEqual(1);
    expect(res.composition.length).toBe(4);
    expect(res.suggestions.length).toBeGreaterThan(0);
  });

  it('detects common breached passwords and forces score 0', () => {
    const commonPasswords = ['password', '123456', 'qwerty', 'admin123', 'iloveyou', 'dragon'];
    for (const pwd of commonPasswords) {
      const res = analyzePassword(pwd);
      expect(res.score).toBe(0);
      expect(res.label).toBe('Very Weak');
      expect(res.isCommonPassword).toBe(true);
      expect(res.warning).toBeDefined();
    }
  });

  it('detects trivial variations of common passwords (e.g., password2024)', () => {
    const res = analyzePassword('password2024');
    expect(res.isCommonPassword).toBe(true);
    expect(res.score).toBeLessThanOrEqual(1);
  });

  it('flags repeated characters pattern (e.g. "aaaaa")', () => {
    const res = analyzePassword('aaaaa123');
    const repeatPattern = res.patterns.find((p) => p.type === 'repeat');
    expect(repeatPattern).toBeDefined();
    expect(repeatPattern?.matchedText).toContain('aaaaa');
  });

  it('flags sequential characters pattern (e.g. "123456", "abcdef")', () => {
    const resNum = analyzePassword('test123456!');
    const seqNumPattern = resNum.patterns.find((p) => p.type === 'sequence');
    expect(seqNumPattern).toBeDefined();

    const resAlpha = analyzePassword('secure-abcdef-pass');
    const seqAlphaPattern = resAlpha.patterns.find((p) => p.type === 'sequence');
    expect(seqAlphaPattern).toBeDefined();
  });

  it('flags spatial keyboard walks (e.g. "qwerty")', () => {
    const res = analyzePassword('myqwertykey');
    const spatialPattern = res.patterns.find((p) => p.type === 'spatial');
    expect(spatialPattern).toBeDefined();
  });

  it('flags calendar year patterns (e.g. "2024")', () => {
    const res = analyzePassword('Winter2024!');
    const datePattern = res.patterns.find((p) => p.type === 'date');
    expect(datePattern).toBeDefined();
    expect(datePattern?.matchedText).toBe('2024');
  });

  it('flags l33t speak substitutions', () => {
    const res = analyzePassword('P@ssw0rd!');
    const l33tPattern = res.patterns.find((p) => p.type === 'l33t');
    expect(l33tPattern).toBeDefined();
  });

  it('evaluates strong, long random passwords with score 4 (Very Strong)', () => {
    // 32 characters with high entropy
    const res = analyzePassword('k9#mP$2vL!8qW^5xZ*3yN&7tR@4tB%9w');
    expect(res.score).toBe(4);
    expect(res.label).toBe('Very Strong');
    expect(res.entropy.effectiveEntropyBits).toBeGreaterThan(80);
    expect(res.isCommonPassword).toBe(false);
  });

  it('handles Unicode and international characters without crashing', () => {
    const res = analyzePassword('München🔒ÜberPass2026!');
    expect(res.composition.length).toBeGreaterThan(15);
    expect(res.score).toBeGreaterThanOrEqual(3);
  });

  it('handles massive 2,000+ character input safely without freezing or crashing', () => {
    const massive = 'A1!b'.repeat(500); // 2000 chars
    const startTime = performance.now();
    const res = analyzePassword(massive);
    const duration = performance.now() - startTime;

    expect(res.composition.length).toBe(2000);
    expect(res.label).toBeDefined();
    expect(duration).toBeLessThan(5000); // Verify no ReDoS hanging or infinite loops
  });
});
