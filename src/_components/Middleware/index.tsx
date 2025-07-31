'use client'

import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Middleware({ children }: { children: ReactNode }) {
    useEffect(() => {
        const token = localStorage.getItem("session_token")
        if(!token) {
            redirect(window.location.origin)
        }
    }, [])

    return (
        children
    )
}