import { NextRequest, NextResponse } from "next/server";
import { formatPriceRub } from "@/lib/pricing";
import { escapeMarkdown } from "@/lib/telegram-markdown";
import { telegramPayloadSchema } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 25 * 1024 * 1024;
const MAX_CAPTION_LENGTH = 1024;

interface SummaryData {
  name: string;
  phone: string;
  model: string;
  memory?: string;
  condition: string;
  estimatedPrice: number;
  telegramUsername?: string;
  comment?: string;
}

interface PhotoBuffer {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
}

function buildSummaryMarkdown(data: SummaryData): string {
  const tg = data.telegramUsername
    ? `@${escapeMarkdown(data.telegramUsername)}`
    : "—";

  const lines = [
    "📱 *Новая заявка на выкуп iPhone*",
    "",
    `👤 *Имя:* ${escapeMarkdown(data.name)}`,
    `📲 *Модель:* ${escapeMarkdown(data.model)}`,
    `💾 *Память:* ${escapeMarkdown(data.memory?.trim() || "—")}`,
    `🔧 *Состояние:* ${escapeMarkdown(data.condition)}`,
    `💰 *Итоговая цена:* ${escapeMarkdown(formatPriceRub(data.estimatedPrice))}`,
    `📞 *Телефон:* ${escapeMarkdown(data.phone)}`,
    `✈️ *Telegram:* ${tg}`,
  ];

  if (data.comment?.trim()) {
    lines.push(`💬 *Комментарий:* ${escapeMarkdown(data.comment.trim())}`);
  }

  lines.push(
    "",
    `🕐 ${escapeMarkdown(
      new Date().toLocaleString("ru-RU", { timeZone: "Asia/Chita" }),
    )} (Чита)`,
  );

  const text = lines.join("\n");
  return text.length > MAX_CAPTION_LENGTH
    ? text.slice(0, MAX_CAPTION_LENGTH - 3) + "..."
    : text;
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    },
  );

  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.description ?? "Telegram sendMessage error");
  }
}

/** Все фото одним альбомом (sendMediaGroup) */
async function sendTelegramMediaGroup(
  token: string,
  chatId: string,
  photos: PhotoBuffer[],
  caption: string,
): Promise<void> {
  const formData = new FormData();
  formData.append("chat_id", chatId);

  const media = photos.map((photo, i) => ({
    type: "photo" as const,
    media: `attach://photo${i}`,
    ...(i === 0 ? { caption, parse_mode: "Markdown" } : {}),
  }));

  formData.append("media", JSON.stringify(media));

  photos.forEach((photo, i) => {
    const blob = new Blob([new Uint8Array(photo.buffer)], {
      type: photo.mimeType,
    });
    formData.append(`photo${i}`, blob, photo.fileName);
  });

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMediaGroup`,
    { method: "POST", body: formData },
  );

  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!res.ok || !data.ok) {
    throw new Error(data.description ?? "Telegram sendMediaGroup error");
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        {
          error:
            "Telegram не настроен. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local",
        },
        { status: 500 },
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Слишком большой размер заявки" },
        { status: 413 },
      );
    }

    const body: unknown = await request.json();
    const parsed = telegramPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные формы", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const {
      name,
      phone,
      model,
      memory,
      condition,
      comment,
      telegramUsername: rawTg,
      estimatedPrice,
      photos,
    } = parsed.data;

    const telegramUsername = rawTg?.replace(/^@/, "").trim() || undefined;

    const summary = buildSummaryMarkdown({
      name,
      phone,
      model,
      memory,
      condition,
      estimatedPrice,
      telegramUsername,
      comment,
    });

    if (photos && photos.length > 0) {
      const buffers: PhotoBuffer[] = photos.map((photo, i) => {
        const ext =
          photo.mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
        return {
          buffer: Buffer.from(photo.data, "base64"),
          mimeType: photo.mimeType,
          fileName: photo.fileName ?? `photo-${i + 1}.${ext}`,
        };
      });

      await sendTelegramMediaGroup(token, chatId, buffers, summary);
    } else {
      await sendTelegramMessage(token, chatId, summary);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram send error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Не удалось отправить сообщение в Telegram",
      },
      { status: 500 },
    );
  }
}
