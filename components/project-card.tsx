import Image from "next/image"

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
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === "Completado" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{project.category}</span>
          <span className="text-sm text-gray-500">{project.year}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-800 mb-2">Características:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {project.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
