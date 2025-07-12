"use client"

import { CircleUserRound, ClipboardList, Home, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {

    type sidebarItem = 'Home' | 'Chamados' | 'Funcionários' | 'Minha conta'
    const [selectedSidebarItem, setselectedSidebarItem] = useState<sidebarItem>('Home')

    return (
        <aside className="h-screen lg:max-w-[25vh] w-full pt-5 pb-5 border-r-2 border-r-indigo-500 justify-between flex flex-col bg-gray-900">
            
            <div className="h-[5%]">
                <h1 className="text-white text-center font-semibold">Nome da empresa</h1>
            </div>

            <nav className="flex flex-col justify-center gap-y-13 list-none w-full h-[100%]">

                <Link
                prefetch
                href="home"
                onClick={() => setselectedSidebarItem('Home')}
                className={`sidebarItem  ${selectedSidebarItem == 'Home' ? 'selectedSidebarItem' : ''}`}>
                <Home color="white"/>
                Home
                </Link>

                <Link
                prefetch
                href="chamados"
                onClick={() => setselectedSidebarItem('Chamados')}
                className={`sidebarItem  ${selectedSidebarItem == 'Chamados' ? 'selectedSidebarItem' : ''}`}>
                <ClipboardList color="white"/>
                Chamados
                </Link>

                <Link
                prefetch
                href="funcionarios"
                onClick={() => setselectedSidebarItem('Funcionários')}
                className={`sidebarItem  ${selectedSidebarItem == 'Funcionários' ? 'selectedSidebarItem' : ''}`}>
                <Users color="white"/>
                Funcionários
                </Link>

                <Link
                prefetch
                href="minhaconta"
                onClick={() => setselectedSidebarItem('Minha conta')}
                className={`sidebarItem  ${selectedSidebarItem == 'Minha conta' ? 'selectedSidebarItem' : ''}`}>
                <CircleUserRound color="white"/>
                Minha conta
                </Link>

            </nav>

            { /* tentar fazer melhor */ }
            <div className="flex self-center gap-x-2 text-white hover:underline cursor-pointer h-[4%] w-[8.5vh]">
                <LogOut /> <h1 className="font-semibold">Sair</h1>
            </div>
        </aside>
    )
}