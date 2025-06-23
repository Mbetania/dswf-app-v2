import { useState, useEffect } from "react"

interface Skill {
  name: string
  level: number // 0-100
  color?: string
}

interface SkillProgressProps {
  skills: Skill[]
  title?: string
}

export function SkillProgress({ skills, title = "Habilidades" }: SkillProgressProps) {
  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills)
    }, 300)

    return () => clearTimeout(timer)
  }, [skills])

  const getColorClass = (skill: Skill) => {
    if (skill.color) return skill.color
    
    if (skill.level >= 90) return "bg-green-500"
    if (skill.level >= 75) return "bg-blue-500"
    if (skill.level >= 60) return "bg-yellow-500"
    if (skill.level >= 45) return "bg-orange-500"
    return "bg-red-500"
  }

  const getLevelText = (level: number) => {
    if (level >= 90) return "Experto"
    if (level >= 75) return "Avanzado"
    if (level >= 60) return "Intermedio"
    if (level >= 45) return "Básico"
    return "Principiante"
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getLevelText(skill.level)}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {skill.level}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getColorClass(skill)}`}
                style={{
                  width: animatedSkills[index] ? `${skill.level}%` : '0%',
                  transitionDelay: `${index * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 