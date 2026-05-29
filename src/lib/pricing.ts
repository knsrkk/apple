import {
  CONDITION_MULTIPLIERS,
  PRICE_TABLE,
  type DeviceCondition,
} from "./constants";

export function findPriceRowKey(model: string): string {
  const match = model.match(/iPhone\s+(\d+)/i);
  if (match) {
    const key = `iPhone ${match[1]}`;
    if (PRICE_TABLE[key]) return key;
  }
  return "iPhone 13";
}

export function calculateEstimatedPrice(
  model: string,
  condition: DeviceCondition,
): number {
  const key = findPriceRowKey(model);
  const row = PRICE_TABLE[key] ?? PRICE_TABLE["iPhone 13"];
  const multiplier = CONDITION_MULTIPLIERS[condition];
  return Math.round(row.excellent * multiplier);
}

export function formatPriceRub(value: number): string {
  return (
    new Intl.NumberFormat("ru-RU").format(value) + " ₽"
  );
}
