import React from "react";
import Navbar from "./navigation-bar/navbar";
import './styles.css';


const Header = () => {
    return (
        <header className="header">
            <a href="/" className="logo">WebMarket</a>
            <input type="checkbox" className="side-menu" id="side-menu"/>
            <label className="hamb" for="side-menu">
                <span className="hamb-line"></span>
            </label>
            <Navbar />
        </header>
    )
}

export default Header