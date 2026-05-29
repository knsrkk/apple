"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/FadeIn";
import {
  CALCULATOR_MODELS,
  CONDITION_MULTIPLIERS,
  DEVICE_CONDITIONS,
  PRICE_TABLE,
  type DeviceCondition,
} from "@/lib/constants";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";
}

export function Calculator() {
  const [model, setModel] = useState(CALCULATOR_MODELS[0]);
  const [condition, setCondition] = useState<DeviceCondition>("Отличное");

  const estimatedPrice = useMemo(() => {
    const row = PRICE_TABLE[model] ?? PRICE_TABLE["iPhone 13"];
    const basePrice = row.excellent;
    const multiplier = CONDITION_MULTIPLIERS[condition];
    return basePrice * multiplier;
  }, [model, condition]);

  return (
    <section id="calculator" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Калькулятор оценки
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Примерная стоимость — финальную цену уточним после осмотра
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Рассчитать выкуп</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Модель iPhone</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите модель" />
                  </SelectTrigger>
                  <SelectContent>
                    {CALCULATOR_MODELS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Состояние</Label>
                <Select
                  value={condition}
                  onValueChange={(v) => setCondition(v as DeviceCondition)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите состояние" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_CONDITIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
                <p className="text-sm text-muted-foreground">Примерная цена выкупа</p>
                <p className="mt-2 text-4xl font-bold text-accent">
                  {formatPrice(estimatedPrice)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  * Не является публичной офертой. Точная сумма после проверки устройства.
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
