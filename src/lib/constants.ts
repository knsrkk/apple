import {
  DEVICE_CONDITIONS,
  FEATURED_PRICE_CARDS,
  IPHONE_MODELS as MODELS_FROM_PRICES,
  type DeviceCondition,
} from "./price-data";

export { DEVICE_CONDITIONS, type DeviceCondition };

export const SITE_NAME = "Apple Выкуп Чита";
export const CITY = "Чита";
export const PHONE_DISPLAY = "+7 (914) 000-00-00";
export const PHONE_RAW = "+79140000000";
export const WHATSAPP_URL = "https://wa.me/79140000000";
export const TELEGRAM_USERNAME = "@your_username";
/** Ссылка на личный Telegram или бота */
export const TELEGRAM_URL = "https://t.me/your_username";

/** Галерея выкупов — положите фото в public/gallery/ */
export const BUYOUT_GALLERY = [
  {
    id: "1",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
  },
  {
    id: "2",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
  },
  {
    id: "3",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
  },
  {
    id: "4",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
  },
  {
    id: "5",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
  },
  {
    id: "6",
    src: "/gallery/buyout-1.jpg",
    alt: "Выкуп iPhone 14 Pro в Чите",
    title: "iPhone 14 Pro",
    price: "До 35 000 ₽",
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

export const IPHONE_MODELS = MODELS_FROM_PRICES as readonly string[];

export type IphoneModel = (typeof IPHONE_MODELS)[number];

/** Карточки цен на главной (из полного прайса) */
export { FEATURED_PRICE_CARDS as PRICE_CARDS };

export const CHITA_DISTRICTS = [
  "Центральный",
  "Железнодорожный",
  "Ингодинский",
  "Черновский",
  "Северный",
] as const;

export const REVIEWS = [
  {
    name: "Алексей М.",
    text: "Продал iPhone 14 Pro за 15 минут. Приехали в Железнодорожный район, деньги сразу на руки. Рекомендую!",
    rating: 5,
  },
  {
    name: "Марина К.",
    text: "Честная оценка, без скрытых комиссий. Удобно, что можно написать в Telegram и вызвать курьера по Чите.",
    rating: 5,
  },
  {
    name: "Дмитрий С.",
    text: "Сдал битый iPhone 12 — предложили нормальную цену. Быстрее, чем везти в сервис или продавать на авито.",
    rating: 5,
  },
] as const;
