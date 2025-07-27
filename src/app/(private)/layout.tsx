import '../../app/globals.css'
import { Metadata } from "next"
import AppSidebar from '@/_components/Sidebar'
import Middleware from '@/_components/Middleware'

export const metadata: Metadata = {
  title: "Tech Desk",
  description: "TechDesk é um gerenciador de aberturas de chamados de TI para empresas."
}

export default function RootLayout({ children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Middleware>
        <AppSidebar />
        {children}
        </Middleware>
      </body>
    </html>
  )
}