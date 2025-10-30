"use client";

import React from "react";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary/90"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Product...
        </>
      ) : (
        <>
          <Package className="mr-2 h-4 w-4" />
          Add Product
        </>
      )}
    </Button>
  );
}

export default function AddProductPage() {
  const [state, formAction] = useActionState(createProduct, null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/inventory"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inventory
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-muted-foreground mt-2">
          Add a new product to your inventory
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          {state?.message && !state?.success && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                {state.message}
              </p>
            </div>
          )}

          <form className="space-y-6" action={formAction}>
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter product name"
                className={state?.errors?.name ? "border-destructive" : ""}
              />
              {state?.errors?.name && (
                <p className="text-sm text-destructive">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  required
                  placeholder="0"
                  className={
                    state?.errors?.quantity ? "border-destructive" : ""
                  }
                />
                {state?.errors?.quantity && (
                  <p className="text-sm text-destructive">
                    {state.errors.quantity[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  className={state?.errors?.price ? "border-destructive" : ""}
                />
                {state?.errors?.price && (
                  <p className="text-sm text-destructive">
                    {state.errors.price[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU (optional)</Label>
              <Input type="text" id="sku" name="sku" placeholder="Enter SKU" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lowStockAt">Low Stock Threshold (optional)</Label>
              <Input
                type="number"
                id="lowStockAt"
                name="lowStockAt"
                min="0"
                placeholder="Enter low stock threshold"
                className={
                  state?.errors?.lowStockAt ? "border-destructive" : ""
                }
              />
              {state?.errors?.lowStockAt && (
                <p className="text-sm text-destructive">
                  {state.errors.lowStockAt[0]}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                You&apos;ll be notified when stock falls below this level
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <SubmitButton />
              <Button type="button" variant="outline" asChild>
                <Link href="/inventory">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
