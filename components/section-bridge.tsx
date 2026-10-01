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
          className="section-bridge__svg text-sky-900/[0.04] dark:text-[#F5C451]/[0.06] transition-colors"
        >
          <path
            d="M0,32 C240,22 480,44 720,34 C960,24 1200,46 1440,30 L1440,64 L0,64 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Horizontal hairline that fades at the edges — replaces the hard border */}
      <div className="section-bridge__line" />
    </div>
  );
}
