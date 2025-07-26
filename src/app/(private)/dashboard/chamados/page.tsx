"use client"

import CardAbrirChamado from "@/_components/CardAbrirChamado";
import CardChamado from "@/_components/CardChamado";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Chamados() {

    const [cardOpen, setCardOpen] = useState<boolean>(false)

    return (
        <div className="w-full h-screen z-0">
        <div className={`justify-center w-full h-screen items-center flex flex-col ${cardOpen ? "opacity-20" : ""}`}>
            <div className="h-[20%] w-full flex justify-center items-center">
                <button
                disabled={cardOpen ? true : false}
                onClick={() => setCardOpen(true)}
                className="botaoAbrirChamado flex gap-x-1 pl-4"><Plus /> Abrir novo chamado
                </button>
            </div>

            <div className="h-[80%] w-full justify-center flex flex-col items-center gap-y-1">
                <h1 className="text-3xl font-semibold">Seus últimos chamados abertos</h1>

                <section className="w-full flex justify-center gap-5 flex-wrap h-full overflow-y-auto border-t-1 p-2 rounded-md">
                    <CardChamado levelOfSeverity="Alto" title="computador falhando" description="nao liga" author="eu" createdAt={new Date().toLocaleDateString()}/>
                    <CardChamado levelOfSeverity="Baixo" title="computador falhando" description="nao liga" author="eu" createdAt={new Date().toLocaleDateString()}/>
                    <CardChamado levelOfSeverity="Crítico" title="computador falhando" description="nao liga" author="eu" createdAt={new Date().toLocaleDateString()}/>
                    <CardChamado levelOfSeverity="Médio" title="computador falhando" description="nao liga" author="eu" createdAt={new Date().toLocaleDateString()}/>
                </section>
            </div>
        </div>

        {cardOpen && <CardAbrirChamado setCardOpen={setCardOpen}/>}
        </div>
    )
}