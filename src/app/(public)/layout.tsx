import { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "Tech Desk",
  description: "TechDesk é um gerenciador de aberturas de chamados de TI para empresas."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-neutral-50">
        {children}
      </body>
    </html>
  );
}