"use client";

import { useEffect, useState } from "react"
import NavBar from "./components/navbar"
import HeaderActions from "./components/headerActions";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false); 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const handleLinkClick = () => {
    setMenuOpen(!menuOpen); // Cierra el menú
  };
  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${scrolled ? "bg-text/60 backdrop-blur-md hover:bg-text" : "bg-text"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-background font-bold text-lg font-lora">TechStore</span>
        <button
          className="md:hidden text-background z-50"
          onClick={handleLinkClick}
        >
          {
            !menuOpen ? (
              <Menu size={24} />
            ) : (
              <X />
            )
          }
        </button>

        {/* Contenedor que se muestra en pantallas grandes y se oculta en pequeñas */}
        <div className="hidden md:flex w-full items-center justify-end gap-20">
          <NavBar onLinkClick={handleLinkClick}/>
          <HeaderActions onLinkClick={handleLinkClick}/>
        </div>

        {/* Menú desplegable para pantallas pequeñas */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-0 right-0 w-full h-screen bg-text bg-opacity-90 flex flex-col items-center justify-center gap-6 lg:hidden`}
        >
          <NavBar onLinkClick={handleLinkClick}/>
          <HeaderActions onLinkClick={handleLinkClick}/>
        </div>
      </div>
    </header>
  )
}
