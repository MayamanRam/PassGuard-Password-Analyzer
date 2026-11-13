import { test, expect } from '@playwright/test';

test.describe('PassGuard End-to-End Cybersecurity Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('E2E-01: Landing dashboard loads with brand identity and privacy banner', async ({ page }) => {
    // Assert title and branding
    await expect(page).toHaveTitle(/PassGuard/i);
    await expect(page.getByText('Understand. Strengthen. Protect.').first()).toBeVisible();

    // Verify privacy-first indicator banner
    await expect(page.getByText(/100% Client-Side Privacy/i).first()).toBeVisible();
    await expect(page.getByText(/Your password is analyzed locally in your browser/i)).toBeVisible();

    // Perform interactive quick test on dashboard hero
    const quickInput = page.getByPlaceholder(/Test a sample password here/i);
    await quickInput.fill('correct-horse-battery-staple');

    // Verify reactive strength meter and entropy appear
    await expect(page.getByRole('progressbar')).toBeVisible();
    await expect(page.getByText(/Effective Entropy/i)).toBeVisible();
  });

  test('E2E-02: Real-time Password Analyzer evaluates patterns and entropy', async ({ page }) => {
    // Navigate to Analyzer tab
    await page.getByRole('button', { name: /Password Analyzer/i }).first().click();
    await expect(page.getByText('Password Strength & Entropy Analyzer')).toBeVisible();

    const input = page.getByPlaceholder(/Type or paste a password/i);

    // Test 1: Enter known breached password
    await input.fill('password123');

    // Assert Very Weak classification and breached blocklist warning
    await expect(page.getByText(/Very Weak/i).first()).toBeVisible();
    await expect(page.getByText(/public breached password dictionaries/i)).toBeVisible();

    // Assert Pattern Detector identified sequential pattern
    await expect(page.getByText(/Sequential Numbers/i)).toBeVisible();

    // Test 2: Try sample button
    await page.getByRole('button', { name: /Diceware Passphrase/i }).click();
    await expect(page.getByText(/Very Strong/i).first()).toBeVisible();
    await expect(page.getByText(/Effective Realistic Entropy/i)).toBeVisible();

    // Test 3: Clear button wipes memory
    await page.getByRole('button', { name: /Clear/i }).click();
    await expect(input).toHaveValue('');
    await expect(page.getByText(/Ready for Real-Time Password Evaluation/i)).toBeVisible();
  });

  test('E2E-03: Password Generator creates secure passwords with customized constraints', async ({ page }) => {
    // Navigate to Generator
    await page.getByRole('button', { name: /Password Generator/i }).first().click();
    await expect(page.getByText('Cryptographically Secure Password Generator')).toBeVisible();

    // Customize length input
    const lengthInput = page.locator('#gen-length-input');
    await lengthInput.fill('28');

    // Toggle Exclude Ambiguous
    const ambiguousCheckbox = page.getByLabel(/Exclude Ambiguous/i);
    await ambiguousCheckbox.check();

    // Click Generate New
    await page.getByRole('button', { name: /Generate New/i }).click();

    // Verify generated password list item
    const generatedPwd = page.locator('.font-mono.text-cyan-300').first();
    await expect(generatedPwd).toBeVisible();

    const pwdText = await generatedPwd.innerText();
    expect(pwdText.length).toBe(28);

    // Verify copy button interaction
    const copyBtn = page.getByRole('button', { name: /Copy Password/i }).first();
    await copyBtn.click();
    await expect(page.getByText(/Copied!/i).first()).toBeVisible();
  });

  test('E2E-04: Passphrase Generator generates memorable EFF Diceware phrases', async ({ page }) => {
    // Navigate to Passphrase Generator
    await page.getByRole('button', { name: /Passphrase Generator/i }).first().click();
    await expect(page.getByText('Memorable Diceware Passphrase Generator')).toBeVisible();

    // Change separator to Period (.)
    await page.getByRole('button', { name: 'Period (.)' }).click();

    // Click Generate Passphrase
    await page.getByRole('button', { name: /Generate Passphrase/i }).click();

    // Verify generated passphrase contains dots
    const passphraseEl = page.locator('.font-mono.text-cyan-300.font-bold').first();
    await expect(passphraseEl).toBeVisible();
    const phrase = await passphraseEl.innerText();
    expect(phrase).toContain('.');

    // Verify crack time estimate is displayed
    await expect(page.getByText(/Cracking effort:/i).first()).toBeVisible();
  });

  test('E2E-05: Security Guide supports filtering and accordion expansion', async ({ page }) => {
    // Navigate to Guide
    await page.getByRole('button', { name: /Security Guide/i }).first().click();
    await expect(page.getByText('Password Security & Threat Intelligence Guide')).toBeVisible();

    // Search for "phishing"
    const searchInput = page.getByPlaceholder(/Search security guide/i);
    await searchInput.fill('phishing');

    // Assert matching card appears
    await expect(page.getByText(/Phishing & Reverse-Proxy Credential Theft/i)).toBeVisible();

    // Expand accordion item
    await page.getByRole('button', { name: /Expand/i }).first().click();
    await expect(page.getByText(/Adversary-in-the-Middle/i)).toBeVisible();
  });

  test('E2E-06: Verifies absolute zero-knowledge privacy boundary in DOM', async ({ page }) => {
    // Navigate to Analyzer and enter a secret password
    await page.getByRole('button', { name: /Password Analyzer/i }).first().click();
    const input = page.getByPlaceholder(/Type or paste a password/i);
    await input.fill('SuperConfidentialCorporateVaultKey999!');

    // Inspect browser storage directly via page evaluate
    const storageCheck = await page.evaluate(() => {
      return {
        localLength: localStorage.length,
        sessionLength: sessionStorage.length,
        cookies: document.cookie,
      };
    });

    // Assert strictly zero persistent storage
    expect(storageCheck.localLength).toBe(0);
    expect(storageCheck.sessionLength).toBe(0);
    expect(storageCheck.cookies).toBe('');
  });
});
