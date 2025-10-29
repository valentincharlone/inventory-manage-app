import Link from "next/link";
import {
  Package,
  BarChart3,
  Bell,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
        <div className="container relative mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">
                Now with real-time inventory tracking
              </span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight lg:text-6xl">
              Inventory Management{" "}
              <span className="text-primary">Made Simple</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground lg:text-xl">
              Streamline your inventory tracking with powerful analytics,
              real-time updates, and intelligent stock management. Everything
              you need to run your business efficiently.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/sign-in">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base bg-transparent"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">
              Everything you need to manage inventory
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Powerful features designed to help you track, analyze, and
              optimize your inventory operations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Product Tracking</h3>
              <p className="text-muted-foreground">
                Track all your products in one place with detailed information,
                SKUs, and custom attributes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Real-time Analytics
              </h3>
              <p className="text-muted-foreground">
                Get instant insights into your inventory with beautiful charts
                and comprehensive dashboards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Low Stock Alerts</h3>
              <p className="text-muted-foreground">
                Never run out of stock again with automatic alerts when
                inventory levels are low.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Performance Metrics
              </h3>
              <p className="text-muted-foreground">
                Monitor key metrics like total value, stock efficiency, and
                product trends over time.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and
                automatic backups.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built with modern technology for instant updates and seamless
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Products Tracked</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">
              Ready to optimize your inventory?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Join thousands of businesses that trust our platform to manage
              their inventory efficiently.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/sign-in">Start Managing Inventory</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Inventory Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
