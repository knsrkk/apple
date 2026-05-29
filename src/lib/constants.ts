export const SITE_NAME = "Apple Выкуп Чита";
export const CITY = "Чита";
export const PHONE_DISPLAY = "+7 (914) 000-00-00";
export const PHONE_RAW = "+79140000000";
export const WHATSAPP_URL = "https://wa.me/79140000000";
export const TELEGRAM_USERNAME = "@your_username";
/** Ссылка на личный Telegram или бота */
export const TELEGRAM_URL = "https://t.me/your_username";

export const STORAGE_OPTIONS = [
  "64 ГБ",
  "128 ГБ",
  "256 ГБ",
  "512 ГБ",
  "1 ТБ",
] as const;

/** Галерея выкупов — положите фото в public/gallery/ и укажите .jpg в src */
export const BUYOUT_GALLERY = [
  {
    id: "1",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
  {
    id: "2",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
  {
    id: "3",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
  {
    id: "4",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
  {
    id: "5",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
  {
    id: "6",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "от 42 000 ₽",
  },
] as const;

export const NAV_LINKS = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#gallery", label: "Выкупы" },
  { href: "#prices", label: "Цены" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#form", label: "Оценка" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#map", label: "Районы" },
] as const;

export const IPHONE_MODELS = [
  "iPhone 12",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
] as const;

export const DEVICE_CONDITIONS = [
  "Отличное",
  "Хорошее",
  "Царапины",
  "Битое стекло",
  "Не включается",
] as const;

export type DeviceCondition = (typeof DEVICE_CONDITIONS)[number];
export type IphoneModel = (typeof IPHONE_MODELS)[number];

export const CONDITION_LABELS: Record<DeviceCondition, string> = {
  Отличное: "Отличное",
  Хорошее: "Хорошее",
  Царапины: "Царапины",
  "Битое стекло": "Битое стекло",
  "Не включается": "Не включается",
};

/** Базовые цены выкупа (₽) для калькулятора и карточек */
export const PRICE_TABLE: Record<
  string,
  Record<"excellent" | "good" | "damaged", number>
> = {
  "iPhone 12": { excellent: 22000, good: 18000, damaged: 12000 },
  "iPhone 13": { excellent: 32000, good: 27000, damaged: 18000 },
  "iPhone 14": { excellent: 42000, good: 36000, damaged: 24000 },
  "iPhone 15": { excellent: 55000, good: 48000, damaged: 32000 },
  "iPhone 16": { excellent: 68000, good: 60000, damaged: 40000 },
};

export const PRICE_CARDS = [
  {
    model: "iPhone 13",
    prices: [
      { label: "Отличное", value: 32000 },
      { label: "Хорошее", value: 27000 },
      { label: "С дефектами", value: 18000 },
    ],
  },
  {
    model: "iPhone 14",
    prices: [
      { label: "Отличное", value: 42000 },
      { label: "Хорошее", value: 36000 },
      { label: "С дефектами", value: 24000 },
    ],
  },
  {
    model: "iPhone 15",
    prices: [
      { label: "Отличное", value: 55000 },
      { label: "Хорошее", value: 48000 },
      { label: "С дефектами", value: 32000 },
    ],
  },
  {
    model: "iPhone 16 Pro",
    prices: [
      { label: "Отличное", value: 85000 },
      { label: "Хорошее", value: 75000 },
      { label: "С дефектами", value: 52000 },
    ],
  },
] as const;

export const CALCULATOR_MODELS = Object.keys(PRICE_TABLE);

export const CONDITION_MULTIPLIERS: Record<DeviceCondition, number> = {
  Отличное: 1,
  Хорошее: 0.85,
  Царапины: 0.7,
  "Битое стекло": 0.55,
  "Не включается": 0.4,
};

export const CHITA_DISTRICTS = [
  "Центральный",
  "Железнодорожный",
  "Ингодинский",
  "Черновский",
  "Северный",
  "Аэропорт",
  "Каштак",
  "Посёлок Смоленка",
] as const;

export const REVIEWS = [
  {
    name: "Алексей М.",
    text: "Продал iPhone 14 Pro за 15 минут. Приехали в Железнодорожный район, деньги сразу на руки. Рекомендую!",
    rating: 5,
  },
  {
    name: "Марина К.",
    text: "Честная оценка, без скрытых комиссий. Удобно, что можно написать в WhatsApp и вызвать курьера по Чите.",
    rating: 5,
  },
  {
    name: "Дмитрий С.",
    text: "Сдал битый iPhone 12 — предложили нормальную цену. Быстрее, чем везти в сервис или продавать на авито.",
    rating: 5,
  },
] as const;
