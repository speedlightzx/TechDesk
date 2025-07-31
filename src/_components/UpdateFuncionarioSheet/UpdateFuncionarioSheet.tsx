'use client'

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { Cargo } from "@/types/cargoEnum";

interface info {
    email: string
    cargo: Cargo
}

interface UpdateFuncionarioSheet {
    openSheet: boolean
    setOpenSheet: Dispatch<SetStateAction<boolean>>
    info: info
    setRender: Dispatch<SetStateAction<boolean>>
    render: boolean
}

export default function UpdateFuncionarioSheet({ render, setRender, setOpenSheet, openSheet, info }: UpdateFuncionarioSheet) {

    const [senha, setSenha] = useState<string>("")
    const [cargo, setCargo] = useState<Cargo>(info.cargo)

    const updateFuncionario = async(e:FormEvent) => {
        e.preventDefault()

    let editFuncionario = {
        email: info.email,
        cargo,
        ...(senha.length > 0 && { senha })
    }

    const token = localStorage.getItem("session_token")

    const res = await fetch('https://tech-desk-backend.vercel.app/updateFuncionario', {
        method: 'PUT',
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editFuncionario)
    })

    if(!res.ok) console.log(await res.json())

    if(res.ok) {
        setRender(!render)
        setOpenSheet(!openSheet)
    }
    }

    

    return (
        <Sheet open={openSheet}>
        <SheetContent>
            <form onSubmit={updateFuncionario}>
            <SheetHeader>
                <SheetTitle>Editar funcionário</SheetTitle>
                <SheetDescription>Você está vendo as informações do funcionário com o email: <strong>{info.email}</strong></SheetDescription>
            </SheetHeader>

            <div className="flex flex-col px-5 gap-y-5">
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input type="email" disabled value={info.email} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Senha</Label>
                    <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Cargo</Label>
                    <Select required defaultValue={cargo} onValueChange={(c:Cargo) => setCargo(c)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Cargo"/>
                    </SelectTrigger>

                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Cargo</SelectLabel>
                            <SelectItem value="Colaborador">Colaborador</SelectItem>
                            <SelectItem value="Técnico">Técnico</SelectItem>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
            </div>

            <SheetFooter>
                <Button className="bg-green-600 hover:bg-green-800" type="submit">Salvar alterações</Button>
                <SheetClose asChild>
                    <Button onClick={() => setOpenSheet(false)} variant="outline">Cancelar</Button>
                </SheetClose>
            </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
    )
}