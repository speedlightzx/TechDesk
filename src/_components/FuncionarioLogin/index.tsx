'use client'

import { redirect } from "next/navigation"
import { FormEvent, useState } from "react"
import Notification from "../Notification"
import { Check, CircleAlert } from "lucide-react"

interface statusResponse {
    message: string,
    success?: boolean,
    NotificationVariant?: "destructive"|"default",
}

export default function FuncionarioLogin() {

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    const [statusResponse, setStatusResponse] = useState<statusResponse>({ 
        message: "",
        NotificationVariant: "destructive",
        success: false
     })

    const validateLogin = async(e: FormEvent) => {
        e.preventDefault()

        const res = await fetch('https://tech-desk-backend.vercel.app/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, senha})
        })

        console.log(res)
        const resJson = await res.json()
        console.log(resJson)
        localStorage.setItem("session_token", resJson.token)

        if(res.ok) return redirect('https://techdesk-new.vercel.app/dashboard/home') //https://techdesk-new.vercel.app/dashboard/home
        
        setStatusResponse({ message: resJson.error})
        setTimeout(() => setStatusResponse({ message: "" }), 7000)
    }

    return (
        <form method="POST" onSubmit={validateLogin} className="flex flex-col">

        <label>Email corporativo</label>
        <input type="email" placeholder="Email corporativo" required className="loginForm" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label className="mt-5">Senha</label>
        <input type="password" placeholder="Senha" required className="loginForm" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        
        <button className="botaoEntrar">
        Fazer login como funcionário
        </button>

        {statusResponse.message.length > 0 && 
        <div className="mt-5">
            <Notification type="destructive" description={statusResponse.message} icon={<CircleAlert/>} title={"Erro ao fazer login."}/>
        </div>
        }

        </form>
    )
}