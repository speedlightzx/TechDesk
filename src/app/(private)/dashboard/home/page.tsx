"use client"

import Status from "@/_components/Status";
import { CircleAlert, Clock, PhoneCall, Users } from "lucide-react";
import { useEffect, useState } from "react";

export interface status {
    pendantsChamados: number
    latestsChamados: number
    tecnicos: number
    criticsChamados: number
}

export default function Home() {

const [status, setStatus] = useState<status>()

useEffect(() => {
    async function getStatus() {
        try {
            const token = localStorage.getItem("session_token")
            const res = await fetch("https://tech-desk-backend.vercel.app/empresaStatus", {
                method: "GET",
                headers: {
                    "Authorization": `${token}`
             }}).then(res => res.json())
             setStatus(res.status)
             console.log(res)

        } catch(err) {
            console.log(err)
        } 

}
getStatus()
}, [])

    return (
        <div className="bg-neutral-100 w-full h-screen flex flex-col items-center pt-10">
            <section className="w-[95%] h-[30%] flex justify-between">
                <Status statusTitle="Chamados pendentes" statusInformation={status?.pendantsChamados as number || 0} emoji={<Clock size={35} color="orange"/>}/>
                <Status statusTitle="Chamados abertos nas últimas 24h" statusInformation={status?.latestsChamados as number || 0} emoji={<PhoneCall size={35} color="green"/>}/>
                <Status statusTitle="Técnicos disponíveis" statusInformation={status?.tecnicos as number || 0} emoji={<Users size={35} color="blue"/>}/>
                <Status statusTitle="Chamados críticos" statusInformation={status?.criticsChamados as number || 0} emoji={<CircleAlert size={35} color="red"/>}/>
            </section>
        </div>
    )
}