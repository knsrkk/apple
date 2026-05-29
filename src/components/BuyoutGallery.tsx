"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { BUYOUT_GALLERY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDES = [...BUYOUT_GALLERY, ...BUYOUT_GALLERY];
const SCROLL_SPEED = 0.6; // px за кадр (~36 px/сек при 60fps)

function GallerySlide({
  item,
  onOpen,
}: {
  item: (typeof BUYOUT_GALLERY)[number];
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-[260px] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 transition-all hover:ring-accent/50 sm:w-[300px] md:w-[340px]"
      aria-label={`Открыть: ${item.title}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="340px"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <p className="text-sm font-semibold text-foreground sm:text-base">
          {item.title}
        </p>
        {item.price && (
          <p className="mt-0.5 text-xs text-accent sm:text-sm">{item.price}</p>
        )}
      </div>
    </button>
  );
}

export function BuyoutGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  const openFromDuplicate = (slideIndex: number) => {
    setLightbox(slideIndex % BUYOUT_GALLERY.length);
  };

  const active = lightbox !== null ? BUYOUT_GALLERY[lightbox] : null;

  const setPausedState = useCallback((value: boolean) => {
    pausedRef.current = value;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      return;
    }

    let rafId = 0;

    const tick = () => {
      if (!pausedRef.current && track) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current += SCROLL_SPEED;
          if (offsetRef.current >= halfWidth) {
            offsetRef.current = 0;
          }
          track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      const halfWidth = track.scrollWidth / 2;
      if (offsetRef.current >= halfWidth) {
        offsetRef.current = 0;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="gallery" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Наши последние выкупы
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Реальные сделки по Чите — листается автоматически
          </p>
        </FadeIn>
      </div>

      <div className="relative mt-10">
        <div
          className="gallery-marquee-mask relative overflow-hidden"
          aria-label="Галерея выкупов, автопрокрутка"
          onMouseEnter={() => setPausedState(true)}
          onMouseLeave={() => setPausedState(false)}
          onFocus={() => setPausedState(true)}
          onBlur={() => setPausedState(false)}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-4 px-4 will-change-transform sm:gap-5 sm:px-6"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {SLIDES.map((item, i) => (
              <GallerySlide
                key={`${item.id}-${i}`}
                item={item}
                onOpen={() => openFromDuplicate(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {active && lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className={cn("relative max-h-[85vh] w-full max-w-4xl")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-white">{active.title}</p>
              {active.price && (
                <p className="text-accent">{active.price}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
