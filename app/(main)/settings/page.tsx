export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application settings
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and profile information.
          </p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Settings</h2>
          <p className="text-muted-foreground">
            Configure low stock alerts, categories, and inventory rules.
          </p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p className="text-muted-foreground">
            Set up email and system notifications for your inventory.
          </p>
        </div>
        
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Data & Privacy</h2>
          <p className="text-muted-foreground">
            Export your data and manage privacy settings.
          </p>
        </div>
      </div>
    </div>
  );
}