import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { REVIEWS } from "@/lib/constants";

export function Reviews() {
  return (
    <section id="reviews" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            Отзывы клиентов из Читы
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 80}>
              <Card className="h-full border-border/80 bg-card">
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                  <p className="mt-4 font-medium text-foreground">{review.name}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
