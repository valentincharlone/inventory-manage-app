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
import { formatDate, formatPrice } from "@/lib/formatters";
import { InventoryPagination } from "@/components/pagination";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | undefined; page?: string | undefined }>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;
  const params = await searchParams;
  const q = params.q || "";
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  const where = {
    userId,
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [totalCount, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const getStockStatus = (quantity: number, lowStockAt: number) => {
    if (quantity === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= lowStockAt)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  const totalValue = items.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
    0
  );
  const lowStockCount = items.filter(
    (p) => p.quantity > 0 && p.quantity <= p.lowStockAt
  ).length;
  const outOfStockCount = items.filter((p) => p.quantity === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your product inventory here
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-3xl">{items.length}</CardTitle>
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
              {items.map((product) => {
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

      {totalPages > 1 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <InventoryPagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/inventory"
            searchParams={{
              q,
            }}
          />
        </div>
      )}
    </div>
  );
}
