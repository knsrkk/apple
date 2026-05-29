"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImagePlus, Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/FadeIn";
import { Toast } from "@/components/Toast";
import {
  DEVICE_CONDITIONS,
  IPHONE_MODELS,
  type DeviceCondition,
  type IphoneModel,
} from "@/lib/constants";
import { filesToBase64Payload } from "@/lib/files";
import {
  calculateEstimatedPrice,
  formatMemoryGb,
  formatPriceRub,
  getMemoriesForModel,
} from "@/lib/pricing";
import { playVictorySound } from "@/lib/sound";
import { sellFormSchema, type SellFormValues } from "@/lib/validation";

const MAX_PHOTOS = 10;

export function SellForm() {
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      model: "iPhone 14",
      memoryGb: 128,
      condition: "Отличное",
      telegramUsername: "",
      comment: "",
    },
  });

  const model = watch("model");
  const memoryGb = watch("memoryGb");
  const condition = watch("condition");

  const memories = getMemoriesForModel(model);

  useEffect(() => {
    if (memories.length && !memories.includes(memoryGb)) {
      setValue("memoryGb", memories.includes(128) ? 128 : memories[0]);
    }
  }, [model, memories, memoryGb, setValue]);

  const revokePreviews = useCallback((urls: string[]) => {
    urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  useEffect(() => {
    return () => revokePreviews(photoPreviews);
  }, [photoPreviews, revokePreviews]);

  const onPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (!picked.length) return;

    const merged = [...photoFiles, ...picked].slice(0, MAX_PHOTOS);
    revokePreviews(photoPreviews);
    setPhotoFiles(merged);
    setPhotoPreviews(merged.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearPhotos = () => {
    revokePreviews(photoPreviews);
    setPhotoFiles([]);
    setPhotoPreviews([]);
  };

  const onSubmit = async (data: SellFormValues) => {
    setSubmitting(true);
    setServerError(null);
    setToastVisible(false);

    try {
      const estimatedPrice = calculateEstimatedPrice(
        data.model,
        data.memoryGb,
        data.condition,
      );
      const photos =
        photoFiles.length > 0 ? await filesToBase64Payload(photoFiles) : undefined;

      await axios.post("/api/send-telegram", {
        ...data,
        estimatedPrice,
        photos,
      });

      playVictorySound();
      setToastVisible(true);
      reset();
      clearPhotos();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setServerError(
          (err.response?.data as { error?: string })?.error ??
            "Не удалось отправить заявку. Попробуйте позже или напишите в Telegram.",
        );
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Произошла ошибка. Попробуйте позже.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const previewPrice =
    model && memoryGb && condition
      ? calculateEstimatedPrice(model, memoryGb, condition as DeviceCondition)
      : null;

  return (
    <>
      <Toast
        visible={toastVisible}
        message="Заявка отправлена!"
        description="Свяжемся с вами в течение 5 минут"
        onClose={() => setToastVisible(false)}
      />

      <section id="form" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
              Оценить iPhone онлайн
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Заполните форму — ответим в Telegram и перезвоним в течение 5 минут
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <Card className="mt-8 glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-accent" />
                  Заявка на выкуп
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input id="name" placeholder="Иван" {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (914) 000-00-00"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-400">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegramUsername">
                      Telegram username{" "}
                      <span className="text-muted-foreground">(необязательно)</span>
                    </Label>
                    <Input
                      id="telegramUsername"
                      placeholder="@username"
                      {...register("telegramUsername")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Модель iPhone *</Label>
                    <Controller
                      name="model"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(v) => field.onChange(v as IphoneModel)}
                        >
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
                      )}
                    />
                    {errors.model && (
                      <p className="text-sm text-red-400">{errors.model.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Память *</Label>
                    <Controller
                      name="memoryGb"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={String(field.value)}
                          onValueChange={(v) => field.onChange(Number(v))}
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
                      )}
                    />
                    {errors.memoryGb && (
                      <p className="text-sm text-red-400">
                        {errors.memoryGb.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Состояние *</Label>
                    <Controller
                      name="condition"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(v) =>
                            field.onChange(v as DeviceCondition)
                          }
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
                      )}
                    />
                    {errors.condition && (
                      <p className="text-sm text-red-400">
                        {errors.condition.message}
                      </p>
                    )}
                  </div>

                  {previewPrice !== null && (
                    <div className="rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm">
                      <span className="text-muted-foreground">Ориентир выкупа: </span>
                      <span className="font-semibold text-accent">
                        {formatPriceRub(previewPrice)}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea
                      id="comment"
                      placeholder="Цвет, комплект, дефекты..."
                      {...register("comment")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photos">
                      Фото устройства{" "}
                      <span className="text-muted-foreground">
                        (до {MAX_PHOTOS}, необязательно)
                      </span>
                    </Label>
                    <label
                      htmlFor="photos"
                      className="glass-input flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-[#2AABEE]/50 hover:text-foreground"
                    >
                      <ImagePlus className="h-6 w-6" />
                      <span>Выбрать одно или несколько фото</span>
                      {photoFiles.length > 0 && (
                        <span className="text-xs text-accent">
                          Выбрано: {photoFiles.length}
                        </span>
                      )}
                    </label>
                    <input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={onPhotosChange}
                    />

                    {photoPreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {photoPreviews.map((src, i) => (
                          <div key={src} className="group relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Фото ${i + 1}`}
                              className="h-20 w-20 rounded-lg object-cover ring-1 ring-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(i)}
                              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md"
                              aria-label="Удалить фото"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={clearPhotos}
                          className="self-center text-xs text-muted-foreground underline hover:text-foreground"
                        >
                          Очистить все
                        </button>
                      </div>
                    )}
                  </div>

                  {serverError && (
                    <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                      {serverError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
