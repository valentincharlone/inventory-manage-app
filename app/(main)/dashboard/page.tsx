import ProductsChart from "@/components/products-chart";
import ProductsPieChart from "@/components/products-pie-chart";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp,
  Package,
  DollarSign,
  AlertTriangle,
  Activity,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user?.id;

  const [totalProducts, lowStockProducts, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: { userId, quantity: { lte: 5 } },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  const inStock = allProducts.filter(
    (product) => Number(product.quantity) > 5
  ).length;
  const lowStock = allProducts.filter(
    (product) => Number(product.quantity) <= 5 && Number(product.quantity) > 0
  ).length;
  const outOfStock = allProducts.filter(
    (product) => Number(product.quantity) === 0
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStock / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStock / totalProducts) * 100) : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? Math.round((outOfStock / totalProducts) * 100) : 0;

  const efficiencyData = [
    {
      name: "In Stock",
      value: inStock,
      percentage: inStockPercentage,
      color: "hsl(var(--primary))",
    },
    {
      name: "Low Stock",
      value: lowStock,
      percentage: lowStockPercentage,
      color: "hsl(var(--warning))",
    },
    {
      name: "Out of Stock",
      value: outOfStock,
      percentage: outOfStockPercentage,
      color: "hsl(var(--destructive))",
    },
  ];

  const now = new Date();
  const weeklyProductsData = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(weekStart.getDate()).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product) => {
      return product.createdAt >= weekStart && product.createdAt <= weekEnd;
    });
    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-background ">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
          Dashboard
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Welcome back! Here&apos;s an overview of your inventory performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+{totalProducts}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Products
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight">
              {totalProducts}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+${Number(totalValue).toFixed(0)}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Value
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight">
              ${Number(totalValue).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-warning/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div className="flex items-center gap-1 text-warning text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+{lowStockProducts}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Low Stock Items
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight">
              {lowStockProducts}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Product Growth
              </h2>
              <p className="text-sm text-muted-foreground">
                New products added per week
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="h-64">
            <ProductsChart data={weeklyProductsData} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Stock Efficiency
            </h2>
            <p className="text-sm text-muted-foreground">
              Current inventory status
            </p>
          </div>
          <ProductsPieChart
            efficiencyData={efficiencyData}
            inStockPercentage={inStockPercentage}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">
                  In Stock
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {inStockPercentage}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm font-medium text-foreground">
                  Low Stock
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {lowStockPercentage}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm font-medium text-foreground">
                  Out of Stock
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {outOfStockPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Recent Products
          </h2>
          <p className="text-sm text-muted-foreground">
            Latest additions to your inventory
          </p>
        </div>
        <div className="space-y-3">
          {recent.map((product, key) => {
            const stockLevel =
              product.quantity === 0
                ? 0
                : product.quantity <= (product.lowStockAt || 5)
                ? 1
                : 2;

            const statusConfig = [
              {
                bg: "bg-destructive/10",
                text: "text-destructive",
                dot: "bg-destructive",
                label: "Out of Stock",
              },
              {
                bg: "bg-warning/10",
                text: "text-warning",
                dot: "bg-warning",
                label: "Low Stock",
              },
              {
                bg: "bg-success/10",
                text: "text-success",
                dot: "bg-success",
                label: "In Stock",
              },
            ];

            const config = statusConfig[stockLevel];

            return (
              <div
                key={key}
                className={`flex items-center justify-between p-4 rounded-lg ${config.bg} border border-border/50 hover:border-border transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${config.dot} animate-pulse`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {config.label}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm font-bold ${config.text} px-3 py-1 rounded-md bg-background/50`}
                >
                  {product.quantity} units
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
