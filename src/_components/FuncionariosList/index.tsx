'use client'
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface listInfo {
    email: string
    cargo: string
}

export default function FuncionariosList({ render }: { render: boolean }) {

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
    if(list.length == 0) setList([{ email: "", cargo: "" }])
        
    console.log(res)

        } catch(err) {
            console.log(err)
            setMessage("Algum erro aconteceu...")
        } finally {
            setLoading(false)
        }

}
getFuncionarios()
}, [render])

    return (
        <div className="w-full h-full overflow-y-auto pl-2 pr-2 pt-2">
            {loading ? 
            <div className="w-full h-full flex justify-center items-center"> <h1 className="text-3xl">{message}</h1> </div>
        :
<Table>
  <TableCaption>Lista de funcionários presentes em sua empresa.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Email</TableHead>
      <TableHead className="font-semibold">Cargo</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     {list.map((item) => (
        <TableRow key={item.email}>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.cargo}</TableCell>
        </TableRow>
     ))}
  </TableBody>
</Table>
        }
        </div>
    )
}