/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0e17',
          surface: '#111827',
          card: '#161f30',
          border: '#1f293d',
          hover: '#24324d',
          accent: {
            cyan: '#06b6d4',
            cyanGlow: '#22d3ee',
            purple: '#8b5cf6',
            purpleGlow: '#a78bfa',
            emerald: '#10b981',
            amber: '#f59e0b',
            rose: '#f43f5e',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
            muted: '#64748b',
          }
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
