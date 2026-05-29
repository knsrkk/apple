"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SERVICE_DISTRICTS } from "@/lib/chita-districts";
import { CITY } from "@/lib/constants";

const ChitaDistrictMap = dynamic(
  () =>
    import("@/components/ChitaDistrictMap").then((m) => m.ChitaDistrictMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-[#141414] text-sm text-muted-foreground">
        Загрузка карты…
      </div>
    ),
  },
);

export function MapSection() {
  return (
    <section id="map" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Районы выкупа в {CITY}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Отмечены зоны, куда выезжаем за 30 минут — встреча у дома, в офисе или
            на удобной точке
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="glass-panel mt-10 overflow-hidden rounded-2xl">
            <div className="grid lg:grid-cols-5">
              <div className="relative min-h-[320px] lg:col-span-3 lg:min-h-[400px]">
                <ChitaDistrictMap />
              </div>
              <div className="border-t border-white/10 p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
                <div className="mb-4 flex items-center gap-2 text-accent">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">Зоны выкупа на карте</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  Бесплатный выезд курьера для оценки iPhone. Работаем ежедневно с
                  10:00 до 21:00 по указанным районам.
                </p>
                <ul className="space-y-3">
                  {SERVICE_DISTRICTS.map((d) => (
                    <li key={d.id} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-sm ring-1 ring-white/20"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {d.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground">
                  Также выезжаем в Железнодорожный, на Каштак и в другие части
                  города — уточните в заявке.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
