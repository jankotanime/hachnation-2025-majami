'use client'
import React from "react"
import { useRouter } from "next/navigation"
import styles from "./Navbar.module.css"
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch"
import Image from "next/image";

const Navbar = () => {
    const router = useRouter()
    const handleLogoClick = () => {
        router.push('/')
    }

    return (
        <div className={styles.navbar}>
            <Image
                src="/images/godlo.png"
                alt="godlo"
                width={40}
                height={40}
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
            />
            <DarkModeSwitch />
        </div>
    )
}

export default Navbar