import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordInput } from '../../components/analyzer/PasswordInput';
import { StrengthMeter } from '../../components/common/StrengthMeter';
import { CopyButton } from '../../components/common/CopyButton';
import { App } from '../../App';

describe('Frontend Components & User Interactions', () => {
  it('renders PasswordInput and toggles password visibility', () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();

    const { rerender } = render(
      <PasswordInput
        value="Secret123!"
        onChange={handleChange}
        onClear={handleClear}
      />
    );

    const input = screen.getByLabelText(/enter password to analyze/i) as HTMLInputElement;
    expect(input.type).toBe('password');

    // Toggle visibility
    const toggleButton = screen.getByLabelText(/show password/i);
    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');

    // Trigger clear
    const clearButton = screen.getByText(/clear/i);
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);

    // Typing in input
    fireEvent.change(input, { target: { value: 'NewPassword' } });
    expect(handleChange).toHaveBeenCalledWith('NewPassword');

    // Common password warning
    rerender(
      <PasswordInput
        value="password"
        onChange={handleChange}
        onClear={handleClear}
        isCommonPassword={true}
      />
    );
    expect(screen.getByText(/public breached password dictionaries/i)).toBeInTheDocument();
  });

  it('renders StrengthMeter with accessible ARIA progressbar and correct segments', () => {
    render(<StrengthMeter score={3} label="Strong" />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '3');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '4');
    expect(progressbar).toHaveAttribute('aria-valuetext', 'Password strength is Strong');

    expect(screen.getByText(/strong/i)).toBeInTheDocument();
  });

  it('renders CopyButton and executes clipboard write on click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyButton textToCopy="MySecurePassword123!" label="Copy Password" />);

    const copyBtn = screen.getByRole('button', { name: /copy password/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith('MySecurePassword123!');
  });

  it('navigates seamlessly across all tabs in the main App', () => {
    render(<App />);

    // Starts on Dashboard
    expect(screen.getAllByText(/understand\. strengthen\./i).length).toBeGreaterThanOrEqual(1);

    // Navigate to Password Analyzer
    const analyzerNavBtns = screen.getAllByRole('button', { name: /password analyzer/i });
    fireEvent.click(analyzerNavBtns[0]);
    expect(screen.getByText(/password strength & entropy analyzer/i)).toBeInTheDocument();

    // Navigate to Password Generator
    const genNavBtns = screen.getAllByRole('button', { name: /password generator/i });
    fireEvent.click(genNavBtns[0]);
    expect(screen.getByText(/cryptographically secure password generator/i)).toBeInTheDocument();

    // Navigate to Passphrase Generator
    const passNavBtns = screen.getAllByRole('button', { name: /passphrase generator/i });
    fireEvent.click(passNavBtns[0]);
    expect(screen.getByText(/memorable diceware passphrase generator/i)).toBeInTheDocument();

    // Navigate to Security Guide
    const guideNavBtns = screen.getAllByRole('button', { name: /security guide/i });
    fireEvent.click(guideNavBtns[0]);
    expect(screen.getByText(/password security & threat intelligence guide/i)).toBeInTheDocument();

    // Navigate to About
    const aboutNavBtns = screen.getAllByRole('button', { name: /about/i });
    fireEvent.click(aboutNavBtns[0]);
    expect(screen.getByText(/about passguard — engineering & cryptography audit/i)).toBeInTheDocument();
  });
});
