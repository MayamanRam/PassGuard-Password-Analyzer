export interface AttackScenario {
  id: string;
  name: string;
  category: 'online' | 'offline';
  guessesPerSecond: number;
  description: string;
  hardwareAssumption: string;
  mitigation: string;
}

export const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'online-throttled',
    name: 'Online Service (Strictly Rate-Limited)',
    category: 'online',
    guessesPerSecond: 100 / 3600, // ~0.0277 guesses/sec (100 per hour, e.g. strict lockout/CAPTCHA)
    description: 'Cloud service with IP reputation, progressive delays, and account lockouts.',
    hardwareAssumption: 'Single or distributed botnet hitting a defended web endpoint.',
    mitigation: 'Account lockout policies, CAPTCHAs, risk-based authentication.',
  },
  {
    id: 'online-unthrottled',
    name: 'Online Service (Unthrottled API)',
    category: 'online',
    guessesPerSecond: 10, // 10 guesses/sec
    description: 'Vulnerable public API or login endpoint without adequate rate-limiting.',
    hardwareAssumption: 'Distributed credential stuffing or parallel HTTP requests.',
    mitigation: 'Implement IP and user-agent rate limits, Web Application Firewall (WAF).',
  },
  {
    id: 'offline-slow-hash',
    name: 'Offline Slow Hash (bcrypt / Argon2id)',
    category: 'offline',
    guessesPerSecond: 10_000, // 10k guesses/sec
    description: 'Attacker obtained a leaked database hashed with modern memory-hard KDFs (bcrypt cost 12 or Argon2id).',
    hardwareAssumption: 'Dedicated GPU cracking rig (e.g. 8x NVIDIA RTX 4090).',
    mitigation: 'Use Argon2id, bcrypt (cost >= 12), or scrypt with sufficient work factor.',
  },
  {
    id: 'offline-fast-hash',
    name: 'Offline Fast Hash (MD5 / NTLM / SHA-256)',
    category: 'offline',
    guessesPerSecond: 100_000_000_000, // 100 Billion guesses/sec
    description: 'Attacker obtained unshaded fast hashes (MD5, NTLM, or single-iteration SHA-256).',
    hardwareAssumption: 'Multi-GPU cluster or specialized Hashcat distributed cloud cluster.',
    mitigation: 'Never use MD5, SHA-1, or unsalted SHA-256 for password storage; upgrade to Argon2id.',
  },
];

/**
 * Formats seconds into human-readable duration
 */
export function formatSecondsToTime(seconds: number): string {
  if (!isFinite(seconds) || seconds > 1e18) {
    return 'Centuries+ (> 1 billion years)';
  }
  if (seconds < 1e-4) {
    return 'Instant (< 1 millisecond)';
  }
  if (seconds < 1) {
    return '< 1 second';
  }
  if (seconds < 60) {
    return `${Math.round(seconds)} seconds`;
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.round(minutes)} minutes`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.round(hours)} hours`;
  }
  const days = hours / 24;
  if (days < 30) {
    return `${Math.round(days)} days`;
  }
  const months = days / 30.44;
  if (months < 12) {
    return `${Math.round(months)} months`;
  }
  const years = days / 365.25;
  if (years < 1000) {
    return `${Math.round(years)} years`;
  }
  if (years < 1_000_000) {
    return `${(years / 1000).toFixed(1)} thousand years`;
  }
  if (years < 1_000_000_000) {
    return `${(years / 1_000_000).toFixed(1)} million years`;
  }
  return `${(years / 1_000_000_000).toFixed(1)} billion years`;
}
