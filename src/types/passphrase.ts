export type PassphraseSeparator = '-' | '_' | '.' | ' ' | '/' | '#' | '$' | '' | 'random';

export type PassphraseCapitalization = 'lowercase' | 'titlecase' | 'uppercase' | 'random';

export interface PassphraseOptions {
  wordCount: number;                       // 3 - 10
  separator: PassphraseSeparator;
  capitalization: PassphraseCapitalization;
  includeNumber: boolean;                  // append, prepend or embed a number
  numberPosition: 'end' | 'start' | 'random';
  count: number;                           // batch (1 - 20)
}

export interface GeneratedPassphraseItem {
  id: string;
  passphrase: string;
  words: string[];
  separatorUsed: string;
  wordCount: number;
  entropyBits: number;
  crackTimeEstimate: string;
}

