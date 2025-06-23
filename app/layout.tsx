import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

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
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <main className="lg:pl-[280px] min-h-screen bg-gray-50 dark:bg-gray-900 lg:p-8 pb-12 transition-colors duration-300">
            <div className="animate-fade-in-up">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
