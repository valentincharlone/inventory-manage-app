"use client";

import { Home, Settings, Package, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@stackframe/stack";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package,
  },
  {
    title: "Add Product",
    url: "/add-product",
    icon: Plus,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-gray-900 text-white border-r-gray-800">
      <SidebarHeader className="bg-gray-900 text-white border-b border-gray-800 py-0">
        <div className="flex items-center gap-2 px-4 h-16 text-white">
          <Package className="h-6 w-6 text-white" />
          <span className="font-semibold text-white">Inventory App</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`text-white transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white active:bg-gray-700 ${
                        isActive
                          ? "bg-gray-700 text-white border-l-4 border-l-blue-500"
                          : "border-l-4 border-l-transparent"
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 px-4 py-2 text-white hover:text-white focus:text-white transition-colors duration-200"
                      >
                        <item.icon
                          className={`h-4 w-4 transition-colors duration-200 ${
                            isActive ? "text-blue-200" : "text-white"
                          }`}
                        />
                        <span className="text-white transition-colors duration-200">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-900 border-t border-gray-800 py-4 pl-4">
          <UserButton showUserInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
