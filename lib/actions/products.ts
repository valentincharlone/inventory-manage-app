"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

type FormState = {
  success: boolean;
  errors?: {
    name?: string[];
    price?: string[];
    quantity?: string[];
    sku?: string[];
    lowStockAt?: string[];
  };
  message: string;
} | null;

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });
}

export async function createProduct(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
    };
  }

  await prisma.product.create({
    data: { ...parsed.data, userId: user.id },
  });

  redirect("/inventory");
}
