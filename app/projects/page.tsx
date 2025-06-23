"use client"

import { useState, useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectStats } from "@/components/project-stats"
import { Search, Filter, X, Grid, List } from "lucide-react"
import projectsData from "@/data/projects.json"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Obtener datos únicos para filtros
  const categories = [...new Set(projectsData.map((project) => project.category))]
  const statuses = [...new Set(projectsData.map((project) => project.status))]
  const years = [...new Set(projectsData.map((project) => project.year))].sort((a, b) => b - a)

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "" || project.status === selectedStatus
      const matchesYear = selectedYear === "" || project.year.toString() === selectedYear

      return matchesSearch && matchesCategory && matchesStatus && matchesYear
    })
  }, [searchTerm, selectedCategory, selectedStatus, selectedYear])

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedStatus("")
    setSelectedYear("")
  }

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus || selectedYear

  return (
    <div className="max-w-7xl mx-auto pt-10 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nuestros Proyectos</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explora nuestra colección de proyectos desarrollados en diferentes tecnologías y categorías, desde
          aplicaciones web hasta sistemas móviles. (JSON local)
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Buscar proyectos por título, descripción, tecnologías..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </h3>
          <div className="flex items-center gap-4">
            {/* Toggle de vista */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <X className="w-4 h-4 mr-1" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtro por categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los estados</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por año */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los años</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="flex items-end">
            <div className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {filteredProjects.length} de {projectsData.length} proyectos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            No se encontraron proyectos
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
        </div>
      ) : (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredProjects.map((project, index) => (
            <div key={project.id} className={`animate-fade-in-up stagger-${(index % 5) + 1}`}>
              <ProjectCard project={project} viewMode={viewMode} />
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas */}
      <ProjectStats projects={projectsData} filteredCount={filteredProjects.length} />
    </div>
  )
}
