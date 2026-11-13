export interface BreachCheckResult {
  checked: boolean;
  isBreached: boolean;
  breachCount: number;
  hashPrefix: string;       // 5 chars
  hashSuffix: string;       // 35 chars
  fullHashMasked: string;   // e.g. 5FD92***********************************
  durationMs: number;
  offline: boolean;
  error?: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'analyzer'
  | 'generator'
  | 'passphrase'
  | 'guide'
  | 'about';
