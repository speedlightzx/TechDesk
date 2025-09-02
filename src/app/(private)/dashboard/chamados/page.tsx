"use client"

import CardAbrirChamado, { LevelOfSeverity } from "@/_components/CardAbrirChamado";
import CardChamado from "@/_components/CardChamado";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface chamadoData {
    titulo: string
    descricao: string
    severidade: LevelOfSeverity
    data: string
    status: string
}

export default function Chamados() {

    const [cardOpen, setCardOpen] = useState<boolean>(false)
    const [chamadosList, setChamadosList] = useState<chamadoData[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("Carregando chamados...")

    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {
        const getChamados = async() => {
            try {
                const token = localStorage.getItem("session_token")
                const res = await fetch("https://tech-desk-backend.vercel.app/myChamados", {
                    method: "GET",
                    headers: { "Authorization": `${token}`}
                }).then(res => res.json())

                setChamadosList(res.chamadosList)
                console.log(res.chamadosList)
            } catch(err) {
                setMessage("Algum erro aconteceu...")
            } finally {
                setLoading(false)
            }

        }

        getChamados()
    }, [render])

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
                    
                    {loading && 
                    <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl">{message}</h1> 
                    </div>
                    }

                    {!loading && chamadosList?.length == 0 &&
                    <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-3xl">Nenhum chamado encontrado.</h1>
                    </div>
                    }
                    
                    
                    {!loading && chamadosList && chamadosList?.map((chamado, index) => {
                        return <CardChamado
                        title={chamado.titulo}
                        description={chamado.descricao}
                        levelOfSeverity={chamado.severidade}
                        createdAt={chamado.data}
                        key={index}

                        />
                    })}
                </section>
            </div>
        </div>

        {cardOpen && <CardAbrirChamado renderBool={render} renderState={setRender} setCardOpen={setCardOpen}/>}
        </div>
    )
}