import React from "react";
import Carrito from "../../../assets/carrito.png"

const CartWidget = () => {
    return(
        <div className="cartWidget">
            <span className="cartNotification">5</span>
            <img className="CartIcon" src={Carrito} alt="Carrito de Compras" />
        </div>
    )
}

export default CartWidget