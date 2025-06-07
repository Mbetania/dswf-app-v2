import { MemberCard } from "@/components/member-card"

const teamMembers = [
  {
    id: "me",
    name: "Betania González",
    role: "Backend Developer",
    image: "/avatar.jpg?height=200&width=200",
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="lg:text-5xl text-3xl font-bold text-gray-800 mb-4">Bienvenidos a DevCrafters</h1>
            <p className="lg:text-xl text-md text-gray-600 max-w-3xl mx-auto">
              Desarrollador Full Stack apasionado por la creación de APIs.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-8">
              {teamMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-3xl shadow-2xl p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sobre Nuestro Proyecto</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Esta aplicación web Single Page Application (SPA) ha sido desarrollada como parte del proyecto
            académico, implementando las mejores prácticas de desarrollo con React, React Router, diseño responsivo y
            consumo de APIs externas. El proyecto está desplegado en Vercel y gestionado con GitHub.
          </p>
        </div>
      </div>
    </div>
  )
}