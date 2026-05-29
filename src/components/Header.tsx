"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_RAW,
  SITE_NAME,
  TELEGRAM_URL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Apple className="h-7 w-7 text-accent" />
          <span className="hidden sm:inline">{SITE_NAME}</span>
          <span className="sm:hidden">Apple Чита</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${PHONE_RAW.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <Button variant="telegram" size="sm" asChild>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_RAW.replace(/\s/g, "")}`}
            className="mt-2 flex items-center gap-2 px-3 py-2 text-sm font-medium"
          >
            <Phone className="h-4 w-4 text-accent" />
            {PHONE_DISPLAY}
          </a>
          <Button variant="telegram" className="mt-2" asChild>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              Написать в Telegram
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
