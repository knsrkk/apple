export const DEVICE_CONDITIONS = [
  "Отличное",
  "Хорошее",
  "Царапины",
  "Битое стекло",
  "Не включается",
  "Заблокированный",
] as const;

export type DeviceCondition = (typeof DEVICE_CONDITIONS)[number];

export type ConditionKey =
  | "excellent"
  | "good"
  | "scratches"
  | "brokenGlass"
  | "noPower"
  | "locked";

export interface PriceEntry {
  model: string;
  memoryGb: number;
  prices: Record<ConditionKey, number>;
}

/** model, memoryGb, отличное, хорошее, царапины, битое стекло, не включается, заблокированный */
const RAW: [string, number, number, number, number, number, number, number][] =
  [
    ["iPhone X", 64, 3000, 2500, 1800, 1000, 600, 500],
    ["iPhone X", 256, 3500, 3000, 2200, 1200, 700, 600],
    ["iPhone XR", 64, 4000, 3300, 2500, 1400, 800, 700],
    ["iPhone XR", 128, 4500, 3800, 2800, 1600, 900, 800],
    ["iPhone XS", 64, 5000, 4200, 3200, 1800, 1100, 900],
    ["iPhone XS", 256, 5500, 4700, 3600, 2000, 1200, 1000],
    ["iPhone XS Max", 64, 6000, 5000, 3800, 2200, 1300, 1100],
    ["iPhone XS Max", 256, 6500, 5500, 4200, 2400, 1400, 1200],
    ["iPhone 11", 64, 4500, 3800, 2800, 1600, 900, 800],
    ["iPhone 11", 128, 5500, 4700, 3600, 2000, 1100, 950],
    ["iPhone 11", 256, 6500, 5600, 4300, 2400, 1300, 1100],
    ["iPhone 11 Pro", 64, 8000, 6800, 5200, 3000, 1700, 1500],
    ["iPhone 11 Pro", 256, 9000, 7700, 5900, 3400, 1900, 1700],
    ["iPhone 11 Pro Max", 64, 9500, 8100, 6200, 3600, 2000, 1800],
    ["iPhone 11 Pro Max", 256, 10500, 9000, 6900, 4000, 2200, 2000],
    ["iPhone 12 Mini", 64, 6500, 5500, 4200, 2400, 1400, 1200],
    ["iPhone 12 Mini", 128, 7500, 6400, 4900, 2800, 1600, 1400],
    ["iPhone 12", 64, 7500, 6400, 4900, 2800, 1600, 1400],
    ["iPhone 12", 128, 8500, 7300, 5600, 3200, 1800, 1600],
    ["iPhone 12", 256, 9500, 8200, 6300, 3600, 2000, 1800],
    ["iPhone 12 Pro", 128, 12000, 10300, 8000, 4600, 2600, 2300],
    ["iPhone 12 Pro", 256, 13500, 11600, 9000, 5200, 2900, 2600],
    ["iPhone 12 Pro", 512, 15000, 12900, 10000, 5800, 3200, 2900],
    ["iPhone 12 Pro Max", 128, 14000, 12000, 9300, 5400, 3000, 2700],
    ["iPhone 12 Pro Max", 256, 15500, 13300, 10300, 6000, 3300, 3000],
    ["iPhone 12 Pro Max", 512, 17000, 14600, 11300, 6600, 3600, 3300],
    ["iPhone 13 Mini", 128, 10000, 8600, 6700, 3900, 2200, 2000],
    ["iPhone 13 Mini", 256, 11500, 9900, 7700, 4500, 2500, 2300],
    ["iPhone 13", 128, 12000, 10300, 8000, 4600, 2600, 2300],
    ["iPhone 13", 256, 13500, 11600, 9000, 5200, 2900, 2600],
    ["iPhone 13", 512, 15000, 12900, 10000, 5800, 3200, 2900],
    ["iPhone 13 Pro", 128, 18000, 15500, 12000, 7000, 3900, 3500],
    ["iPhone 13 Pro", 256, 20000, 17200, 13300, 7800, 4300, 3900],
    ["iPhone 13 Pro", 512, 22000, 18900, 14600, 8600, 4700, 4300],
    ["iPhone 13 Pro", 1024, 24000, 20600, 16000, 9400, 5100, 4700],
    ["iPhone 13 Pro Max", 128, 21000, 18000, 14000, 8200, 4500, 4100],
    ["iPhone 13 Pro Max", 256, 23500, 20200, 15700, 9200, 5000, 4600],
    ["iPhone 13 Pro Max", 512, 26000, 22400, 17400, 10200, 5500, 5100],
    ["iPhone 13 Pro Max", 1024, 28500, 24500, 19100, 11200, 6000, 5600],
    ["iPhone 14", 128, 20000, 17200, 13300, 7800, 4300, 3900],
    ["iPhone 14", 256, 22000, 18900, 14600, 8600, 4700, 4300],
    ["iPhone 14", 512, 24000, 20600, 16000, 9400, 5100, 4700],
    ["iPhone 14 Plus", 128, 23000, 19800, 15300, 9000, 4900, 4500],
    ["iPhone 14 Plus", 256, 25500, 21900, 17000, 10000, 5400, 5000],
    ["iPhone 14 Plus", 512, 28000, 24000, 18700, 11000, 5900, 5500],
    ["iPhone 14 Pro", 128, 30000, 25800, 20000, 11800, 6400, 5900],
    ["iPhone 14 Pro", 256, 33000, 28400, 22000, 13000, 7000, 6500],
    ["iPhone 14 Pro", 512, 36000, 31000, 24000, 14200, 7600, 7100],
    ["iPhone 14 Pro", 1024, 39000, 33500, 26000, 15400, 8200, 7700],
    ["iPhone 14 Pro Max", 128, 34000, 29200, 22700, 13400, 7200, 6700],
    ["iPhone 14 Pro Max", 256, 37500, 32200, 25000, 14800, 7900, 7400],
    ["iPhone 14 Pro Max", 512, 41000, 35300, 27400, 16200, 8600, 8100],
    ["iPhone 14 Pro Max", 1024, 44500, 38300, 29800, 17600, 9300, 8800],
    ["iPhone 15", 128, 33000, 28400, 22000, 13000, 7000, 6500],
    ["iPhone 15", 256, 36000, 31000, 24000, 14200, 7600, 7100],
    ["iPhone 15", 512, 39000, 33500, 26000, 15400, 8200, 7700],
    ["iPhone 15 Plus", 128, 37000, 31800, 24700, 14600, 7800, 7300],
    ["iPhone 15 Plus", 256, 40500, 34800, 27000, 16000, 8500, 8000],
    ["iPhone 15 Plus", 512, 44000, 37800, 29400, 17400, 9200, 8700],
    ["iPhone 15 Pro", 128, 44000, 37800, 29400, 17400, 9200, 8700],
    ["iPhone 15 Pro", 256, 48000, 41300, 32000, 19000, 10000, 9500],
    ["iPhone 15 Pro", 512, 52000, 44700, 34700, 20600, 10800, 10300],
    ["iPhone 15 Pro", 1024, 56000, 48200, 37400, 22200, 11600, 11100],
    ["iPhone 15 Pro Max", 128, 50000, 43000, 33400, 19800, 10400, 9900],
    ["iPhone 15 Pro Max", 256, 55000, 47300, 36700, 21800, 11400, 10900],
    ["iPhone 15 Pro Max", 512, 60000, 51600, 40000, 23800, 12400, 11900],
    ["iPhone 15 Pro Max", 1024, 65000, 55900, 43400, 25800, 13400, 12900],
    ["iPhone 16", 128, 42000, 36100, 28000, 16600, 8800, 8300],
    ["iPhone 16", 256, 46000, 39600, 30700, 18200, 9600, 9100],
    ["iPhone 16", 512, 50000, 43000, 33400, 19800, 10400, 9900],
    ["iPhone 16 Plus", 128, 47000, 40400, 31300, 18600, 9800, 9300],
    ["iPhone 16 Plus", 256, 51500, 44300, 34300, 20400, 10700, 10200],
    ["iPhone 16 Plus", 512, 56000, 48200, 37400, 22200, 11600, 11100],
    ["iPhone 16 Pro", 128, 56000, 48200, 37400, 22200, 11600, 11100],
    ["iPhone 16 Pro", 256, 61000, 52500, 40700, 24200, 12600, 12100],
    ["iPhone 16 Pro", 512, 66000, 56800, 44000, 26200, 13600, 13100],
    ["iPhone 16 Pro", 1024, 71000, 61100, 47400, 28200, 14600, 14100],
    ["iPhone 16 Pro Max", 128, 63000, 54200, 42000, 25000, 13000, 12500],
    ["iPhone 16 Pro Max", 256, 69000, 59300, 46000, 27400, 14200, 13700],
    ["iPhone 16 Pro Max", 512, 75000, 64500, 50000, 29800, 15400, 14900],
    ["iPhone 16 Pro Max", 1024, 81000, 69700, 54000, 32200, 16600, 16100],
    ["iPhone 17", 128, 56000, 48200, 37400, 22200, 11600, 11100],
    ["iPhone 17", 256, 61000, 52500, 40700, 24200, 12600, 12100],
    ["iPhone 17", 512, 66000, 56800, 44000, 26200, 13600, 13100],
    ["iPhone 17 Plus", 128, 63000, 54200, 42000, 25000, 13000, 12500],
    ["iPhone 17 Plus", 256, 69000, 59300, 46000, 27400, 14200, 13700],
    ["iPhone 17 Plus", 512, 75000, 64500, 50000, 29800, 15400, 14900],
    ["iPhone 17 Pro", 128, 75000, 64500, 50000, 29800, 15400, 14900],
    ["iPhone 17 Pro", 256, 82000, 70500, 54700, 32600, 16800, 16300],
    ["iPhone 17 Pro", 512, 89000, 76500, 59400, 35400, 18200, 17700],
    ["iPhone 17 Pro", 1024, 96000, 82600, 64100, 38200, 19600, 19100],
    ["iPhone 17 Pro Max", 128, 85000, 73100, 56700, 33800, 17400, 16900],
    ["iPhone 17 Pro Max", 256, 93000, 80000, 62000, 37000, 19000, 18500],
    ["iPhone 17 Pro Max", 512, 101000, 86900, 67400, 40200, 20600, 20100],
    ["iPhone 17 Pro Max", 1024, 109000, 93700, 72700, 43400, 22200, 21700],
  ];

