import Middleware from "@/_components/Middleware";
import Status from "@/_components/Status";
import { CircleAlert, Clock, PhoneCall, Users } from "lucide-react";

export default function Home() {
    return (
        <div className="bg-neutral-100 w-full h-screen flex flex-col items-center pt-10">
            <section className="w-[95%] h-[30%] flex justify-between">
                <Status statusTitle="Chamados pendentes" statusInformation="0" emoji={<Clock size={35} color="orange"/>}/>
                <Status statusTitle="Chamados abertos nas últimas 24h" statusInformation="0" emoji={<PhoneCall size={35} color="green"/>}/>
                <Status statusTitle="Técnicos disponíveis" statusInformation="0" emoji={<Users size={35} color="blue"/>}/>
                <Status statusTitle="Chamados críticos" statusInformation="0" emoji={<CircleAlert size={35} color="red"/>}/>
            </section>
        </div>
    )
}