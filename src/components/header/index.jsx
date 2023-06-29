import React from "react";
import ItemListContainer from "../main/ItemListContainer";
import Carrito from "../../assets/carrito.png"
import './styles.css';


const Header = () => {
    return (
        <header className="header">
            <a href="" className="logo">WebMarket</a>
            <input type="checkbox" className="side-menu" id="side-menu"/>
            <label className="hamb" for="side-menu">
                <span className="hamb-line"></span>
            </label>
            <Navbar />
        </header>
    )
}

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

const CartWidget = () => {
    return(
        <div className="cartWidget">
            <span className="cartNotification">5</span>
            <img className="CartIcon" src={Carrito} alt="Carrito de Compras" />
        </div>
    )
}

export default Header