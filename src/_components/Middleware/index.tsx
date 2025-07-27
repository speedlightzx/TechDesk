'use client'

import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Middleware({ children }: { children: ReactNode }) {
    
    useEffect(() => {
        const token = localStorage.getItem("session_token")
        if(!token) {
            redirect('https://techdesk-new.vercel.app')
        }
    }, [])

    return (
        children
    )
}