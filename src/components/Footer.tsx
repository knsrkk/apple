import Link from "next/link";
import { Apple, MessageCircle, Phone } from "lucide-react";
import {
  CITY,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_RAW,
  SITE_NAME,
  TELEGRAM_USERNAME,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-header mt-8 border-t px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Apple className="h-6 w-6 text-accent" />
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Выкуп iPhone и техники Apple в {CITY}. Честная оценка, быстрая оплата,
              выезд по городу за 30 минут.
            </p>
          </div>

          <div>
            <p className="mb-3 font-medium text-foreground">Навигация</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-medium text-foreground">Контакты</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${PHONE_RAW.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[#2AABEE]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Telegram — написать
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li className="text-muted-foreground">
                Telegram: {TELEGRAM_USERNAME}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {year} {SITE_NAME}. Все права защищены. г. {CITY}
        </div>
      </div>
    </footer>
  );
}
