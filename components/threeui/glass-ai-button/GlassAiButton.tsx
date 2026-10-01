"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import rawSourceDocument from "./sources/glass-ai-button.html?raw";

export type GlassAiButtonProps = {
  className?: string;
  style?: CSSProperties;
  href?: string;
  onClick?: () => void;
};

export function GlassAiButton({ className = "", style, href, onClick }: GlassAiButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => (
    typeof document === "undefined" || !document.hidden
  ));
  const [hostVisible, setHostVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setHostVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setHostVisible(entry?.isIntersecting ?? true);
    }, { rootMargin: "80px" });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  // Support redirect / click notification from inside iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "threeui-glass-ai-click") {
        if (onClick) {
          onClick();
        }
        if (href) {
          setTimeout(() => {
            if (href.startsWith("#")) {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.hash = href;
              }
            } else {
              window.location.href = href;
            }
          }, 450);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [href, onClick]);

  const sourceDocument = (href || onClick)
    ? rawSourceDocument.replace(
        "</body>",
        `<script>
          const btn = document.querySelector('#activate');
          if (btn) {
            btn.addEventListener('click', () => {
              window.parent.postMessage({ type: 'threeui-glass-ai-click' }, '*');
            });
          }
        </script></body>`
      )
    : rawSourceDocument;

  return (
    <div
      ref={hostRef}
      className={`threeui-background glass-ai-button${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Interactive glass AI button"
      data-state={!mounted ? "paused" : ready ? "ready" : "loading"}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#a8b0bd",
        pointerEvents: "auto",
        ...style,
      }}
    >
      {mounted ? (
        <iframe
          title="Glass AI Button"
          srcDoc={sourceDocument}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#a8b0bd",
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? "auto" : "none",
            transition: "opacity 240ms ease-out",
          }}
        />
      ) : null}
    </div>
  );
}
