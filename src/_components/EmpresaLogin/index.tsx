'use client'

import { FormEvent, useState } from "react"
import Notification from "../Notification"
import { Check, CircleAlert } from "lucide-react"

interface statusResponse {
    message: string,
    success: boolean,
    NotificationVariant?: "destructive"|"default",
}

export default function EmpresaLogin() {

    const [name, setName] = useState<string>("")
    const [cnpj, setCnpj] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    const [statusResponse, setStatusResponse] = useState<statusResponse>({ 
        message: "",
        NotificationVariant: "destructive",
        success: false
     })

        const validateRegister = async(e: FormEvent) => {
            e.preventDefault()
    
            const dados = {
                email: email,
                senha: senha,
                nome: name,
                cnpj: parseFloat(cnpj)
            }
    
            const res = await fetch('https://tech-desk-backend.vercel.app/createEmpresa', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            

            const resJson = await res.json()
            console.log(resJson)

            const resMessage = resJson.error ? resJson.error : resJson.message
            const resSuccess = res.ok ? true : false

            setStatusResponse({ message: resMessage, success: resSuccess, NotificationVariant: resSuccess ? "default" : "destructive"})
            setTimeout(() => setStatusResponse({ message: "", success: false }), 5000)

            
        }

    return (
    <form method="POST" onSubmit={validateRegister} className="flex flex-col">

        <label>Nome da empresa</label>
        <input type="text" placeholder="Nome da empresa" required className="loginForm" value={name} onChange={(e) => setName(e.target.value)}/>

        <label className="mt-5">CNPJ</label>
        <input type="number" placeholder="CNPJ" required className="loginForm" value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>

        <label className="mt-5">Email do fundador</label>
        <input type="email" placeholder="Email do fundador" required className="loginForm" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label className="mt-5">Senha</label>
        <input type="password" placeholder="Senha" required className="loginForm" value={senha} onChange={(e) => setSenha(e.target.value)}/>

        <button type="submit" className="botaoEntrar">
        Cadastrar empresa
        </button>

        {statusResponse.message.length > 0 && 
        <div className="mt-5">
            <Notification type={statusResponse.NotificationVariant} description={statusResponse.message} icon={statusResponse.success ? <Check /> : <CircleAlert/>} title={statusResponse.success ? "Empresa criada com sucesso." : "Erro ao criar a empresa."}/>
        </div>
        }


    </form>

    )
}