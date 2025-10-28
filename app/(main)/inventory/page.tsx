export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your product inventory here
        </p>
      </div>
      
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <p className="text-muted-foreground">
          Your inventory list will appear here. You can add, edit, and manage all your products.
        </p>
      </div>
    </div>
  );
}