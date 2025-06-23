"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, CheckCircle, Clock } from "lucide-react"
import { ProjectCard } from "./project-card"
import projectsData from "@/data/projects.json"

interface ProjectCarouselProps {
  title?: string
  maxProjects?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showStatus?: boolean
}

export function ProjectCarousel({ 
  title = "Proyectos Destacados", 
  maxProjects = 6, 
  autoPlay = true, 
  autoPlayInterval = 5000,
  showStatus = true
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const featuredProjects = projectsData
    .filter(project => project.status === "Completado")
    .slice(0, maxProjects)

  const totalProjects = featuredProjects.length

  const completedCount = featuredProjects.length

  useEffect(() => {
    if (!isPlaying || totalProjects <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, totalProjects, autoPlayInterval])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  if (totalProjects === 0) {
    return null
  }

  const currentProject = featuredProjects[currentIndex]

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          {showStatus && (
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {completedCount} Completados
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoPlay}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <Play className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <button
            onClick={prevSlide}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="w-full flex-shrink-0 px-2">
              <div className="max-w-sm mx-auto">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalProjects > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {featuredProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-green-400 hover:bg-green-500"
              }`}
              title={`${project.title} - Completado`}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Proyecto {currentIndex + 1} de {totalProjects}
          </span>
        </div>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {currentProject?.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {currentProject?.category} • {currentProject?.year}
        </p>
      </div>
    </div>
  )
} 