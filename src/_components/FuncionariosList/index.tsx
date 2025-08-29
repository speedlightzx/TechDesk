'use client'

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import FuncionarioDropdownMenu from "../FuncionarioDropdownMenu/FuncionarioDropdownMenu";
import { Cargo } from "@/types/cargoEnum";

interface listInfo {
    email: string
    nome: string
    cargo: Cargo
}

export default function FuncionariosList({ render, setRender }: { render: boolean, setRender: any }) {

const [list, setList] = useState<listInfo[]>([])
const [loading, setLoading] = useState<boolean>(true)
const [message, setMessage] = useState<string>("Carregando funcionários...")

useEffect(() => {
    async function getFuncionarios() {
        try {
    const token = localStorage.getItem("session_token")
    const res = await fetch("https://tech-desk-backend.vercel.app/getFuncionarios", {
        method: "GET",
        headers: {
            "Authorization": `${token}`
        }

    }).then(res => res.json())
    setList(res.funcionarios)
        
    console.log(res)

        } catch(err) {
            setMessage("Algum erro aconteceu...")
        } finally {
            setLoading(false)
        }

}
getFuncionarios()
}, [render])

    return (
        <div className="w-full h-full overflow-y-auto pl-2 pr-2 pt-2">
            
        { /* se estiver carregando mostra uma mensagem de carregando */}
        {loading && 
        <div className="w-full h-full flex justify-center items-center"> <h1 className="text-3xl">{message}</h1> </div>}
        
{ /* se ja estiver carregado e tiver a lista, a lista sera renderizada */}
        {!loading &&
<Table>
  <TableCaption>Lista de funcionários presentes em sua empresa.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Email</TableHead>
      <TableHead className="font-semibold">Nome</TableHead>
      <TableHead className="font-semibold">Cargo</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     {list.map((item) => (
        <TableRow key={item.email}>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.cargo}</TableCell>
            {item.cargo !== "CEO" && 
            <TableCell>
                <FuncionarioDropdownMenu render={render} setRender={setRender} info={item}/>
            </TableCell>
            }
        </TableRow>
     ))}
  </TableBody>
</Table>
        }
        </div>
    )
}