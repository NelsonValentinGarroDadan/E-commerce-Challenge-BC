"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function SwitchTheme() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Evita flash hasta que se hidrata

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button onClick={toggleTheme}>
      <div className="relative flex items-center w-10 h-4 rounded-lg bg-primary cursor-pointer">
        <span
          className={`
            absolute top-0 left-0 h-4 w-4 rounded-full bg-white shadow-md 
            transition-transform duration-300 ease-in-out
            ${isDark ? "translate-x-6" : "translate-x-0"}
          `}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Sun
              className={`w-4 h-4 text-yellow-500 absolute transition-opacity duration-300 ${
                isDark ? "opacity-0" : "opacity-100"
              }`}
            />
            <Moon
              className={`w-4 h-4 text-indigo-600 absolute transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </span>
      </div>
    </button>
  )
}