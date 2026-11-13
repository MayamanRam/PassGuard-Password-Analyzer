import { EFF_WORDLIST, calculatePassphraseTheoreticalEntropy } from '../constants/wordlists/effWordlist';
import { PassphraseOptions, GeneratedPassphraseItem, PassphraseSeparator } from '../types/passphrase';
import { getSecureRandomInt, getSecureRandomElement } from './cryptoService';
import { formatSecondsToTime } from '../constants/attackProfiles';

const SEPARATORS: readonly string[] = ['-', '_', '.', ' ', '/', '#', '$'];

export const DEFAULT_PASSPHRASE_OPTIONS: PassphraseOptions = {
  wordCount: 4,
  separator: '-',
  capitalization: 'titlecase',
  includeNumber: true,
  numberPosition: 'end',
  count: 1,
};

/**
 * Capitalizes a word according to the chosen style
 */
function applyCapitalization(word: string, style: PassphraseOptions['capitalization']): string {
  switch (style) {
    case 'lowercase':
      return word.toLowerCase();
    case 'uppercase':
      return word.toUpperCase();
    case 'titlecase':
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    case 'random':
      return getSecureRandomInt(2) === 1
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase();
    default:
      return word;
  }
}

/**
 * Resolves separator to use
 */
function resolveSeparator(pref: PassphraseSeparator): string {
  if (pref === 'random') {
    return getSecureRandomElement(SEPARATORS);
  }
  return pref;
}

/**
 * Generates a single cryptographically secure passphrase
 */
export function generatePassphrase(options: Partial<PassphraseOptions> = {}): GeneratedPassphraseItem {
  const opts: PassphraseOptions = { ...DEFAULT_PASSPHRASE_OPTIONS, ...options };
  const wordCount = Math.max(3, Math.min(10, opts.wordCount || 4));
  const wordlistSize = EFF_WORDLIST.length;

  // Select words uniformly at random using Web Crypto API
  const selectedWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = getSecureRandomInt(wordlistSize);
    const word = EFF_WORDLIST[randomIndex];
    selectedWords.push(applyCapitalization(word, opts.capitalization));
  }

  const separator = resolveSeparator(opts.separator);

  // Optional number inclusion (00 - 999)
  let numberStr = '';
  if (opts.includeNumber) {
    const randomNum = getSecureRandomInt(100); // 0-99
    numberStr = String(randomNum).padStart(2, '0');
  }

  // Position the number
  let finalPassphrase = '';
  if (opts.includeNumber && numberStr) {
    if (opts.numberPosition === 'start') {
      finalPassphrase = [numberStr, ...selectedWords].join(separator);
    } else if (opts.numberPosition === 'end') {
      finalPassphrase = [...selectedWords, numberStr].join(separator);
    } else {
      // Random position
      const insertIdx = getSecureRandomInt(selectedWords.length + 1);
      const wordsCopy = [...selectedWords];
      wordsCopy.splice(insertIdx, 0, numberStr);
      finalPassphrase = wordsCopy.join(separator);
    }
  } else {
    finalPassphrase = selectedWords.join(separator);
  }

  const entropyBits = calculatePassphraseTheoreticalEntropy(
    wordCount,
    wordlistSize,
    Boolean(separator),
    opts.includeNumber,
    opts.capitalization !== 'lowercase'
  );

  // Estimate crack time assuming 10 billion guesses/sec (offline GPU cluster)
  const totalPossibilities = Math.pow(2, entropyBits);
  const secondsOfflineFast = totalPossibilities / 10_000_000_000;
  const crackTimeEstimate = formatSecondsToTime(secondsOfflineFast);

  return {
    id: `${Date.now()}-${getSecureRandomInt(100000)}`,
    passphrase: finalPassphrase,
    words: selectedWords,
    separatorUsed: separator,
    wordCount,
    entropyBits,
    crackTimeEstimate,
  };
}

/**
 * Generates a batch of passphrases
 */
export function generatePassphraseBatch(
  options: Partial<PassphraseOptions> = {}
): GeneratedPassphraseItem[] {
  const opts: PassphraseOptions = { ...DEFAULT_PASSPHRASE_OPTIONS, ...options };
  const count = Math.max(1, Math.min(20, opts.count || 1));
  const results: GeneratedPassphraseItem[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generatePassphrase(opts));
  }

  return results;
}
