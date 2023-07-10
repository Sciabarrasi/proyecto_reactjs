import React from "react";
import CartWidget from "../cartwidget/cartwidget";

const Navbar = () => {
    return(
        <nav className="nav">
                <ul className="menu">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <CartWidget />
            </nav>
    )
}

export default Navbar