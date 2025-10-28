import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventorySearch } from "@/components/inventory-search";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;
  const params = await searchParams;
  const q = params.q || "";

  const totalProducts = await prisma.product.findMany({
    where: { userId, name: { contains: q, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
  });

  const getStockStatus = (quantity: number, lowStockAt: number) => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= lowStockAt)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const totalValue = totalProducts.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
    0
  );
  const lowStockCount = totalProducts.filter(
    (p) => p.quantity > 0 && p.quantity <= p.lowStockAt
  ).length;
  const outOfStockCount = totalProducts.filter((p) => p.quantity === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your product inventory here
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">{totalProducts.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Inventory Value</CardDescription>
            <CardTitle className="text-3xl">
              {formatPrice(totalValue)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Stock Alerts</CardDescription>
            <CardTitle className="text-3xl">
              {lowStockCount + outOfStockCount}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <InventorySearch />

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            A list of all products in your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalProducts.map((product) => {
                const status = getStockStatus(
                  product.quantity,
                  product.lowStockAt
                );
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.sku || "—"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(Number(product.price))}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          product.quantity === 0
                            ? "text-destructive font-medium"
                            : product.quantity <= product.lowStockAt
                            ? "text-yellow-600 font-medium"
                            : ""
                        }
                      >
                        {product.quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(product.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
