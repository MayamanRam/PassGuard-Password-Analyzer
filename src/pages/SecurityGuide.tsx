import React, { useState } from 'react';
import {
  BookOpen,
  Shield,
  Key,
  RefreshCw,
  Search,
  Lock,
  Smartphone,
  AlertTriangle,
  Fingerprint,
  Mail,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface GuideSection {
  id: string;
  number: number;
  title: string;
  category: 'threats' | 'defenses' | 'modern-auth';
  summary: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const SecurityGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'threats' | 'defenses' | 'modern-auth'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string>('vector-1');

  const guideSections: GuideSection[] = [
    {
      id: 'vector-1',
      number: 1,
      title: 'Password Attacks Fundamentals',
      category: 'threats',
      summary: 'How attackers obtain, crack, and weaponize passwords in the modern cyber landscape.',
      icon: <Key className="w-4 h-4 text-rose-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Password attacks rarely look like the movies where a terminal tries random strings on a visible login screen. In reality, cybercriminals deploy automated bots, leaked database dumps, and distributed GPU rigs to compromise millions of credentials simultaneously.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-white block font-semibold">The Attack Pipeline:</strong>
            <p className="text-slate-400">
              Breach at Company A &rarr; Hash database stolen &rarr; Offline cracking via Hashcat &rarr; Cleartext credentials compiled into combo-lists &rarr; Automated credential stuffing bots deployed against thousands of other websites.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'vector-2',
      number: 2,
      title: 'Brute-Force Attacks & Modern GPU Speeds',
      category: 'threats',
      summary: 'Exhaustive combinatorial guessing and how modern graphics hardware breaks short passwords in seconds.',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Pure brute-force tries every possible permutation of characters ($R^L$). While an online login form might throttle after 5 incorrect tries, an attacker with a stolen database of fast hashes (such as NTLM or unsalted MD5) can test <strong>100 billion combinations per second</strong> on an 8x NVIDIA RTX 4090 cluster.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="font-semibold text-rose-300 mb-1">Length is King:</div>
            <p className="text-slate-400">
              An 8-character password with letters, digits, and symbols has ~6 quadrillion combinations ($95^8$), which an enterprise GPU cluster can crack in under 1 minute. A 16-character password has $95^{16} \approx 4.4 \times 10^{31}$ combinations, taking over 10 billion years.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'vector-3',
      number: 3,
      title: 'Dictionary & Rule-Based Attacks',
      category: 'threats',
      summary: 'Wordlists, l33t speak mutations, and how Hashcat rules demolish predictable substitutions.',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Attackers rarely use pure brute-force; they use dictionary wordlists (e.g. RockYou, SecLists) augmented with <em>mutation rules</em>.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-semibold text-amber-300">Predictable Substitutions Crack Instantly:</div>
            <p className="text-slate-400">
              Replacing <code>a</code> with <code>@</code>, <code>o</code> with <code>0</code>, or appending <code>!2024</code> to a dictionary word is explicitly codified in toolkits like Hashcat&apos;s <code>best64.rule</code>. A password like <code>P@ssw0rd2024!</code> requires fewer than 100,000 attempts to guess—cracked in under 1 millisecond.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'vector-4',
      number: 4,
      title: 'Credential Stuffing',
      category: 'threats',
      summary: 'Mass automated testing of stolen username/password pairs across major web services.',
      icon: <RefreshCw className="w-4 h-4 text-purple-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Because internet users frequently reuse passwords across multiple services, a security breach at an obscure hobby forum can compromise your primary email, banking portal, or cloud accounts.
          </p>
          <p>
            Credential stuffing software uses headless browsers, rotating residential proxies, and CAPTCHA-solving APIs to simulate legitimate user logins at immense scale.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-purple-900/60 text-purple-300">
            <strong>Key Defense:</strong> Never reuse the same password across multiple websites. Every account must have a distinct, cryptographically unique credential.
          </div>
        </div>
      ),
    },
    {
      id: 'vector-5',
      number: 5,
      title: 'Password Spraying vs Targeted Brute-Force',
      category: 'threats',
      summary: 'Bypassing account lockout policies by testing one common password against thousands of enterprise users.',
      icon: <Search className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Traditional brute-force targets one single user with many password guesses, triggering account lockout thresholds (e.g., 5 failed attempts).
          </p>
          <p>
            <strong>Password spraying</strong> reverses this tactic: the attacker tries a single highly likely seasonal password (e.g., <code>Autumn2024!</code> or <code>Welcome123!</code>) against 50,000 different corporate email addresses, remaining completely below the lockout radar of directory servers like Active Directory or Okta.
          </p>
        </div>
      ),
    },
    {
      id: 'vector-6',
      number: 6,
      title: 'The Danger of Password Reuse',
      category: 'threats',
      summary: 'How one compromised website triggers a cascade of identity takeover.',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            If your master email account shares a password with a breach-prone retail shop, attackers can reset the passwords of every other service connected to that email address.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
            <strong>Best Practice:</strong> Segregate critical identities. Your primary email, password manager master key, and banking services must have completely unique credentials backed by hardware MFA.
          </div>
        </div>
      ),
    },
    {
      id: 'vector-7',
      number: 7,
      title: 'Phishing & Reverse-Proxy Credential Theft',
      category: 'threats',
      summary: 'Adversary-in-the-Middle (AiTM) frameworks and the limits of traditional password defenses.',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Even a 64-character high-entropy password is useless if you enter it into a fake website. Modern phishing uses reverse-proxy toolkits (e.g., Evilginx) that transparently proxy authentication requests to the legitimate server, intercepting your password AND session cookies in real time.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
            <strong>Immunity:</strong> FIDO2 Passkeys and WebAuthn hardware keys (YubiKey) cryptographically bind authentication to the exact domain origin in the browser URL bar, making phishing mathematically impossible.
          </div>
        </div>
      ),
    },
    {
      id: 'vector-8',
      number: 8,
      title: 'Multi-Factor Authentication (MFA) Architecture',
      category: 'modern-auth',
      summary: 'Why SMS MFA is obsolete and how TOTP and FIDO2 protect your identity.',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-lg">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">MFA Method</th>
                  <th className="p-2.5">Security Level</th>
                  <th className="p-2.5">Vulnerability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-2.5 font-medium text-slate-200">SMS / Voice Call</td>
                  <td className="p-2.5 text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Weak
                  </td>
                  <td className="p-2.5 text-slate-400">SIM swapping, SS7 interception, carrier social engineering</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-200">TOTP App (Aegis, Ente)</td>
                  <td className="p-2.5 text-amber-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strong
                  </td>
                  <td className="p-2.5 text-slate-400">Reverse proxy phishing (AiTM proxy can relay the 6-digit code)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-200">FIDO2 / WebAuthn / Passkeys</td>
                  <td className="p-2.5 text-cyan-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Phishing-Resistant
                  </td>
                  <td className="p-2.5 text-slate-400">Immune to relay phishing via public-key origin binding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'vector-9',
      number: 9,
      title: 'Zero-Knowledge Password Managers',
      category: 'defenses',
      summary: 'Architecture, AES-256 vault encryption, and master key derivation.',
      icon: <Lock className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Humans cannot memorize dozens of 20-character random passwords. A dedicated password manager (Bitwarden, 1Password, KeePassXC) solves this through zero-knowledge end-to-end encryption.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <strong className="text-cyan-300 font-semibold">Zero-Knowledge Architecture:</strong>
            <p className="text-slate-400">
              Your vault is encrypted locally using AES-GCM-256 with a key derived from your master password using Argon2id or PBKDF2 (100,000+ iterations). The service provider never receives or stores your master password or unencrypted vault data.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'vector-10',
      number: 10,
      title: 'Passkeys & The Post-Password Future',
      category: 'modern-auth',
      summary: 'Public-key cryptography replacing shared secrets via the FIDO Alliance and W3C WebAuthn.',
      icon: <Fingerprint className="w-4 h-4 text-cyan-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            Passkeys replace shared secrets with asymmetric public-key cryptography. When creating an account, your device generates a public/private keypair. The public key is stored on the server; the private key never leaves your device hardware enclave (TPM or Secure Enclave).
          </p>
          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/80 text-cyan-300">
            <strong>No Passwords to Steal:</strong> If the server database is breached, attackers only obtain public keys, which cannot be used to impersonate users or authenticate.
          </div>
        </div>
      ),
    },
    {
      id: 'vector-11',
      number: 11,
      title: 'Secure Account Recovery & Backup Codes',
      category: 'defenses',
      summary: 'Hardening fallback authentication channels and protecting offline recovery kits.',
      icon: <RotateCcw className="w-4 h-4 text-purple-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            An account is only as secure as its recovery mechanism. Weak security questions (&quot;What was the name of your first school?&quot;) are frequently answered using public social media or data broker records.
          </p>
          <p>
            Always generate and print offline <strong>emergency backup codes</strong> for your MFA and password manager vaults. Store these physical codes in a fireproof safe or safety deposit box.
          </p>
        </div>
      ),
    },
    {
      id: 'vector-12',
      number: 12,
      title: 'Recognizing Suspicious Login Activity & Breach Response',
      category: 'defenses',
      summary: 'Incident triage, active session revocation, and compromised credential rotation protocols.',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            If you receive an unexpected 2FA prompt or login alert from an unknown IP location, treat it as an active credential compromise:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-300">
            <li>Change the password immediately from a known secure device.</li>
            <li>Revoke all active sessions and refresh tokens across all signed-in devices.</li>
            <li>Audit recovery email addresses and phone numbers for unauthorized alterations.</li>
            <li>Check Have I Been Pwned to identify the source of the leaked credential combo.</li>
          </ol>
        </div>
      ),
    },
  ];

  const filtered = guideSections.filter((sec) => {
    const matchesCat = activeCategory === 'all' || sec.category === activeCategory;
    const matchesSearch =
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/80">
            <BookOpen className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Password Security & Threat Intelligence Guide
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          In-depth technical analysis of 12 password attack vectors, modern cryptographic defenses, and NIST SP 800-63B standards.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Topics (12)' },
            { id: 'threats', label: 'Attack Vectors' },
            { id: 'defenses', label: 'Defenses & Hygiene' },
            { id: 'modern-auth', label: 'MFA & Passkeys' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search security guide..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-850/60 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-cyan-400 font-bold">
                        #{item.number}
                      </span>
                      <h3 className="font-bold text-white text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <span className="text-slate-400 font-mono text-xs px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  {isExpanded ? 'Collapse' : 'Expand'}
                </span>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 animate-in fade-in-50">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
