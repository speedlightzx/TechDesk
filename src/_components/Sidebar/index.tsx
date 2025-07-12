"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarProvider } from "../ui/sidebar"
import { CircleUserRound, ClipboardList, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Chamados",
    url: "chamados",
    icon: ClipboardList,
  },
  {
    title: "Funcionários",
    url: "#",
    icon: Users,
  },
  {
    title: "Minha conta",
    url: "#",
    icon: CircleUserRound,
  }
] as const

export default function AppSidebar() {

        const paths: any = {
          "home": "Home",
          "chamados": "Chamados"
        } as const

        const url = usePathname().split("/")[1]

        type sidebarItem = 'Home' | 'Chamados' | 'Funcionários' | 'Minha conta'
        const [selectedSidebarItem, setselectedSidebarItem] = useState<sidebarItem>(paths[url] || "Home")

  return (
    <SidebarProvider className="h-screen lg:max-w-[25vh] w-full">
        <Sidebar className="h-screen lg:max-w-[25vh] w-full border-r-2 border-r-indigo-500">
            <SidebarHeader className="bg-gray-900">
                <h1 className="text-center text-white font-bold">Nome da empresa</h1>
            </SidebarHeader>
            <SidebarContent className="bg-gray-900">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white">Empresa</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map((item) => {
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="hover:!bg-indigo-500 font-semibold" asChild>
                                    <Link
                                        prefetch
                                        onClick={() => setselectedSidebarItem(item.title)}
                                        className={`flex items-center gap-x-1 text-white ${selectedSidebarItem == item.title ? 'selectedSidebarItem' : ''}`}
                                        href={item.url}>
                                        {<item.icon />}
                                        {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </SidebarProvider>
  )
}