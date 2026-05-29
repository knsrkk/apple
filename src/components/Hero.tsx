import { Clock, MapPin, Send, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { CITY, TELEGRAM_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.1)_0%,_transparent_50%)]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-[#2AABEE]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <p className="glass-chip mb-4 inline-flex items-center gap-2 px-4 py-1.5 text-sm text-accent">
            <MapPin className="h-4 w-4" />
            Выкуп iPhone в {CITY} — честная цена за 5 минут
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Продайте iPhone в Чите{" "}
            <span className="bg-gradient-to-r from-accent to-[#f5e6a8] bg-clip-text text-transparent">
              дорого и быстро
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Выкупаем iPhone и технику Apple по рыночной цене. Оценка онлайн,
            выезд курьера за 30 минут по всему городу. Деньги сразу — наличными
            или на карту.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#form">Оценить iPhone бесплатно</a>
            </Button>
            <Button size="lg" variant="telegram" asChild>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4" />
                Написать в Telegram
              </a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "30 минут по Чите",
                text: "Выезжаем в любой район города",
              },
              {
                icon: ShieldCheck,
                title: "Безопасная сделка",
                text: "Проверка IMEI, прозрачный договор",
              },
              {
                icon: Zap,
                title: "Моментальная оплата",
                text: "Деньги в день обращения",
              },
            ].map((item) => (
              <div key={item.title} className="glass-panel flex items-start gap-3 p-4">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
