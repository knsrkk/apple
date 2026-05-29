import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { PRICE_CARDS } from "@/lib/constants";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export function PriceCards() {
  return (
    <section id="prices" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Ориентировочные цены выкупа
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Точная сумма зависит от памяти, батареи и комплекта. Оставьте заявку —
            назовём цену за 5 минут.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICE_CARDS.map((card, i) => (
            <FadeIn key={card.model} delay={i * 80}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-accent">{card.model}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {card.prices.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">{p.label}</span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(p.value)}
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
