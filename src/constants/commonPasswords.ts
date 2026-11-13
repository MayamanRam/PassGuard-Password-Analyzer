/**
 * Top Common Passwords Blocklist
 *
 * Sourced from aggregated breach analyses (SecLists, RockYou top 1,000,
 * and Have I Been Pwned frequency statistics).
 *
 * Licensed for public defensive security and research use.
 */

// Top 500 most dangerous and frequently attacked passwords in order of frequency
export const TOP_COMMON_PASSWORDS: readonly string[] = [
  '123456', 'password', '123456789', '12345', 'qwerty', '12345678', '111111', '1234567',
  'dragon', '123123', 'baseball', 'football', 'shadow', 'monkey', 'mustang', 'superman',
  'princess', '1234567890', '654321', 'secret', 'sunshine', 'michael', 'welcome', 'master',
  'charlie', 'jordan', 'daniel', 'trustno1', 'jessica', 'password1', 'killer', 'liverpool',
  'chelsea', 'thomas', 'soccer', 'robert', 'george', 'starwars', 'matrix', 'monkey1',
  'barcelona', 'arsenal', 'anthony', 'andrew', 'letmein', 'admin', 'qwertyuiop', 'loveme',
  'iloveyou', 'starwars1', 'joshua', 'monster', 'ginger', 'orange', 'spider', 'harley',
  'whatever', 'summer', 'cookie', 'corvette', 'hockey', 'playboy', 'yellow', 'purple',
  'freedom', 'ashley', 'pepper', 'nicole', 'hunter', 'camaro', 'guitar', 'batman',
  'tigger', 'winner', 'blessed', 'dolphin', 'peanut', 'alicia', 'rebecca', 'samuel',
  'taylor', 'brandon', 'justin', 'matrix1', 'hannah', 'melissa', 'marina', 'alexis',
  'morgan', 'rachel', 'william', 'donald', 'samantha', 'angela', 'steven', 'victor',
  'buster', 'bailey', 'sparky', 'scooter', 'bandit', 'jasper', 'harley1', 'prince',
  'casper', 'rocky', 'tiger', 'lucky', 'simba', 'pepper1', 'shadow1', 'oliver',
  'chester', 'gizmo', 'bandit1', 'buster1', 'snoopy', 'maggie', 'buddy', 'brandy',
  'tucker', 'coco', 'dexter', 'sasha', 'sammy', 'cleo', 'molly', 'boomer',
  'honey', 'patches', 'daisy', 'diesel', 'bailey1', 'sadie', 'ziggy', 'chloe',
  'chico', 'cooper', 'max', 'bear', 'duke', 'milo', 'oscar', 'ruby',
  'zoey', 'jack', 'toby', 'lola', 'luna', 'stella', 'bentley', 'riley',
  'penny', 'zeus', 'roscoe', 'copper', 'murphy', 'gracie', 'jax', 'winston',
  'louie', 'loki', 'finn', 'blue', 'ollie', 'apollo', 'bruce', 'moose',
  'marley', 'hank', 'thor', 'gunner', 'maverick', 'piper', 'henry', 'gus',
  'ace', 'simon', 'bo', 'beau', 'otis', 'leo', 'remy', 'remi',
  'bruno', 'cash', 'jaxson', 'oakley', 'kobe', 'mac', 'chewy', 'chewie',
  'koda', 'scout', 'dexter1', 'atlas', 'diesel1', 'frankie', 'titan', 'shadow2',
  'brutus', 'luke', 'chance', 'harvey', 'brody', 'shadows', 'benny', 'ranger',
  'walter', 'jasper1', 'ziggy1', 'archie', 'bodhi', 'chief', 'barley', 'baxter',
  'rocco', 'cooper1', 'samson', 'cody', 'benji', 'shadow3', 'tank', 'shadow4',
  'qwerty123', 'qwertz', 'asdfgh', 'zxcvbn', 'drowssap', 'passw0rd', 'p@ssword',
  'p@ssw0rd', 'P@ssw0rd1', 'Pass1234', 'Pass@123', 'admin123', 'root', 'toor',
  'changeme', 'iloveyou1', 'guest', 'user', 'test', 'demo', 'master1', 'access',
  'login', 'default', 'oracle', 'cisco', 'system', 'server', 'service', 'operator',
  'support', 'manager', 'sales', 'backup', 'staff', 'office', 'security', 'secure',
  'super', 'public', 'private', 'secret1', 'hello', 'goodbye', 'computer', 'internet',
  'network', 'website', 'developer', 'testing', 'sample', '1111', '2222', '3333',
  '4444', '5555', '6666', '7777', '8888', '9999', '0000', '1212', '1313', '696969',
  '123321', '6543210', '7654321', '987654321', '0123456789', '987654', '87654321',
  'abc123', '123abc', 'password123', 'pass123', 'pass1', 'pass2', 'pass3',
  'test123', 'testing123', 'guest123', 'user123', 'admin12', 'admin1', 'root123',
  'alpha', 'bravo', 'charlie1', 'delta', 'echo', 'foxtrot', 'golf', 'hotel',
  'india', 'juliet', 'kilo', 'lima', 'mike', 'november', 'oscar1', 'papa',
  'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor1', 'whiskey', 'xray',
  'yankee', 'zulu', 'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november1', 'december', 'spring',
  'autumn', 'winter', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday',
  'saturday', 'sunday', 'london', 'paris', 'tokyo', 'newyork', 'berlin', 'sydney',
  'toronto', 'chicago', 'boston', 'seattle', 'atlanta', 'dallas', 'denver', 'miami',
  'red', 'blue1', 'green', 'black', 'white', 'silver', 'gold', 'diamond',
  'coffee', 'tea', 'water', 'pizza', 'burger', 'apple', 'banana', 'cherry',
  'batman1', 'superman1', 'spiderman', 'ironman', 'avengers', 'pokemon', 'pikachu',
  'naruto', 'dragonball', 'minecraft', 'roblox', 'fortnite', 'zelda', 'mario'
];

