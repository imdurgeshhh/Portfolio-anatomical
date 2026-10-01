"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import characterFilmstripSource from "./sources/character-filmstrip.html";
import characterWaveSource from "./sources/character-wave.html";
import { THREEUI_TECH_ITEMS, type ThreeUITechItem } from "./tech-data";

export type CharacterCarouselVariant = "filmstrip" | "wave";

export type CharacterCarouselProps = {
  variant?: CharacterCarouselVariant;
  speed?: number;
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
  items?: ThreeUITechItem[];
};

export const CHARACTER_CAROUSEL_DEFAULTS = {
  variant: "filmstrip",
  speed: 1,
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const satisfies Required<Pick<CharacterCarouselProps, "variant" | "speed" | "scale" | "opacity" | "hue" | "saturation" | "brightness">>;

const SOURCE_BY_VARIANT: Record<CharacterCarouselVariant, string> = {
  filmstrip: characterFilmstripSource,
  wave: characterWaveSource,
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function buildFocusedDocument(variant: CharacterCarouselVariant, items: ThreeUITechItem[] = THREEUI_TECH_ITEMS) {
  const focusStyles = `<style data-character-carousel-focus>
:root { --character-carousel-scale: 1; }
html, body, .stage { width: 100%; height: 100%; margin: 0; overflow: hidden; }
.stage { min-height: 0 !important; }
.deck { transform: scale(var(--character-carousel-scale)); transform-origin: 50% 50%; }
</style>`;

  const glassStyles = `<style data-character-carousel-glass-theme>
:root {
  color-scheme: light;
  background: transparent !important;
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
html, body {
  background: transparent !important;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.stage {
  background:
    radial-gradient(circle at var(--pointer-x, 50%) 48%, rgba(255, 255, 255, 0.8) 0%, rgba(220, 235, 252, 0.35) 30%, transparent 60%),
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    transparent !important;
  background-size: auto, 4rem 4rem, 4rem 4rem, auto !important;
}
.stage::before {
  display: none !important;
  opacity: 0 !important;
}
.stage::after {
  background: linear-gradient(
    90deg,
    rgba(205, 224, 245, 0.35),
    transparent 15%,
    transparent 85%,
    rgba(205, 224, 245, 0.35)
  ) !important;
}
.card {
  background: rgba(255, 255, 255, 0.65) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border: 1px solid rgba(255, 255, 255, 0.7) !important;
  border-radius: 18px !important;
  color: #000 !important;
  box-shadow:
    0 calc(8px + var(--focus) * 18px) calc(18px + var(--focus) * 24px) rgba(30, 80, 140, calc(0.08 + var(--focus) * 0.14)),
    0 0 calc(var(--focus) * 26px) rgba(147, 197, 253, calc(var(--focus) * 0.45)),
    inset 0 0 0 1px rgba(255, 255, 255, 0.8) !important;
  transition: box-shadow 0.25s ease-out, border-color 0.25s ease-out !important;
}
.card::before {
  border: 1px solid rgba(255, 255, 255, 0.45) !important;
  border-radius: 14px !important;
  inset: 5px !important;
}
.card:focus-visible {
  box-shadow:
    0 20px 40px rgba(30, 80, 140, 0.2),
    0 0 0 3px rgba(0, 0, 0, 0.85) !important;
}
.portrait {
  inset: 8px 8px 27% !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.55) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03) !important;
}
.portrait .tech-icon-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.portrait svg {
  width: clamp(44px, 5.2vw, 68px) !important;
  height: clamp(44px, 5.2vw, 68px) !important;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  transform: scale(calc(0.96 + var(--focus) * 0.1)) !important;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
}
.footer {
  right: 8px !important;
  bottom: 8px !important;
  left: 8px !important;
  height: calc(27% - 8px) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  border-radius: 10px !important;
  color: #000 !important;
  padding: clamp(5px, 0.65vw, 9px) !important;
  gap: clamp(5px, 0.6vw, 9px) !important;
  grid-template-columns: clamp(24px, 2.7vw, 36px) 1fr !important;
}
.index {
  border: 1px solid rgba(0, 0, 0, 0.14) !important;
  color: rgba(0, 0, 0, 0.75) !important;
  background: rgba(255, 255, 255, 0.85) !important;
  font-family: var(--font-geist-mono), ui-monospace, monospace !important;
  font-size: clamp(8px, 0.75vw, 11px) !important;
  font-weight: 600 !important;
  width: clamp(22px, 2.5vw, 32px) !important;
}
.meta {
  min-width: 0;
}
.name {
  color: #000 !important;
  font-family: var(--font-geist-sans), system-ui, sans-serif !important;
  font-size: clamp(9px, 0.9vw, 13px) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
}
.role {
  margin-top: 2px !important;
  color: rgba(0, 0, 0, 0.5) !important;
  font-family: var(--font-geist-mono), ui-monospace, monospace !important;
  font-size: clamp(6px, 0.55vw, 8.5px) !important;
  font-weight: 600 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
}

@media (max-width: 650px) {
  .stage {
    background:
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(220, 235, 252, 0.35) 30%, transparent 60%),
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      transparent !important;
    background-size: auto, 4rem 4rem, 4rem 4rem, auto !important;
  }
}
</style>`;

  const controls = `<script data-character-carousel-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { real: null, virtual: null };
  var controls = window.__CHARACTER_CAROUSEL_CONTROLS = { speed: 1, scale: 1, paused: false };
  window.__CHARACTER_CAROUSEL_NOW = function () {
    return clock.virtual === null ? performance.now() : clock.virtual;
  };
  window.requestAnimationFrame = function (callback) {
    function tick(realTime) {
      if (clock.real === null) {
        clock.real = realTime;
        clock.virtual = realTime;
      } else {
        if (!controls.paused) clock.virtual += (realTime - clock.real) * controls.speed;
        clock.real = realTime;
      }
      if (controls.paused) {
        return nativeFrame(tick);
      }
      callback(clock.virtual);
    }
    return nativeFrame(tick);
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'character-carousel-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) controls.speed = Math.max(0, Math.min(2.5, next.speed));
    if (Number.isFinite(next.scale)) controls.scale = Math.max(0.7, Math.min(1.3, next.scale));
    controls.paused = Boolean(next.paused);
    document.documentElement.style.setProperty('--character-carousel-scale', String(controls.scale));
  });
})();
</script>`;

  let focusedSource = (SOURCE_BY_VARIANT[variant] || SOURCE_BY_VARIANT.filmstrip)
    .replaceAll("performance.now()", "window.__CHARACTER_CAROUSEL_NOW()");

  // Replace demo profiles and cards with tech stack cards
  const targetStart = "const portraits = {";
  const targetEnd = "deck.append(card);";
  const idxStart = focusedSource.indexOf(targetStart);
  const idxEnd = focusedSource.indexOf(targetEnd);

  if (idxStart !== -1 && idxEnd !== -1) {
    const techCardsInjection = `const techItems = ${JSON.stringify(items)};
      const stage = document.querySelector("#stage");
      const deck = document.querySelector("#deck");
      const cards = techItems.map((item, index) => {
        const card = document.createElement("button");
        card.className = "card";
        card.type = "button";
        card.dataset.index = String(index);
        card.setAttribute("aria-label", "Focus " + item.name + ", " + item.category);
        card.innerHTML = \`
          <span class="portrait">
            <span class="tech-icon-svg">\${item.svg}</span>
          </span>
          <span class="footer">
            <span class="index">\${String(index + 1).padStart(2, "0")}</span>
            <span class="meta">
              <span class="name">\${item.name}</span>
              <span class="role">\${item.badge || item.category}</span>
            </span>
          </span>\`;
        deck.append(card);`;

    focusedSource = focusedSource.slice(0, idxStart) + techCardsInjection + focusedSource.slice(idxEnd + targetEnd.length);
  }

  return focusedSource
    .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "")
    .replace("</head>", `${focusStyles}${glassStyles}${controls}</head>`);
}

export function CharacterCarousel({
  variant = CHARACTER_CAROUSEL_DEFAULTS.variant,
  speed = CHARACTER_CAROUSEL_DEFAULTS.speed,
  scale = CHARACTER_CAROUSEL_DEFAULTS.scale,
  opacity = CHARACTER_CAROUSEL_DEFAULTS.opacity,
  hue = CHARACTER_CAROUSEL_DEFAULTS.hue,
  saturation = CHARACTER_CAROUSEL_DEFAULTS.saturation,
  brightness = CHARACTER_CAROUSEL_DEFAULTS.brightness,
  className = "",
  style,
  items = THREEUI_TECH_ITEMS,
}: CharacterCarouselProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostVisible, setHostVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const safeSpeed = clamp(speed, 0, 2.5);
  const safeScale = clamp(scale, 0.7, 1.3);
  const paused = !hostVisible || !documentVisible || safeSpeed === 0;
  const source = useMemo(() => buildFocusedDocument(variant, items), [variant, items]);

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "character-carousel-controls",
      controls: { speed: safeSpeed, scale: safeScale, paused },
    }, "*");
  }, [paused, safeScale, safeSpeed]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setHostVisible(entry?.isIntersecting ?? true));
    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    postControls();
  }, [postControls, source]);

  const isFilmstrip = variant === "filmstrip";

  return (
    <div
      className={`threeui-background character-carousel character-carousel--${variant}${className ? ` ${className}` : ""}`}
      style={{ background: "transparent", pointerEvents: "auto", ...style }}
    >
      <iframe
        ref={iframeRef}
        title={isFilmstrip ? "Interactive character filmstrip" : "Interactive character wave"}
        srcDoc={source}
        sandbox="allow-scripts"
        onLoad={postControls}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: "transparent",
          opacity: clamp(opacity, 0.05, 1),
          filter: `hue-rotate(${clamp(hue, -180, 180)}deg) saturate(${clamp(saturation, 0, 2)}) brightness(${clamp(brightness, 0.35, 1.65)})`,
        }}
      />
    </div>
  );
}

export function CharacterFilmstrip(props: Omit<CharacterCarouselProps, "variant">) {
  return <CharacterCarousel {...props} variant="filmstrip" />;
}

export function CharacterWave(props: Omit<CharacterCarouselProps, "variant">) {
  return <CharacterCarousel {...props} variant="wave" />;
}
