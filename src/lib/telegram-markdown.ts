/** Экранирование спецсимволов MarkdownV2 (Telegram) */
export function escapeMarkdownV2(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export function escapeMarkdown(text: string): string {
  return text.replace(/([_*`\[])/g, "\\$1");
}
