"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ButtonLoading() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button variant="outline" disabled className="min-h-[44px] px-6 rounded-full border-black/20 bg-white">
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" disabled className="min-h-[44px] px-6 rounded-full bg-black/10">
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  );
}

export function ResumeDownloadButton() {
  const [status, setStatus] = useState<"idle" | "generating" | "downloading" | "done">("idle");

  const handleDownload = () => {
    if (status !== "idle" && status !== "done") return;

    // 1. Enter Generating state with Spinner
    setStatus("generating");

    setTimeout(() => {
      // 2. Enter Downloading state with Spinner and trigger download
      setStatus("downloading");

      const link = document.createElement("a");
      link.href = "/Resume/Durgesh Nandan sahu_Aug.pdf";
      link.download = "Durgesh_Nandan_Sahu_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        // 3. Mark done and reset
        setStatus("done");
        setTimeout(() => {
          setStatus("idle");
        }, 2200);
      }, 1200);
    }, 700);
  };

  if (status === "generating") {
    return (
      <Button
        variant="outline"
        disabled
        className="min-h-[44px] px-6 rounded-full border-black/20 bg-white text-black shadow-xs"
      >
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
    );
  }

  if (status === "downloading") {
    return (
      <Button
        variant="secondary"
        disabled
        className="min-h-[44px] px-6 rounded-full bg-black/10 text-black shadow-xs cursor-wait"
      >
        Downloading
        <Spinner data-icon="inline-start" className="ml-2 mr-0" />
      </Button>
    );
  }

  if (status === "done") {
    return (
      <Button
        variant="default"
        onClick={handleDownload}
        className="min-h-[44px] px-6 rounded-full bg-emerald-600 text-white border border-emerald-700 shadow-xs hover:bg-emerald-700 active:scale-[0.98]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Downloaded!
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      onClick={handleDownload}
      className="bg-white text-black text-sm font-medium px-6 min-h-[44px] items-center justify-center rounded-full border border-black/20 hover:bg-black hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 shadow-xs active:scale-[0.98]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="mr-2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download Resume
    </Button>
  );
}
