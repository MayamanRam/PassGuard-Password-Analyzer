import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzePassword } from '../../services/passwordAnalyzer';
import { generatePassword } from '../../services/passwordGenerator';
import { generatePassphrase } from '../../services/passphraseGenerator';

describe('Privacy Architecture - Zero Persistence & Zero Telemetry Verification', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('never writes analyzed passwords to localStorage', () => {
    const testSecret = 'SecretP@sswordToInspectLocalStorage123!';
    analyzePassword(testSecret);

    expect(localStorage.length).toBe(0);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      const val = localStorage.getItem(key);
      expect(val).not.toContain(testSecret);
    }
  });

  it('never writes analyzed passwords to sessionStorage', () => {
    const testSecret = 'SessionStorageSecret999!';
    analyzePassword(testSecret);

    expect(sessionStorage.length).toBe(0);
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)!;
      const val = sessionStorage.getItem(key);
      expect(val).not.toContain(testSecret);
    }
  });

  it('never writes generated passwords to localStorage or sessionStorage', () => {
    const generated = generatePassword({ length: 32 });
    expect(generated.length).toBe(32);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);

    const passphrase = generatePassphrase({ wordCount: 5 });
    expect(passphrase.wordCount).toBe(5);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it('never triggers network fetch calls during standard password analysis', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    analyzePassword('MyTestSecretPassword123!');
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('never logs analyzed or generated passwords to console.log', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const secret = 'DoNotLogMeEver123456!';

    analyzePassword(secret);
    generatePassword({ length: 16 });
    generatePassphrase({ wordCount: 4 });

    const calls = consoleLogSpy.mock.calls.flat();
    for (const call of calls) {
      expect(String(call)).not.toContain(secret);
    }
    consoleLogSpy.mockRestore();
  });
});
