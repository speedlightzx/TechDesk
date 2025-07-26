import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LevelOfSeverity } from "../CardAbrirChamado";
import { CalendarDays, CircleAlert, User } from "lucide-react";

interface CardInformation {
    title: string,
    description: string,
    levelOfSeverity: LevelOfSeverity,
    author: string,
    createdAt: string
}

export default function CardChamado({ title, description, levelOfSeverity, author, createdAt }: CardInformation) {
    
    const alertColor = (levelOfSeverity:LevelOfSeverity) => {
        if(levelOfSeverity == "Baixo") return "blue"
        if(levelOfSeverity == "Médio") return "#FFA500" //orange
        if(levelOfSeverity == "Alto") return "#FFEA00" //yellow
        if(levelOfSeverity == "Crítico") return "red"
    }
    
    return (
        <Card className="w-full lg:max-w-[40vh] max-h-[40vh]">
        <CardHeader>
            <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>

        <CardContent>
            <div className="gap-y-3 flex flex-col">
                
                <div className="break-words h-[15vh] overflow-y-auto border-1 rounded-md p-1">
                <Label className="text-sm">{description}</Label>
                </div>
                
                <div className="flex flex-col gap-y-2">
                <Label className="flex gap-x-1 items-center"><CircleAlert color={alertColor(levelOfSeverity)} size={20}/> Severidade: {levelOfSeverity}</Label>
                <Label className="flex gap-x-1 items-center"><User color="blue" size={20}/>Usuário: {author}</Label>
                <Label className="flex gap-x-1 items-center"><CalendarDays color="green" size={20}/>Aberto em: {createdAt}</Label>
                </div>

            </div> 
        </CardContent>
    </Card>
    )
}