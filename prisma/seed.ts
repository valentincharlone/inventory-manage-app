import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const demoUserId = "47ee9980-e191-4edf-b2d0-475a42d09d2f";

  await prisma.product.createMany({
    data: Array.from({ length: 20 }).map((_, index) => ({
      userId: demoUserId,
      name: `Product ${index + 1}`,
      description: `Description for Product ${index + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      quantity: Math.floor(Math.random() * 50) + 1,
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index * 5)),
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
