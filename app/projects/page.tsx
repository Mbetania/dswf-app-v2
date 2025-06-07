import { ProjectCard } from "@/components/project-card"
import projectsData from "@/data/projects.json"

export default function ProjectsPage() {
  const categories = [...new Set(projectsData.map((project) => project.category))]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Proyectos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explora nuestra colección de proyectos desarrollados en diferentes tecnologías y categorías, desde
          aplicaciones web hasta sistemas móviles. (JSON local)
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <span key={category} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas de Proyectos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{projectsData.length}</div>
            <div className="text-gray-600">Total Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {projectsData.filter((p) => p.status === "Completado").length}
            </div>
            <div className="text-gray-600">Completados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {projectsData.filter((p) => p.status === "En desarrollo").length}
            </div>
            <div className="text-gray-600">En Desarrollo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-gray-600">Categorías</div>
          </div>
        </div>
      </div>
    </div>
  )
}
