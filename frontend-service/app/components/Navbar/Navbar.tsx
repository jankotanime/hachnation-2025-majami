'use client'
import React from "react"
import styles from "./Navbar.module.css"
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch"
import Image from "next/image";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Image
                src="/images/godlo.png"
                alt="godlo"
                width={40}
                height={40}
            />
            <DarkModeSwitch />
        </div>
    )
}

export default Navbar