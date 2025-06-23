"use client"

import { use } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { TechIcon } from "@/components/tech-icon"
import { SkillProgress } from "@/components/skill-progress"

const membersData = {
  me: {
    name: "Betania González",
    role: "Backend Developer",
    image: "/avatar.jpg",
    skills: [
      { name: "Node.js", level: 95, color: "bg-green-500" },
      { name: "TypeScript", level: 88, color: "bg-blue-500" },
      { name: "SQL", level: 82, color: "bg-blue-500" },
      { name: "Next.js", level: 78, color: "bg-blue-500" },
      { name: "React", level: 75, color: "bg-blue-500" },
      { name: "MongoDB", level: 70, color: "bg-yellow-500" },
      { name: "Docker", level: 65, color: "bg-yellow-500" },
      { name: "AWS", level: 60, color: "bg-orange-500" },
      { name: "Redis", level: 55, color: "bg-orange-500" },
      { name: "Git", level: 85, color: "bg-green-500" }
    ],
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

export default function MemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const member = membersData[id as keyof typeof membersData]

  if (!member) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={192}
              height={192}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{member.name}</h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">{member.role}</p>

            <div className="mb-6">
              <SkillProgress skills={member.skills} title="Nivel de Habilidades" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Tecnologías</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {member.technologies.map((tech) => (
                  <TechIcon key={tech} technology={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {member.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover-lift transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
