# CyberShield Design System: Obsidian Vanguard HUD

A militarized cyber-tactical command console combining Cyber-Brutalism and Tactical HUD Realism.

## 1. Color System (Exact Values)

- **Base / Obsidian Background:**
  - `#05070a` (`terminal-black`)
  - `#05080e` (`obsidian`)
  - `#030509` (`pitch`)
- **Card & Panel Surfaces:**
  - `#080c14` (`terminal-card`)
  - `#0c121e` (`terminal-panel`)
  - `#0d131f` (`surface`)
  - `#121929` (`surface-elevated`)
- **Primary — Phosphor Green:**
  - `#00ff88` (`cyber-green`, `neon`): Target locks, active states, verified states, primary CTAs, positive telemetry.
- **Secondary — Telemetry Cyan:**
  - `#00d4ff` (`telemetry`) / `#00e5ff` (`cyber-cyan`, `cyan`): Sub-metrics, auxiliary logs, coordinates, network diagnostics.
- **Tertiary — Warning Crimson:**
  - `#ff3366` (`warning-crimson`, `alert`): Hostile alerts, aborts, critical intercepts only (never decorative).
- **Amber / Threat:**
  - `#ffb703` (`threat-amber`, `amber`): Elevated threat, caution states.
- **Text:**
  - `#e1e2ec` / `#ecfdf5` (`bone`, `bone-bright`): Primary headings and data readouts.
  - `#79988a` / `#7c938a` (`bone-muted`): Secondary telemetry, descriptions.
  - `#475953` (`bone-dim`): Metadata tags, timestamps, disabled readouts.
- **Borders:**
  - `rgba(0, 255, 136, 0.18–0.6)` green at varying opacity depending on emphasis.
  - Muted blue-gray `#4a5d6e` / `#6d8296` (`steel`, `steel-light`) for passive/unselected elements.

## 2. Typography

- **Headings & Brands:** Space Grotesk (weights 400-800), bold/black weight, uppercase, letter-spacing `+0.04em` to `+0.08em` (tactical stencil feel).
  - Display hero: 48–96px, weight 700–800.
  - Headline lg: 32px / 700.
  - Headline md: 22px / 600.
- **Body & Telemetry:** JetBrains Mono exclusively (weights 300–800).
  - Body: 13–15px / 400.
  - Labels & Caps: 11px / 700 with `+0.14em` tracking.
  - Micro-telemetry: 9px / 600 with `+0.12em` tracking.
- **Phosphor Glow Rule:** Display titles and ACTIVE status readouts receive text-shadow bloom (`0 0 12-25px rgba(0,255,136,0.4-0.8)`). Micro-labels and body text remain crisp and un-bloomed for tactical legibility.

## 3. Shapes & Framing

- **Base border radius:** `0.25rem` (4px) — sharp industrial framing.
- **Corner Brackets (`┌ ┐ └ ┘`):** Key panels feature `.hud-bracket-tl/tr/bl/br` corner brackets (2px solid lines extending 8–10px, with drop-shadow glow filter).
- **Buttons (`.btn-hud`):** Space Grotesk bold text, uppercase, tracking `+0.1em+`.
  - `.btn-hud-primary`: Phosphor green fill/border with outer glow shadow.
  - `.btn-hud-steel`: Steel/cyan outline with hover neon glow.
  - `.btn-hud-alert`: Warning crimson outline with hover alert glow.
- **Panels (`.tactical-box`):** Dark surface background, 1px green border at 20% opacity, inner shadow + outer phosphor glow combo for elevated states.

## 4. Texture & Atmosphere (Pointer-Events: None)

Stacked atmospheric layers:
1. **Tactical vignette** (z-0): Radial gradients at top-center and bottom-right in green/cyan, darkening toward edges.
2. **Dot-grid matrix** (z-0): Radial-gradient dots at 28px intervals in low-opacity green.
3. **CRT scanline overlay** (z-40): Repeating linear-gradient horizontal lines with 3–4px step above content.

## 5. Reusable Components & Screens

- **`Atmosphere.jsx`**: Vignette + dot matrix + CRT scanline layers.
- **`TelemetryStrip.jsx`**: Fixed top strip (DEFCON, system tick rate, security core status, node ID, location).
- **`HudHeader.jsx`**: Window-dot indicators, brand mark `[+] CYBERSHIELD // PROTOCOL_OPS`, navigation, equalizer, sound toggle, Initialize CTA.
- **`TelemetryFooter.jsx`**: Live packet ID, session ID, latency, secure gateway ping dot.
- **`BracketPanel.jsx`**: Industrial card with corner brackets, elevated and alert variants.
- **`DecisionOption.jsx`**: Bracketed option button with lettered index chip (A/B/C/D), transforming on selection to correct (green pulse glow + `✓`) or incorrect (crimson pulse + `✕`).
- **`ShieldLives.jsx`**: Material Symbols Outlined shields (phosphor green active, pulsing crimson compromised).
- **`SegmentedProgress.jsx`**: Discrete glowing rectangle segments.
- **`StatusBadge.jsx`**: Monospace chip with colored micro-indicator dot.
- **`BootModal.jsx`**: Transition hinge between landing and gameplay (equalizer visualization, terminal handshake log, segmented progress, Abort/Authorize actions).

