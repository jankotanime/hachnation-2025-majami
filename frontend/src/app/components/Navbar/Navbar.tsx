'use client'
import React from "react"
import { useRouter } from "next/navigation"
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch"
import Image from "next/image";

const Navbar = () => {
    const router = useRouter()
    const handleLogoClick = () => {
        router.push('/')
    }

    return (
        <div className="flex justify-between items-center px-6 py-4" style={{ backgroundColor: 'var(--backgroundNav)', borderColor: 'var(--onSurface)' }} >
            <div className="flex items-center gap-6">
                <Image
                    src="/images/godlo.png"
                    alt="godlo"
                    width={40}
                    height={40}
                    onClick={handleLogoClick}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <div className="w-0.5 h-12" style={{ backgroundColor: 'var(--accent-red-200)'}}></div>
                <div>
                    Serwis Rzeczypospolitej Polskiej
                </div>
            </div>
            <DarkModeSwitch />
        </div>
    )
}

export default Navbar