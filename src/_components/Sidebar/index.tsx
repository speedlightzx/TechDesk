"use client"

import { Home } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarProvider } from "../ui/sidebar"
import { CircleUserRound, ClipboardList, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    url: "funcionarios",
    icon: Users,
  },
  {
    title: "Minha conta",
    url: "minhaConta",
    icon: CircleUserRound,
  }
] as const

export default function AppSidebar() {

useEffect(() => {
  console.log('sidebar renderizada')
}, [])

        const paths: any = {
          "home": "Home",
          "chamados": "Chamados",
          "funcionarios": "Funcionários",
          "minhaConta": "Minha conta"
        } as const

        const url = usePathname().split("/")[2]

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