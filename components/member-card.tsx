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
      <div className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer h-full flex flex-col items-center">
        <div className="relative w-40 h-40 mb-8">
          <div className="animate-float-slow">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{member.name}</h3>
        <p className="text-blue-600 font-semibold bg-blue-100 px-6 py-2 rounded-full text-md">
          {member.role}
        </p>
      </div>
    </Link>
  )
}