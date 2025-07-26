import { CircleAlert, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ReactNode, useEffect } from "react";

interface Notification {
    type?: "destructive"|"default"
    icon: ReactNode
    title: string
    description: string
}

export default function Notification({ type, icon, title, description }: Notification) {
    return (
        <Alert variant={type}>
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}