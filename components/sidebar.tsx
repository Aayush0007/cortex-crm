"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart2, Brain, Headphones, Home, Settings, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getUser } from "@/lib/auth"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  label: string
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const user = getUser()

  const links: SidebarLinkProps[] = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/leads",
      icon: Users,
      label: "Leads",
    },
    {
      href: "/tickets",
      icon: Headphones,
      label: "Tickets",
    },
    {
      href: "/ai-assistant",
      icon: Brain,
      label: "AI Assistant",
    },
    {
      href: "/analytics",
      icon: BarChart2,
      label: "Analytics",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-blue-900 rounded-md flex items-center justify-center">
              <span className="text-gold-400 font-bold text-lg">C</span>
            </div>
          </div>
          <span className="text-blue-900 font-bold text-xl">CortexCRM</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
