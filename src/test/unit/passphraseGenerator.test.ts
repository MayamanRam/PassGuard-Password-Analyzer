import { describe, it, expect } from 'vitest';
import { generatePassphrase, generatePassphraseBatch } from '../../services/passphraseGenerator';
import { EFF_WORDLIST, calculatePassphraseTheoreticalEntropy } from '../../constants/wordlists/effWordlist';

describe('PassphraseGenerator - EFF Diceware Passphrases', () => {
  it('generates passphrases with the exact requested word count', () => {
    const wordCounts = [3, 4, 5, 6, 8, 10];
    for (const count of wordCounts) {
      const res = generatePassphrase({ wordCount: count, includeNumber: false });
      expect(res.words.length).toBe(count);
      expect(res.wordCount).toBe(count);
    }
  });

  it('correctly uses custom separators', () => {
    const resHyphen = generatePassphrase({ separator: '-', includeNumber: false });
    expect(resHyphen.passphrase.includes('-')).toBe(true);

    const resUnderscore = generatePassphrase({ separator: '_', includeNumber: false });
    expect(resUnderscore.passphrase.includes('_')).toBe(true);

    const resDot = generatePassphrase({ separator: '.', includeNumber: false });
    expect(resDot.passphrase.includes('.')).toBe(true);
  });

  it('applies capitalization styles accurately', () => {
    const resLower = generatePassphrase({ capitalization: 'lowercase', includeNumber: false, separator: '-' });
    expect(resLower.passphrase).toBe(resLower.passphrase.toLowerCase());

    const resUpper = generatePassphrase({ capitalization: 'uppercase', includeNumber: false, separator: '-' });
    expect(resUpper.passphrase).toBe(resUpper.passphrase.toUpperCase());

    const resTitle = generatePassphrase({ capitalization: 'titlecase', includeNumber: false });
    for (const word of resTitle.words) {
      expect(word[0]).toBe(word[0].toUpperCase());
      expect(word.slice(1)).toBe(word.slice(1).toLowerCase());
    }
  });

  it('embeds random numbers at specified positions', () => {
    const resEnd = generatePassphrase({ includeNumber: true, numberPosition: 'end', separator: '-' });
    const endParts = resEnd.passphrase.split('-');
    const lastPart = endParts[endParts.length - 1];
    expect(/^\d{2}$/.test(lastPart)).toBe(true);

    const resStart = generatePassphrase({ includeNumber: true, numberPosition: 'start', separator: '-' });
    const startParts = resStart.passphrase.split('-');
    expect(/^\d{2}$/.test(startParts[0])).toBe(true);
  });

  it('calculates theoretical entropy accurately based on wordlist size', () => {
    // 4 words with 1000+ EFF wordlist: > 40 bits
    const entropy4 = calculatePassphraseTheoreticalEntropy(4, EFF_WORDLIST.length);
    expect(entropy4).toBeGreaterThan(40);

    const entropy6 = calculatePassphraseTheoreticalEntropy(6, EFF_WORDLIST.length);
    expect(entropy6).toBeGreaterThan(60);
  });

  it('generates a batch of unique passphrases', () => {
    const batch = generatePassphraseBatch({ count: 5 });
    expect(batch.length).toBe(5);
    const unique = new Set(batch.map((b) => b.passphrase));
    expect(unique.size).toBe(5);
  });
});

