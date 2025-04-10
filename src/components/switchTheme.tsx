"use client"
import { useEffect, useState } from "react"

export default function SwichTheme(){
    const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement

    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <button onClick={toggleTheme}>
      <div className="relative flex items-center w-10 h-4 rounded-lg bg-primary cursor-pointer">
        {/* Icono sol */}
        {/* <Sun className="w-4 h-4 text-white" /> */}
        {/* Toggle ball */}
        <span
          className={`
            absolute left-0 h-4 w-4 rounded-full bg-white shadow-md
            transition-transform duration-300 ease-in-out
            ${isDark ? "translate-x-6" : "translate-x-0"}
          `}
        />
        {/* Icono luna */}
        {/* <Moon className="w-4 h-4 text-white ml-auto" /> */}
      </div>
    </button>
  )
}