export const CONDITION_TO_KEY: Record<DeviceCondition, ConditionKey> = {
  Отличное: "excellent",
  Хорошее: "good",
  Царапины: "scratches",
  "Битое стекло": "brokenGlass",
  "Не включается": "noPower",
  Заблокированный: "locked",
};

export const PRICE_ENTRIES: PriceEntry[] = RAW.map(
  ([model, memoryGb, excellent, good, scratches, brokenGlass, noPower, locked]) => ({
    model,
    memoryGb,
    prices: { excellent, good, scratches, brokenGlass, noPower, locked },
  }),
);

const priceMap = new Map<string, PriceEntry>(
  PRICE_ENTRIES.map((e) => [`${e.model}|${e.memoryGb}`, e]),
);

export const IPHONE_MODELS = [...new Set(PRICE_ENTRIES.map((e) => e.model))] as string[];

export function formatMemoryGb(gb: number): string {
  return gb >= 1024 ? "1 ТБ" : `${gb} ГБ`;
}

export function getMemoriesForModel(model: string): number[] {
  return PRICE_ENTRIES.filter((e) => e.model === model)
    .map((e) => e.memoryGb)
    .sort((a, b) => a - b);
}

export function getPriceEntry(
  model: string,
  memoryGb: number,
): PriceEntry | undefined {
  return priceMap.get(`${model}|${memoryGb}`);
}

