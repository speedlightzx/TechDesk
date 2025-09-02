'use client'

import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Middleware({ children }: { children: ReactNode }) {
    useEffect(() => {
        const token = localStorage.getItem("session_token")
        if(!token) {
            redirect(window.location.origin)
        }
    }, [])

    useEffect(() => {
        const validateToken = async() => {
            const token = localStorage.getItem("session_token")
            const res = await fetch('https://tech-desk-backend.vercel.app/auth', {
                method: 'GET',
                headers: { "Authorization": `${token}` }
            })

            if(res.status == 401) {
                localStorage.removeItem("session_token")
                redirect(window.location.origin)
            }
        }

        validateToken()
    })

    return (
        children
    )
}