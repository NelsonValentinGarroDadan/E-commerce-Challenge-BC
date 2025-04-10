"use client"

import SwichTheme from "@/components/switchTheme";

export default function Home(){
    return(
        <main className="min-h-screen flex items-center justify-center">
            <SwichTheme />
            <h1 className="text-primary">HOLA</h1>
            <h1 className="text-secondary">HOLA</h1>
            <h1 className="text-accent">HOLA</h1>
        </main>
    );
}