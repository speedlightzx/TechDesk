"use client"

import { X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface card {
    setCardOpen: (cardOpen: boolean) => void
    renderState: Dispatch<SetStateAction<boolean>>
    renderBool: boolean
}

export type LevelOfSeverity = "Baixo"|"Médio"|"Alto"|"Crítico"|""

export default function CardAbrirChamado({ setCardOpen, renderState, renderBool }: card) {

    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [severity, setSeverity] = useState<LevelOfSeverity>("Baixo")

    const dados = {
        titulo: title,
        descricao: desc,
        severidade: severity
    }

    const submitForm = async(e: FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem("session_token")
        const res = await fetch("https://tech-desk-backend.vercel.app/createChamado", {
            method: "POST",
            headers: { "Authorization": `${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })

        console.log(await res.json())
        renderState(!renderBool)
        setCardOpen(false)
    }

    return (
        <Card className="z-10 absolute index-0 top-[22%] w-full lg:max-w-[50vh] right-[31%]">
        <CardHeader>
            <CardTitle className="text-center">Abrir novo chamado</CardTitle>

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
                <Label>Resumo do problema</Label>
                <Input required onChange={(e) => setTitle(e.target.value)} type="text" />
                </div>

                <div className="cardDiv">
                <Label>Detalhe mais sobre o problema</Label>
                <Textarea required onChange={(e) => setDesc(e.target.value)} style={{ maxHeight: 150, height: 40}}/>
                </div>

                <div className="cardDiv">
                <Label>Nível de Severidade</Label>
                <Select required value={severity} onValueChange={(v:LevelOfSeverity) => setSeverity(v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Severidade"/>
                    </SelectTrigger>

                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Níveis</SelectLabel>
                            <SelectItem value="Baixo">Baixo</SelectItem>
                            <SelectItem value="Médio">Médio</SelectItem>
                            <SelectItem value="Alto">Alto</SelectItem>
                            <SelectItem value="Crítico">Crítico</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>

                <Button className="bg-green-600 hover:bg-green-800">Enviar</Button>
            </form> 
        </CardContent>
    </Card>
    )
}