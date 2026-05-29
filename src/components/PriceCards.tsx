import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { PRICE_CARDS } from "@/lib/constants";
import { formatPriceRub } from "@/lib/pricing";

export function PriceCards() {
  return (
    <section id="prices" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Ориентировочные цены выкупа
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Актуальный прайс по модели, памяти и состоянию. Точную сумму назовём за 5
            минут после заявки.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PRICE_CARDS.map((card, i) => (
            <FadeIn key={card.model} delay={i * 80}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-accent">{card.model}</CardTitle>
                  <p className="text-sm text-muted-foreground">{card.memoryLabel}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {card.rows.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between gap-2 border-b border-border/50 py-1.5 last:border-0"
                    >
                      <span className="text-xs text-muted-foreground sm:text-sm">
                        {p.label}
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-foreground">
                        {formatPriceRub(p.value)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
