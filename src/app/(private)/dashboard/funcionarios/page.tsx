'use client'

import CardRegisterFuncionario from "@/_components/CardRegisterFuncionario";
import FuncionariosList from "@/_components/FuncionariosList";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Funcionarios() {

    const [cardOpen, setCardOpen] = useState<boolean>(false)
    const [render, setRender] = useState<boolean>(false)

    return (
        <div className="w-full h-screen">
        <div className={`w-full h-screen flex flex-col ${cardOpen ? 'opacity-20' : ''}`}>
            <div className='w-full flex justify-center items-center h-[20%] border-b-1'>
                <button
                disabled={cardOpen ? true : false}
                onClick={() => setCardOpen(true)}
                className="botaoRegistrarFuncionario flex gap-x-1 pl-2"><Plus/> Registrar novo funcionário
                </button>
            </div>

            <div className="w-full h-[80%] flex justify-center items-center">
                <FuncionariosList setRender={setRender} render={render}/>
            </div>

        </div>

        {cardOpen && <CardRegisterFuncionario render={render} setRender={setRender} setCardOpen={setCardOpen}/>}
        </div>
    )
}