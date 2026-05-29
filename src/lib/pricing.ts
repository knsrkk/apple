import type { DeviceCondition } from "./constants";
import {
  getMemoriesForModel,
  getPrice,
  formatMemoryGb,
} from "./price-data";

export function calculateEstimatedPrice(
  model: string,
  memoryGb: number,
  condition: DeviceCondition,
): number {
  const price = getPrice(model, memoryGb, condition);
  if (price !== null) return price;

  const memories = getMemoriesForModel(model);
  if (memories.length === 0) return 0;

  const fallback = getPrice(model, memories[0], condition);
  return fallback ?? 0;
}

export function formatPriceRub(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export { formatMemoryGb, getMemoriesForModel, getPrice };
