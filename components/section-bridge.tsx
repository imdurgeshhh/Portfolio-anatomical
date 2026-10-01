/**
 * SectionBridge
 *
 * A CSS-only, pointer-events-none transition element placed between the
 * Hero and Spotlight sections. It replaces the hard border with a barely-
 * perceptible organic curve that breathes slowly, visually fusing the two
 * sections instead of splitting them.
 *
 * Motion rationale (Emil Kowalski / transitions.dev):
 *   - Purpose: Spatial continuity — preventing a jarring content teleport.
 *   - Tool: CSS animation (runs off the main thread, no JS runtime cost).
 *   - Properties: transform only (GPU compositor, no layout/paint).
 *   - Frequency: Continuous ambient — low amplitude, slow period.
 *   - Reduced-motion: animation is disabled via the global media query in globals.css.
 */
export default function SectionBridge() {
  return (
    <div
      className="section-bridge"
      aria-hidden="true"
      role="presentation"
    >
      {/* Animated organic curve */}
      <div className="section-bridge__curve">
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="section-bridge__svg"
        >
          <defs>
            <linearGradient id="bridgeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(220,234,248,0)" />
              <stop offset="100%" stopColor="rgba(220,234,248,0.18)" />
            </linearGradient>
          </defs>
          {/*
            A single cubic Bézier path with ~9px amplitude.
            Control points are deliberately asymmetric to avoid a "template wave" look.
            The curve is nearly invisible on its own — the animation provides the life.
          */}
          <path
            d="M0,32 C240,22 480,44 720,34 C960,24 1200,46 1440,30 L1440,64 L0,64 Z"
            fill="url(#bridgeFill)"
          />
        </svg>
      </div>

      {/* Horizontal hairline that fades at the edges — replaces the hard border */}
      <div className="section-bridge__line" />
    </div>
  );
}
