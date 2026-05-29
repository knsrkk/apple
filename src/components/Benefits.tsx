import { Banknote, Car, Smartphone, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";

const BENEFITS = [
  {
    icon: Smartphone,
    title: "Любое состояние",
    description:
      "Принимаем iPhone с царапинами, битым стеклом и даже не включающиеся — предложим честную цену.",
  },
  {
    icon: Car,
    title: "Бесплатный выезд",
    description:
      "Курьер приедет в Центральный, Железнодорожный, Ингодинский и другие районы Читы за 30 минут.",
  },
  {
    icon: Banknote,
    title: "Деньги сразу",
    description:
      "Оплата наличными или переводом на карту в момент сделки — без ожидания и комиссий.",
  },
  {
    icon: TrendingUp,
    title: "Выше Авито",
    description:
      "Не тратьте недели на объявления — продайте iPhone профессионалам за один визит.",
  },
];

export function Benefits() {
  return (
    <section id="advantages" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Почему выбирают нас в Чите
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Работаем с 2019 года — сотни довольных клиентов по Забайкалью
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <Card className="h-full transition-colors hover:border-accent/30">
                <CardHeader>
                  <item.icon className="mb-2 h-8 w-8 text-accent" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
