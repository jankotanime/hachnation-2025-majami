import React from "react"
import styles from "./Navbar.module.css"
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch"

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.brand}>Navbar</div>
            <DarkModeSwitch />
        </div>
    )
}

export default Navbar