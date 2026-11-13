export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4;

export type PasswordStrengthLabel =
  | 'Very Weak'
  | 'Weak'
  | 'Moderate'
  | 'Strong'
  | 'Very Strong';

export interface CharacterComposition {
  length: number;
  uppercase: number;
  lowercase: number;
  numbers: number;
  symbols: number;
  spaces: number;
  uniqueCount: number;
  poolSize: number;
}

export interface PatternMatch {
  type: 'repeat' | 'sequence' | 'dictionary' | 'l33t' | 'spatial' | 'common' | 'date';
  pattern: string;
  matchedText: string;
  startIndex: number;
  endIndex: number;
  explanation: string;
}

export interface CrackTimeEstimates {
  onlineThrottled: string;     // 100/hour (e.g. cloud lockouts)
  onlineStandard: string;      // 10/second (e.g. typical unthrottled web form)
  offlineSlowHash: string;     // 10,000/sec (bcrypt cost 12 / Argon2id)
  offlineFastHash: string;     // 100,000,000,000/sec (MD5 / NTLM / unshaded on high-end 8x RTX 4090 rig)
}

export interface EntropyAnalysis {
  theoreticalEntropyBits: number;   // L * log2(Pool)
  shannonEntropyBits: number;       // Classical information theory -sum(p * log2(p))
  effectiveEntropyBits: number;     // Realistic search space based on zxcvbn guesses (log2(guesses))
  entropyRating: 'Critical' | 'Low' | 'Moderate' | 'High' | 'Very High';
  poolSize: number;
}

export interface PasswordAnalysisResult {
  password: string;
  score: PasswordStrengthScore;
  label: PasswordStrengthLabel;
  guesses: number;
  guessesLog10: number;
  crackTimes: CrackTimeEstimates;
  composition: CharacterComposition;
  entropy: EntropyAnalysis;
  patterns: PatternMatch[];
  warning?: string;
  suggestions: string[];
  isCommonPassword: boolean;
  commonRank?: number;
  analyzedAt: number;
}

