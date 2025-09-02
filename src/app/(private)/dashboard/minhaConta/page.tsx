"use client"

import { ConfirmDeleteAccount } from "@/_components/ConfirmDeleteAccount/ConfirmDeleteAccount";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface account {
    email: string
    cargo: string
    nome: string
}

export default function minhaConta() {
    
const [accountInfo, setAccountInfo] = useState<account>()
const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

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
}, [])

const [nome, setNome] = useState<string>(accountInfo?.nome as string)
const [senha, setSenha] = useState<string>("")

const dados = {
    nome,
    ...(senha ? { senha }: {})
}

const updateAccount = async () => {
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

const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
}

const deleteMyAccount = async(): Promise<void> => {
    const token = localStorage.getItem("session_token")
    const res = await fetch('https://tech-desk-backend.vercel.app/myAccount', {
        method: "DELETE",
        headers: { 
            "Authorization": `${token}`,
            "Content-Type": "application/json"
        },
    })

    console.log(res)

    if(res.status == 204) {
        localStorage.removeItem("session_token")
        redirect(window.location.origin)
    }
}

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
        <Card className="max-w-[20rem] w-full">
            <CardHeader>
                <CardTitle>Minha conta</CardTitle>
                <CardDescription>Editar as informações da conta</CardDescription>
            </CardHeader>
            <CardContent>
                    <form method="POST" onSubmit={handleSubmit} className="gap-y-5 flex flex-col">

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

                            <Button type="submit" onClick={() => updateAccount()}>Salvar</Button>
                            <Button type="submit" onClick={() => setOpenDeleteDialog(true)} variant='destructive'>Apagar conta</Button>
                    </form>
            </CardContent>
        </Card>

        <ConfirmDeleteAccount deleteMyAccount={deleteMyAccount} openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog}/>
        </div>
    )
}