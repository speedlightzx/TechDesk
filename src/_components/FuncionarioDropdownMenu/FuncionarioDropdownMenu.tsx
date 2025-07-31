'use client'

import { EllipsisVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { Cargo } from "@/types/cargoEnum"
import UpdateFuncionarioSheet from "../UpdateFuncionarioSheet/UpdateFuncionarioSheet"

interface FuncionarioInfo {
    email: string
    cargo: Cargo
}

interface Funcionario {
    info: FuncionarioInfo
    setRender: any
    render: boolean
}

export default function FuncionarioDropdownMenu({ info, setRender, render }: Funcionario) {

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [openSheet, setOpenSheet] = useState<boolean>(false)

    const deleteFuncionario = async(email:string) => {

        const token = localStorage.getItem("session_token")

        const res = await fetch("https://tech-desk-backend.vercel.app/deleteFuncionario", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify({ email })
        })

        setOpenDialog(!openDialog)
        if(res.ok) setRender(!render)
    }

    return (
        <div>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <EllipsisVertical size={20}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel className="bg-gray-900 text-center text-white rounded-lg font-semibold">Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenSheet(!openSheet)} className="bg-white text-black rounded-lg font-semibold">
                Editar Funcionário
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDialog(!openDialog)} className="bg-white text-black rounded-lg font-semibold">
                Deletar Funcionário
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    <UpdateFuncionarioSheet render={render} setRender={setRender} info={info} setOpenSheet={setOpenSheet} openSheet={openSheet}/>

    <AlertDialog open={openDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você tem certeza que quer remover o funcionário com o email <strong>{info.email}</strong>?
                    </AlertDialogDescription>
            </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenDialog(!openDialog)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-800 hover:text-white" asChild onClick={() => deleteFuncionario(info.email)}>
                        <Button variant="ghost">Remover</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
    )
}