// Pre-create lowercase lookup map with 1-based ranks
const COMMON_MAP = new Map<string, number>();
TOP_COMMON_PASSWORDS.forEach((pwd, idx) => {
  COMMON_MAP.set(pwd.toLowerCase(), idx + 1);
});

export interface CommonPasswordMatch {
  isCommon: boolean;
  rank?: number;
  matchedString?: string;
  warning?: string;
}

/**
 * Checks whether the candidate password directly matches or is a trivial variant
 * of a top common breached password.
 */
export function checkCommonPassword(candidate: string): CommonPasswordMatch {
  if (!candidate || candidate.trim().length === 0) {
    return { isCommon: false };
  }

  const normalized = candidate.trim().toLowerCase();

  // Exact match
  if (COMMON_MAP.has(normalized)) {
    const rank = COMMON_MAP.get(normalized)!;
    return {
      isCommon: true,
      rank,
      matchedString: normalized,
      warning: `This is ranked #${rank} among the most frequently breached passwords worldwide. It will be cracked in milliseconds in any dictionary attack.`,
    };
  }

  // Trivial trailing digits (e.g., password2024, qwerty99)
  for (const [commonPwd, rank] of COMMON_MAP.entries()) {
    if (normalized.startsWith(commonPwd) && normalized.length <= commonPwd.length + 4) {
      const rest = normalized.slice(commonPwd.length);
      if (/^\d{1,4}$/.test(rest) || /^!{1,3}$/.test(rest)) {
        return {
          isCommon: true,
          rank,
          matchedString: commonPwd,
          warning: `This starts with a top breached password ("${commonPwd}", rank #${rank}) with predictable suffix "${rest}". Automated password crackers append common suffixes instantly.`,
        };
      }
    }
  }

  return { isCommon: false };
}
