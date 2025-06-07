import Image from "next/image"
import { notFound } from "next/navigation"
import { TechIcon } from "@/components/tech-icon"

const membersData = {
  me: {
    name: "Betania González",
    role: "Backend Developer",
    image: "/avatar.jpg?height=300&width=300",
    skills: ["Node.js", "TypeScript", "SQL", "Next.js", "Redis"],
    technologies: ["Nest", "React", "Docker", "AWS", "Git"],
    projects: [
      {
        name: "Playroom",
        description: "Sala de juego dentro de una aplicacion de VR para sociabilizar y obtener objetos coleccionables",
        tech: "Vue, Node.js, MongoDB",
      },
      {
        name: "Tiny App",
        description: "Aplicación de acompañamiento para personas gestantes",
        tech: "React Native + Expo, TypeScript, MongoDB",
      },
      {
        name: "Weather Dashboard",
        description: "Dashboard del clima con múltiples APIs y visualizaciones",
        tech: "React, Chart.js, OpenWeather API",
      },
    ],
  }
}

export default function MemberPage({ params }: { params: { id: string } }) {
  const member = membersData[params.id as keyof typeof membersData]

  if (!member) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{member.name}</h1>
            <p className="text-xl text-blue-600 font-medium mb-6">{member.role}</p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Habilidades</h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Tecnologías</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {member.technologies.map((tech) => (
                  <TechIcon key={tech} technology={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {member.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <p className="text-sm text-blue-600 font-medium">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
