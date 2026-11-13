# UI/UX Design Brief (UI_UX_DESIGN_BRIEF.md)
## PassGuard — Cybersecurity Design System & Accessibility Specification

---

## 1. Visual Direction & Theme

PassGuard employs a sleek, authoritative **cybersecurity dark theme** engineered to look like an enterprise security console rather than a superficial web widget.

### 1.1 Color Palette
- **Primary Background:** `#0a0e17` (Deep Obsidian Navy)
- **Secondary Surfaces / Cards:** `#111827` (Slate Navy) with subtle `#1f293d` borders
- **Primary Accent / Cyan Glow:** `#06b6d4` (Cyber Cyan), `#22d3ee` (Cyan Glow)
- **Secondary Accent / Purple Glow:** `#8b5cf6` (Electric Violet), `#a78bfa` (Soft Purple)
- **Status Indicators:**
  - *Critical / Danger:* `#f43f5e` (Rose 500)
  - *Warning / Weak:* `#f59e0b` (Amber 500)
  - *Moderate:* `#eab308` (Yellow 500)
  - *Strong / Secure:* `#10b981` (Emerald 500)
  - *Very Strong:* `#06b6d4` (Cyan 500)
- **Text Hierarchies:**
  - *Heading / Primary Text:* `#f8fafc` (Slate 50)
  - *Secondary / Labels:* `#94a3b8` (Slate 400)
  - *Muted / Details:* `#64748b` (Slate 500)

---

## 2. Typography & Iconography

- **Display & Body Font:** Inter, system-ui, -apple-system, BlinkMacSystemFont (Clean, highly legible at small sizes).
- **Monospace Font:** JetBrains Mono, Fira Code, Cascadia Code, Consolas (Used for hashes, entropy numbers, generated passwords, and token segments to avoid character misreads).
- **Iconography:** Lucide React icons with consistent 1.5px to 2px stroke widths, color-coded to semantic contexts.

---

## 3. WCAG 2.2 Level AA Accessibility Conformance

### 3.1 Non-Color-Dependent Indicators
Section 6 and WCAG guideline 1.4.1 dictate that color must never be the sole conveyer of information:
- The **StrengthMeter** renders:
  1. A colored segmented bar.
  2. A textual status label (`Very Weak`, `Weak`, `Moderate`, `Strong`, `Very Strong`).
  3. A numeric score (`Score: 0 / 4` up to `Score: 4 / 4`).
  4. Contextual status icons (AlertTriangle, ShieldAlert, Shield, ShieldCheck).
  5. Full ARIA progressbar attributes: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="4"`, and `aria-valuetext="Password strength is Strong"`.

### 3.2 Contrast Ratios
- All primary text (`#f8fafc`) on dark background (`#0a0e17`) achieves a contrast ratio $> 14:1$ (exceeding WCAG AAA requirement of 7:1).
- Secondary labels (`#94a3b8`) achieve $> 5.8:1$ (exceeding AA requirement of 4.5:1).
- Interactive buttons and focus outlines maintain visible contrast borders.

### 3.3 Keyboard Navigation & Focus Visibility
- All buttons, inputs, tabs, sliders, and accordions are reachable via standard keyboard navigation (`Tab`, `Shift+Tab`, `Space`, `Enter`).
- All active controls sport visible 2px cyan/purple focus rings with offset margins (`focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2`).

---

## 4. Responsive Layout Strategy

- **Desktop (1024px+):** Multi-column dashboard layouts with side-by-side controls and output panes.
- **Tablet (768px – 1023px):** Fluid two-column grids adapting gracefully to touch targets.
- **Mobile (< 768px):** Single-column stacked layouts, expandable hamburger navigation, and full-width touch-friendly sliders and copy buttons.

