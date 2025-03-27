import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_30%,rgba(0,0,0,0.15),transparent)]" />
      </div>

      <div className="container flex min-h-screen flex-col items-center justify-center py-8 text-center">
        {/* Main content card with enhanced styling */}
        <Card className="relative w-full max-w-3xl overflow-hidden bg-background/60 p-6 backdrop-blur-sm md:p-8 shadow-lg border-t-0">
          {/* Decorative top border with animation */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

          {/* Side decorative elements */}
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

          {/* Enhanced logo/icon with subtle animation */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <BookOpen className="h-10 w-10 text-primary" />
          </div>

          <h1 className=" mb-4 text-2xl font-bold tracking-tight md:text-4xl bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent">
            تطبيق القرآن الكريم بخط ورش العثماني
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            تصفح القرآن الكريم بخط ورش العثماني، بسهولة التنقل بين السور والآيات
            مع ميزات البحث المتقدمة.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-2">
            <Link href="/quran" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group w-full sm:min-w-[200px] gap-2 text-lg transition-all hover:scale-105 shadow-md hover:shadow-lg"
              >
                <BookOpen className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                تصفح السور
              </Button>
            </Link>

            <Link href="/quran/search" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:min-w-[200px] gap-2 text-lg transition-all hover:scale-105 hover:bg-primary/5 shadow-sm hover:shadow-md"
              >
                <Search className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                البحث في القرآن
              </Button>
            </Link>
          </div>

          {/* Features section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background/50 p-3 rounded-md shadow-sm">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary">1</span>
              </div>
              <p>قراءة سهلة وواضحة بخط ورش العثماني</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md shadow-sm">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary">2</span>
              </div>
              <p>تنقل سريع بين السور والآيات</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md shadow-sm">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary">3</span>
              </div>
              <p>بحث متقدم في نص القرآن الكريم</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
