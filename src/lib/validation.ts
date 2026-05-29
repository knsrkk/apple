import { z } from "zod";
import { DEVICE_CONDITIONS, IPHONE_MODELS } from "./constants";
import { getMemoriesForModel } from "./price-data";

export const sellFormSchema = z
  .object({
    name: z.string().trim().min(1, "Введите имя"),
    phone: z
      .string()
      .trim()
      .min(1, "Введите телефон")
      .refine(
        (val) => val.replace(/\D/g, "").length >= 10,
        "Телефон должен содержать не менее 10 цифр",
      ),
    model: z.enum(IPHONE_MODELS as [string, ...string[]], {
      message: "Выберите модель",
    }),
    memoryGb: z.number().int().positive("Выберите память"),
    condition: z.enum(DEVICE_CONDITIONS, { message: "Выберите состояние" }),
    telegramUsername: z.string().trim().optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const memories = getMemoriesForModel(data.model);
    if (!memories.includes(data.memoryGb)) {
      ctx.addIssue({
        code: "custom",
        message: "Выберите память для этой модели",
        path: ["memoryGb"],
      });
    }
  });

export type SellFormValues = z.infer<typeof sellFormSchema>;

const photoBase64Schema = z.object({
  data: z.string().min(1),
  mimeType: z.string().default("image/jpeg"),
  fileName: z.string().optional(),
});

export const telegramPayloadSchema = sellFormSchema.extend({
  estimatedPrice: z.number().positive(),
  photos: z.array(photoBase64Schema).max(10).optional(),
});

export type TelegramPayload = z.infer<typeof telegramPayloadSchema>;
export type PhotoPayload = z.infer<typeof photoBase64Schema>;
