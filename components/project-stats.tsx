import { BarChart3, TrendingUp, Calendar, Tag } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  category: string
  technologies: string[]
  status: string
  year: number
  image: string
  features: string[]
}

interface ProjectStatsProps {
  projects: Project[]
  filteredCount: number
}

export function ProjectStats({ projects, filteredCount }: ProjectStatsProps) {
  const totalProjects = projects.length
  const completedProjects = projects.filter(p => p.status === "Completado").length
  const inProgressProjects = projects.filter(p => p.status === "En desarrollo").length
  const categories = [...new Set(projects.map(p => p.category))]
  const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a)
  
  const techCount = projects.reduce((acc, project) => {
    project.technologies.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
  
  const topTechnologies = Object.entries(techCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  const categoryCount = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-slide-in-bottom">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Estadísticas de Proyectos
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando {filteredCount} de {totalProjects} proyectos
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalProjects}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Total Proyectos</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedProjects}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Completados</div>
        </div>
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{inProgressProjects}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">En Desarrollo</div>
        </div>
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Categorías</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Tecnologías más usadas
          </h3>
          <div className="space-y-3">
            {topTechnologies.map(([tech, count]) => (
              <div key={tech} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{tech}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / totalProjects) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Proyectos por categoría
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryCount)
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(count / totalProjects) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Proyectos por año
        </h3>
        <div className="flex items-end space-x-2 h-32">
          {years.map(year => {
            const yearProjects = projects.filter(p => p.year === year).length
            const height = (yearProjects / Math.max(...years.map(y => projects.filter(p => p.year === y).length))) * 100
            return (
              <div key={year} className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{yearProjects}</div>
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{year}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 