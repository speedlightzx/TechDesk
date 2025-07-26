"use client"

import { X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import React, { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface card {
    setCardOpen: (cardOpen: boolean) => void
    setRender: any
    render: boolean
}

type cargo = "Administrador"|"Técnico"|"Colaborador"

export default function CardRegisterFuncionario({ setCardOpen, setRender, render }: card) {

    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [cargo, setCargo] = useState<cargo>("Colaborador")

    const dados = {
        email: email,
        senha: senha,
        cargo: cargo
    }

    const submitForm = async(e: FormEvent) => {
        e.preventDefault()

        const res = await fetch('https://tech-desk-backend.vercel.app/createFuncionario', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(dados)
        })

        console.log(await res.json())
        setRender(!render)
        setCardOpen(false)
    }

    return (
        <Card className="z-10 absolute index-0 top-[22%] w-full lg:max-w-[50vh] right-[31%]">
        <CardHeader>
            <CardTitle className="text-center">Registrar novo funcionário</CardTitle>

            <CardAction>
                <Button variant="ghost" size="icon"
                onClick={() => setCardOpen(false)}>
                    <X />
                </Button>
            </CardAction>
        </CardHeader>

        <CardContent>
            <form onSubmit={submitForm} method="POST" className="gap-y-5 flex flex-col">
                <div className="cardDiv">
                <Label>Email:</Label>
                <Input required onChange={(e) => setEmail(e.target.value)} type="text" />
                </div>

                <div className="cardDiv">
                <Label>Senha:</Label>
                <Input required type="password" onChange={(e) => setSenha(e.target.value)} style={{ maxHeight: 150, height: 40}}/>
                </div>

                <div className="cardDiv">
                <Label>Cargo</Label>
                <Select required defaultValue="Colaborador" onValueChange={(v:cargo) => setCargo(v)}>
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

                <Button className="bg-green-600 hover:bg-green-800">Registrar</Button>
            </form> 
        </CardContent>
    </Card>
    )
}