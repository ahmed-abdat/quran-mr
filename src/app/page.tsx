import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,0,0,0.1),transparent)]" />
      </div>

      <div className="container flex min-h-screen flex-col items-center justify-center py-8 text-center">
        {/* Main content card */}
        <Card className="relative w-full max-w-3xl overflow-hidden bg-background/60 p-6 backdrop-blur-sm md:p-8">
          {/* Decorative elements */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

          {/* Logo/Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>

          <h1 className="font-arabic mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            تطبيق القرآن الكريم بخط ورش العثماني
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            تصفح القرآن الكريم بخط ورش العثماني، بسهولة التنقل بين السور والآيات
            مع ميزات البحث المتقدمة.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/quran">
              <Button
                size="lg"
                className="group min-w-[200px] gap-2 text-lg transition-all hover:scale-105"
              >
                <BookOpen className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                تصفح السور
              </Button>
            </Link>

            <Link href="/quran/search">
              <Button
                variant="outline"
                size="lg"
                className="group min-w-[200px] gap-2 text-lg transition-all hover:scale-105"
              >
                <Search className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                البحث في القرآن
              </Button>
            </Link>
          </div>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-sm text-muted-foreground">
          تم تطويره بكل حب لخدمة كتاب الله
        </p>
      </div>
    </main>
  );
}
