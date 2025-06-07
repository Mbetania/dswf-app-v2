import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Una aplicación de dashboard moderna con Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Sidebar />
        <main className="lg:pl-[280px] min-h-screen bg-gray-50 lg:p-8 pb-12">
          {children}
        </main>
      </body>
    </html>
  )
}
