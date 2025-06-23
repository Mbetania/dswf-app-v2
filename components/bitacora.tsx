"use client"

import { useState, useEffect } from 'react'
import { CalendarDays, Clock, Search, Loader2 } from 'lucide-react'

interface LogEntry {
  id: string
  date: string
  time: string
  title: string
  description: string
  category: string
  status: "pending" | "completed" | "in-progress"
  hours: number
}

export function Bitacora({ initialData = [] }: { initialData?: LogEntry[] }) {
  const [logs, setLogs] = useState<LogEntry[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const response = await fetch('/data/bitacora.json');
        console.log(response)
        const data = await response.json()
        setLogs(data.logs || data)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const filteredLogs = logs.filter(log =>
    log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando bitácora...</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar entradas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {filteredLogs.map((log) => (
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
                {log.time} {log.hours && `(${log.hours} horas)`}
              </div>
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300">
                {log.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}