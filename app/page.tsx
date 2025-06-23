import { MemberCard } from "@/components/member-card"
import { ProjectCarousel } from "@/components/project-carousel"

const teamMembers = [
  {
    id: "me",
    name: "Betania González",
    role: "Backend Developer",
    image: "/avatar.jpg",
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="lg:text-5xl text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 hover-scale inline-block">Bienvenidos a DevCrafters</h1>
            <p className="lg:text-xl text-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Desarrollador Full Stack apasionado por la creación de APIs.
            </p>
          </div>

          <div className="flex justify-center animate-scale-in stagger-2">
            <div className="grid grid-cols-1 gap-8">
              {teamMembers.map((member, index) => (
                <div key={member.id} className={`animate-fade-in-up stagger-${index + 3}`}>
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel de Proyectos Destacados */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-fade-in-up stagger-4">
            <ProjectCarousel 
              title="Proyectos Completados" 
              maxProjects={6} 
              autoPlay={true} 
              autoPlayInterval={4000} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl p-12 animate-slide-in-bottom stagger-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 hover-scale inline-block">Sobre Nuestro Proyecto</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg animate-fade-in-up stagger-6">
            Esta aplicación web Single Page Application (SPA) ha sido desarrollada como parte del proyecto
            académico, implementando las mejores prácticas de desarrollo con React, React Router, diseño responsivo y
            consumo de APIs externas. El proyecto está desplegado en Vercel y gestionado con GitHub.
          </p>
        </div>
      </div>
    </div>
  )
}