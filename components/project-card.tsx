import Image from "next/image"
import { Calendar, Tag, CheckCircle, Clock } from "lucide-react"

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

interface ProjectCardProps {
  project: Project
  viewMode?: "grid" | "list"
}

export function ProjectCard({ project, viewMode = "grid" }: ProjectCardProps) {
  const getStatusIcon = (status: string) => {
    return status === "Completado" ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <Clock className="w-4 h-4 text-orange-500" />
    )
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift group">
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            <Image 
              src={project.image || "/placeholder.svg"} 
              alt={project.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  project.status === "Completado" 
                    ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200" 
                    : "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200"
                }`}
              >
                {getStatusIcon(project.status)}
                {project.status}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Tecnologías
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Características principales
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Indicador de hover */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>ID: {project.id}</span>
                <span className="flex items-center gap-1">
                  <span>Ver detalles</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift group">
      <div className="relative h-48">
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
              project.status === "Completado" 
                ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200" 
                : "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200"
            }`}
          >
            {getStatusIcon(project.status)}
            {project.status}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/50 text-white rounded text-xs font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {project.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Tecnologías
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Características principales
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="flex items-center">
                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
                <span className="text-gray-500 dark:text-gray-400">
                  +{project.features.length - 3} más características
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Indicador de hover */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>ID: {project.id}</span>
            <span className="flex items-center gap-1">
              <span>Ver detalles</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
