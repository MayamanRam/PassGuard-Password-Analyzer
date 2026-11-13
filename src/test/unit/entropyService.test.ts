import { describe, it, expect } from 'vitest';
import {
  analyzeComposition,
  calculateShannonEntropy,
  calculateEntropy,
} from '../../services/entropyService';

describe('EntropyService - Mathematical Entropy Models', () => {
  it('correctly calculates character pools and composition', () => {
    const comp1 = analyzeComposition('Abc123!@#');
    expect(comp1.length).toBe(9);
    expect(comp1.uppercase).toBe(1);
    expect(comp1.lowercase).toBe(2);
    expect(comp1.numbers).toBe(3);
    expect(comp1.symbols).toBe(3);
    expect(comp1.spaces).toBe(0);
    expect(comp1.poolSize).toBe(26 + 26 + 10 + 33); // 95
  });

  it('handles empty string safely', () => {
    const comp = analyzeComposition('');
    expect(comp.length).toBe(0);
    expect(comp.poolSize).toBe(1);
    expect(comp.uniqueCount).toBe(0);

    const entropy = calculateEntropy('', 0, comp);
    expect(entropy.theoreticalEntropyBits).toBe(0);
    expect(entropy.effectiveEntropyBits).toBe(0);
    expect(entropy.entropyRating).toBe('Critical');
  });

  it('correctly calculates Shannon entropy penalizing identical repeats', () => {
    const repeats = calculateShannonEntropy('aaaaaaaaaaaa'); // 1 unique char repeated 12 times
    expect(repeats).toBe(0); // 0 bits of information

    const diverse = calculateShannonEntropy('abcdefghijkl'); // 12 unique chars
    expect(diverse).toBeGreaterThan(40);
  });

  it('assigns correct entropy ratings based on effective bits', () => {
    const comp = analyzeComposition('dummy');
    
    // Very High >= 100 bits
    const vhigh = calculateEntropy('dummy', Math.pow(2, 105), comp);
    expect(vhigh.entropyRating).toBe('Very High');

    // High 80 - 99 bits
    const high = calculateEntropy('dummy', Math.pow(2, 85), comp);
    expect(high.entropyRating).toBe('High');

    // Moderate 60 - 79 bits
    const mod = calculateEntropy('dummy', Math.pow(2, 65), comp);
    expect(mod.entropyRating).toBe('Moderate');

    // Low 36 - 59 bits
    const low = calculateEntropy('dummy', Math.pow(2, 45), comp);
    expect(low.entropyRating).toBe('Low');

    // Critical < 36 bits
    const crit = calculateEntropy('dummy', Math.pow(2, 20), comp);
    expect(crit.entropyRating).toBe('Critical');
  });
});

