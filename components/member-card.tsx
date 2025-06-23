import Link from "next/link"
import Image from "next/image"

interface Member {
  id: string
  name: string
  role: string
  image: string
}

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Link href={`/members/${member.id}`} className="flex justify-center">
      <div className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl hover-lift hover-glow p-8 cursor-pointer h-full flex flex-col items-center group">
        <div className="relative w-36 h-36 mb-12">
          <div className="animate-float-slow group-hover:animate-bounce-slow transition-all duration-300">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={144}
              height={144}
              className="rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-xl group-hover:border-blue-300 dark:group-hover:border-blue-400 transition-all duration-300"
            />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-blue-900/50 px-6 py-2 rounded-full text-md group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 group-hover:scale-105 transition-all duration-300 mb-4">
          {member.role}
        </p>
        
        <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center text-blue-500 dark:text-blue-400 text-sm font-medium">
            <span>Ver perfil</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}