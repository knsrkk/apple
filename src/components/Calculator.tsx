"use client";

import { useEffect, useMemo, useState } from "react";
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
import { DEVICE_CONDITIONS, IPHONE_MODELS, type DeviceCondition } from "@/lib/constants";
import {
  calculateEstimatedPrice,
  formatMemoryGb,
  formatPriceRub,
  getMemoriesForModel,
} from "@/lib/pricing";

export function Calculator() {
  const defaultModel = IPHONE_MODELS.find((m) => m === "iPhone 14") ?? IPHONE_MODELS[0];
  const defaultMemories = getMemoriesForModel(defaultModel);
  const defaultMemory =
    defaultMemories.find((m) => m === 128) ?? defaultMemories[0] ?? 128;

  const [model, setModel] = useState(defaultModel);
  const [memoryGb, setMemoryGb] = useState(defaultMemory);
  const [condition, setCondition] = useState<DeviceCondition>("Отличное");

  const memories = useMemo(() => getMemoriesForModel(model), [model]);

  useEffect(() => {
    if (!memories.includes(memoryGb)) {
      setMemoryGb(memories.includes(128) ? 128 : memories[0]);
    }
  }, [model, memories, memoryGb]);

  const estimatedPrice = useMemo(
    () => calculateEstimatedPrice(model, memoryGb, condition),
    [model, memoryGb, condition],
  );

  return (
    <section id="calculator" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Калькулятор оценки
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Точная цена из прайса — финальную сумму подтвердим после осмотра
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
                    {IPHONE_MODELS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Память</Label>
                <Select
                  value={String(memoryGb)}
                  onValueChange={(v) => setMemoryGb(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите объём" />
                  </SelectTrigger>
                  <SelectContent>
                    {memories.map((gb) => (
                      <SelectItem key={gb} value={String(gb)}>
                        {formatMemoryGb(gb)}
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
                <p className="text-sm text-muted-foreground">Цена выкупа</p>
                <p className="mt-2 text-4xl font-bold text-accent">
                  {formatPriceRub(estimatedPrice)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {model} · {formatMemoryGb(memoryGb)} · {condition}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
