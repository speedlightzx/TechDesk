import { ReactNode } from "react"

interface statusComponent{
    emoji: ReactNode,
    statusTitle: string,
    statusInformation: string
}

export default function Status( {statusTitle, statusInformation, emoji} : statusComponent) {
    return (
        <section className="w-[35vh] flex flex-col h-[29vh] p-3 shadow-md rounded-lg bg-white">
            <div className="flex gap-x-3 h-[30%] items-center">
                {emoji}
                <p className="font-bold">{statusTitle}</p>
            </div>

            <div className="flex items-center justify-center h-[70%]">
                <h1 className="text-6xl">{statusInformation}</h1>
            </div>
        </section>
    )
}