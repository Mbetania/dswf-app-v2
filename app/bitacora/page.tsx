import { Metadata } from "next"
import bitacoraData from "@/data/bitacora.json"
import { CalendarDays, Clock, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Bitácora | Dashboard",
  description: "Registro de actividades y eventos",
}

export default function BitacoraPage() {
  const categories = [...new Set(bitacoraData.logs.map((log) => log.category))]
  const statuses = [...new Set(bitacoraData.logs.map((log) => log.status))]

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Bitácora</h1>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {categories.map((category) => (
            <span key={category} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium hover-scale transition-all duration-300 cursor-pointer">
              {category}
            </span>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar entradas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {bitacoraData.logs.map((log) => (
          <div
            key={log.id}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{log.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                log.status === "completed" ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200" :
                log.status === "in-progress" ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200" :
                "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}>
                {log.status === "completed" ? "Completado" :
                 log.status === "in-progress" ? "En Progreso" :
                 "Pendiente"}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-3">{log.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {log.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {log.time} ({log.hours} horas)
              </div>
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300">
                {log.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-slide-in-bottom">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Resumen de Bitácora</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bitacoraData.logs.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Total Entradas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {bitacoraData.logs.filter((log) => log.status === "completed").length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Completadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {bitacoraData.logs.filter((log) => log.status === "in-progress").length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">En Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Categorías</div>
          </div>
        </div>
      </div>
    </div>
  )
}