export function getPrice(
  model: string,
  memoryGb: number,
  condition: DeviceCondition,
): number | null {
  const entry = getPriceEntry(model, memoryGb);
  if (!entry) return null;
  return entry.prices[CONDITION_TO_KEY[condition]];
}

export interface FeaturedPriceCard {
  model: string;
  memoryGb: number;
  memoryLabel: string;
  rows: { label: DeviceCondition; value: number }[];
}

/** Карточки на главной — популярные модели, 128 ГБ (или первый доступный объём) */
export const FEATURED_PRICE_CARDS: FeaturedPriceCard[] = [
  "iPhone 13",
  "iPhone 14 Pro",
  "iPhone 15 Pro",
  "iPhone 16 Pro Max",
].map((model) => {
  const memories = getMemoriesForModel(model);
  const memoryGb = memories.includes(128) ? 128 : memories[0];
  const entry = getPriceEntry(model, memoryGb)!;
  const conditions: DeviceCondition[] = [
    "Отличное",
    "Хорошее",
    "Царапины",
    "Битое стекло",
    "Не включается",
    "Заблокированный",
  ];
  return {
    model,
    memoryGb,
    memoryLabel: formatMemoryGb(memoryGb),
    rows: conditions.map((label) => ({
      label,
      value: entry.prices[CONDITION_TO_KEY[label]],
    })),
  };
});
