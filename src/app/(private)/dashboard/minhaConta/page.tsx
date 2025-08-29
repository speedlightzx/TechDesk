"use client"

import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { FormEvent, useEffect, useState } from "react";

interface account {
    email: string
    cargo: string
    nome: string
}

export default function minhaConta() {
    
const [accountInfo, setAccountInfo] = useState<account>()
const [updatePage, setUpdatePage] = useState<boolean>(true)

useEffect(() => {
    async function getUserInfo() {
        try {
    const userInfo = await fetch('https://tech-desk-backend.vercel.app/myAccount', {
        method: "GET",
        headers: { "Authorization": `${localStorage.getItem("session_token")}`}
    })

    const info = await userInfo.json()

        setAccountInfo(info.user)
        } catch(err) {
            console.log('erro: ', err)
        }

    }

getUserInfo()
}, [updatePage])

const [nome, setNome] = useState<string>(accountInfo?.nome as string)
const [senha, setSenha] = useState<string>("")

const dados = {
    nome,
    senha
}

const submitAccountInfo = async (e:FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("session_token")
    const res = await fetch('https://tech-desk-backend.vercel.app/myAccount', {
        method: "PUT",
        headers: { 
            "Authorization": `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    console.log(res)
}
    

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
        <Card className="max-w-[20rem] w-full">
            <CardHeader>
                <CardTitle>Minha conta</CardTitle>
                <CardDescription>Editar as informações da conta</CardDescription>
            </CardHeader>
            <CardContent>
                    <form method="POST" onSubmit={submitAccountInfo} className="gap-y-5 flex flex-col">

                            <div className="flex flex-col gap-y-1">
                                <Label>Nome:</Label>
                                <Input value={nome} onChange={(e) => setNome(e.target.value)}/>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <Label>Cargo:</Label>
                                <Select disabled>
                                    <SelectTrigger>
                                        <SelectValue placeholder={accountInfo?.cargo} />
                                    </SelectTrigger>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <Label>Email:</Label>
                                <Input disabled value={accountInfo?.email}/>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <Label>Nova senha:</Label>
                                <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                            </div>

                            <Button type="submit">Salvar</Button>
                            <Button type="submit" variant='destructive'>Apagar conta</Button>
                    </form>
            </CardContent>
        </Card>
        </div>
    )
}