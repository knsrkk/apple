"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  description?: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  description,
  visible,
  onClose,
  duration = 6000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [visible, duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4 transition-all duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0",
      )}
    >
      <div className="pointer-events-auto glass-panel flex w-full max-w-md items-start gap-4 rounded-2xl border border-[#34c759]/30 p-4 shadow-2xl shadow-[#34c759]/10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#34c759]/20">
          <CheckCircle2 className="h-6 w-6 text-[#34c759]" />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="font-semibold text-foreground">{message}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
