import React, { useContext } from "react";
import Carrito from "../../assets/carrito.png"
import './styles.css';
import { CartContext } from "../../context/cart-context";
import { useNavigate, Link } from "react-router-dom";


const Header = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCart = () =>{
        navigate('/cart');
    }

    return (
        <header className="header">
            <Link to="/" className="logo">WebMarket</Link>
            <input type="checkbox" className="side-menu" id="side-menu"/>
            <label className="hamb" htmlFor="side-menu">
                <span className="hamb-line"></span>
            </label>
            <nav className="nav">
                <ul className="menu">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                    <li onClick={goToCart} className="menu-cart-container">
                        <img className="menu-cart-image" src={Carrito} alt="Carrito de Compras" />
                        <div className="menu-cart-count-container">
                            <span className="menu-cart-count">{cart.length}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header