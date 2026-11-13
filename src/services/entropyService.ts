import { CharacterComposition, EntropyAnalysis } from '../types/analyzer';

/**
 * Calculates character pool size and composition from password
 */
export function analyzeComposition(password: string): CharacterComposition {
  const length = password.length;
  let uppercase = 0;
  let lowercase = 0;
  let numbers = 0;
  let symbols = 0;
  let spaces = 0;
  const uniqueChars = new Set<string>();

  for (let i = 0; i < length; i++) {
    const char = password[i];
    uniqueChars.add(char);

    if (/[A-Z]/.test(char)) {
      uppercase++;
    } else if (/[a-z]/.test(char)) {
      lowercase++;
    } else if (/[0-9]/.test(char)) {
      numbers++;
    } else if (/\s/.test(char)) {
      spaces++;
    } else {
      symbols++;
    }
  }

  // Calculate pool size R based on character sets present
  let poolSize = 0;
  if (lowercase > 0) poolSize += 26;
  if (uppercase > 0) poolSize += 26;
  if (numbers > 0) poolSize += 10;
  if (symbols > 0) poolSize += 33; // standard ASCII punctuation
  if (spaces > 0) poolSize += 1;

  // Handle extended Unicode if present
  const extendedChars = password.replace(/[\x20-\x7E]/g, '');
  if (extendedChars.length > 0) {
    poolSize += 128; // conservative estimate for non-ASCII charset pool
  }

  return {
    length,
    uppercase,
    lowercase,
    numbers,
    symbols,
    spaces,
    uniqueCount: uniqueChars.size,
    poolSize: poolSize > 0 ? poolSize : 1,
  };
}

/**
 * Calculates Shannon entropy per character and total Shannon entropy for the password string:
 * H = - sum(p(x) * log2(p(x)))
 * Total bits = L * H
 */
export function calculateShannonEntropy(password: string): number {
  if (!password || password.length === 0) return 0;

  const len = password.length;
  const frequencies = new Map<string, number>();

  for (let i = 0; i < len; i++) {
    const char = password[i];
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }

  let shannonPerChar = 0;
  for (const count of frequencies.values()) {
    const p = count / len;
    shannonPerChar -= p * Math.log2(p);
  }

  const totalBits = len * shannonPerChar;
  return Number(totalBits.toFixed(2));
}

/**
 * Calculates complete entropy analysis:
 * - Theoretical Hartley entropy: L * log2(R)
 * - Shannon entropy: internal information density
 * - Effective entropy: log2(guesses) from pattern recognition
 */
export function calculateEntropy(
  password: string,
  guesses: number,
  composition: CharacterComposition
): EntropyAnalysis {
  if (!password || password.length === 0) {
    return {
      theoreticalEntropyBits: 0,
      shannonEntropyBits: 0,
      effectiveEntropyBits: 0,
      entropyRating: 'Critical',
      poolSize: 0,
    };
  }

  // Theoretical Hartley entropy
  const theoretical = composition.length * Math.log2(composition.poolSize);
  const shannon = calculateShannonEntropy(password);

  // Effective entropy based on realistic search space
  // Guesses >= 1
  const effective = Math.max(0, Math.log2(Math.max(1, guesses)));

  // Determine security rating based on effective entropy
  let rating: EntropyAnalysis['entropyRating'] = 'Critical';
  if (effective >= 100) {
    rating = 'Very High';
  } else if (effective >= 80) {
    rating = 'High';
  } else if (effective >= 60) {
    rating = 'Moderate';
  } else if (effective >= 36) {
    rating = 'Low';
  } else {
    rating = 'Critical';
  }

  return {
    theoreticalEntropyBits: Number(theoretical.toFixed(2)),
    shannonEntropyBits: shannon,
    effectiveEntropyBits: Number(effective.toFixed(2)),
    entropyRating: rating,
    poolSize: composition.poolSize,
  };
}

