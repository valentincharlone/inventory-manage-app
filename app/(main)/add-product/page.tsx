export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-muted-foreground">
          Add a new product to your inventory
        </p>
      </div>
      
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p className="text-muted-foreground">
          Here you&apos;ll have a form to add new products with fields like name, SKU, price, quantity, etc.
        </p>
      </div>
    </div>
  );
}