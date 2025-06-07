"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Database, Cloud, FileText } from "lucide-react"

const menuItems = [
  { href: "/", label: "Presentación", icon: Home },
  { href: "/members/me", label: "Perfil", icon: User },
  { href: "/projects", label: "Proyectos", icon: Database },
  { href: "/weather", label: "Clima", icon: Cloud },
  { href: "/bitacora", label: "Bitácora", icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed z-50 bottom-0 left-0 w-full h-16 bg-gradient-to-r from-[#2c3e50] to-[#34495e] md:bottom-auto md:top-0 md:h-screen md:w-64 md:bg-gradient-to-b md:from-[#2c3e50] md:to-[#34495e] md:py-6 md:shadow-lg">
      <div className="h-full flex flex-col justify-center md:justify-start">
        {/* Logo - solo en desktop */}
        <div className="hidden md:flex flex-col items-center px-6 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-3">
            <span className="text-white font-bold text-lg">DC</span>
          </div>
          <h1 className="text-xl font-bold text-white text-center">DevCrafters</h1>
          <p className="text-xs text-gray-300 text-center">Equipo de Desarrollo</p>
        </div>

        {/* Navegación */}
        <nav className="h-full md:h-auto">
          <ul className="h-full flex items-stretch md:block md:space-y-1 md:p-0 md:m-0 md:mt-2 md:px-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <li key={item.href} className="flex-1 flex items-stretch md:mb-1">
                  <Link
                    href={item.href}
                    className={`
                      flex-1 flex items-center justify-center md:justify-start 
                      transition-all duration-200 ease-in-out 
                      ${isActive 
                        ? 'bg-blue-800/30 text-white md:border-l-4 border-blue-500' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }
                      p-2 md:px-4 md:py-3 md:mx-2 md:rounded-lg
                    `}
                  >
                    <div className="flex flex-col items-center md:flex-row md:gap-3">
                      <Icon className="w-5 h-5 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm mt-1 md:mt-0">{item.label}</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}