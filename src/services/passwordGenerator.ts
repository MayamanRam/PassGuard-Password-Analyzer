import { PasswordGeneratorOptions, GeneratedPasswordItem } from '../types/generator';
import { getSecureRandomElement, secureShuffle } from './cryptoService';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?~';

// Ambiguous characters often misread on screens or print
const AMBIGUOUS_CHARS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

// Similar / punctuation characters that can break shell commands or be confusing
const SIMILAR_CHARS = new Set(['{', '}', '[', ']', '(', ')', '/', '\\', '\'', '"', '`', '~', ',', ';', ':', '.', '<', '>']);

export const DEFAULT_GENERATOR_OPTIONS: PasswordGeneratorOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
  excludeSimilar: false,
  requireAllSelected: true,
  count: 1,
};

/**
 * Filters a character string based on user exclusion preferences
 */
function filterCharset(
  chars: string,
  excludeAmbiguous: boolean,
  excludeSimilar: boolean
): string {
  let result = '';
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (excludeAmbiguous && AMBIGUOUS_CHARS.has(c)) {
      continue;
    }
    if (excludeSimilar && SIMILAR_CHARS.has(c)) {
      continue;
    }
    result += c;
  }
  return result;
}

/**
 * Generates a single cryptographically secure password based on provided options.
 * Uses Web Crypto API with unbiased rejection sampling.
 */
export function generatePassword(options: Partial<PasswordGeneratorOptions> = {}): string {
  const opts: PasswordGeneratorOptions = { ...DEFAULT_GENERATOR_OPTIONS, ...options };

  const length = Math.max(8, Math.min(128, opts.length || 16));

  const upper = opts.includeUppercase
    ? filterCharset(UPPERCASE_CHARS, opts.excludeAmbiguous, opts.excludeSimilar)
    : '';
  const lower = opts.includeLowercase
    ? filterCharset(LOWERCASE_CHARS, opts.excludeAmbiguous, opts.excludeSimilar)
    : '';
  const numbers = opts.includeNumbers
    ? filterCharset(NUMBER_CHARS, opts.excludeAmbiguous, opts.excludeSimilar)
    : '';
  const symbols = opts.includeSymbols
    ? filterCharset(SYMBOL_CHARS, opts.excludeAmbiguous, opts.excludeSimilar)
    : '';

  const activeCharsets: string[] = [];
  if (upper.length > 0) activeCharsets.push(upper);
  if (lower.length > 0) activeCharsets.push(lower);
  if (numbers.length > 0) activeCharsets.push(numbers);
  if (symbols.length > 0) activeCharsets.push(symbols);

  if (activeCharsets.length === 0) {
    throw new Error('At least one character set must be selected');
  }

  // Combined full pool
  const fullPool = activeCharsets.join('');
  const passwordChars: string[] = [];

  // Guarantee at least 1 character from each selected class if requested
  if (opts.requireAllSelected) {
    for (const set of activeCharsets) {
      if (passwordChars.length < length) {
        passwordChars.push(getSecureRandomElement(set.split('')));
      }
    }
  }

  // Fill remaining slots uniformly from the full pool
  const poolArray = fullPool.split('');
  while (passwordChars.length < length) {
    passwordChars.push(getSecureRandomElement(poolArray));
  }

  // Cryptographically secure Fisher-Yates shuffle to avoid predictable leading positions
  secureShuffle(passwordChars);

  return passwordChars.join('');
}

/**
 * Generates a batch of passwords
 */
export function generatePasswordBatch(
  options: Partial<PasswordGeneratorOptions> = {}
): GeneratedPasswordItem[] {
  const opts: PasswordGeneratorOptions = { ...DEFAULT_GENERATOR_OPTIONS, ...options };
  const count = Math.max(1, Math.min(50, opts.count || 1));

  const results: GeneratedPasswordItem[] = [];

  for (let i = 0; i < count; i++) {
    const password = generatePassword(opts);

    // Calculate approximate pool size for entropy calculation
    let poolSize = 0;
    if (opts.includeUppercase) poolSize += 26;
    if (opts.includeLowercase) poolSize += 26;
    if (opts.includeNumbers) poolSize += 10;
    if (opts.includeSymbols) poolSize += 33;
    if (opts.excludeAmbiguous) poolSize -= 6;
    if (poolSize <= 0) poolSize = 26;

    const entropy = Number((password.length * Math.log2(poolSize)).toFixed(1));

    let score: 0 | 1 | 2 | 3 | 4 = 4;
    let label = 'Very Strong';
    if (entropy < 40) {
      score = 1;
      label = 'Weak';
    } else if (entropy < 60) {
      score = 2;
      label = 'Moderate';
    } else if (entropy < 80) {
      score = 3;
      label = 'Strong';
    }

    results.push({
      id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
      password,
      entropy,
      score,
      label,
      createdAt: Date.now(),
    });
  }

  return results;
}

