"use client"

import Link from "next/link"

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-background text-text">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Ups... No encontramos esta página 😢</p>
        <Link href="/" className="text-accent underline hover:text-secondary transition-colors">
          Volver al inicio
        </Link>
      </div>
    )
  }