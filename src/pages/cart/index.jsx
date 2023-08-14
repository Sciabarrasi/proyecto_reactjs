import { useContext } from 'react'
import './styles.css'
import { CartContext } from '../../context/cart-context'
import { useNavigate } from 'react-router-dom';
import { firebaseServices } from '../../services/firebase';

function Cart (){
    const {cart, onAddToCart, onDecreaseItem, onRemoveItem, total, getTotalItemQuantity} = useContext(CartContext);
    const navigate = useNavigate();

    const onHandlerCreateCart = async () =>{
      const newCart = {
        buyer: {
          id: 1,
        },
        items: cart,
        createdAt: new Date(),
        total: total,
        status: 'pending',
      }
      const cartId = await firebaseServices.createCart(newCart);
      return cartId;
    }

    const onHandlerCheckout = async () =>{
      const cartId = await onHandlerCreateCart();
      navigate('/checkout', {state: { cartId: cartId.id } });
    }

    return(
        <div>
          <div className='headerCartContainer'>
            {history.length > 2 ? (<button onClick={() => navigate(-1)} className='backButton'> &#8592; Seguir Comprando</button>) : null}
          </div>
          <div className='cartContainer'>
              <h2>Carrito</h2>
              {cart.length === 0 && <h3>El carrito está vacío</h3>}
              {
                cart?.length > 0 && cart.map((product) =>(
                  <div key={product.id} className='cartItem'>
                    <div className='cardImageContainer'>
                      <img className='cardImage' src={product.image} alt={product.name} />
                    </div>
                    <div className='cartContentContainer'>
                      <p className='cartProductName'>{product.name}</p>
                      <p className='cartProductPrice'>USD {product.price}</p>
                      <p className='cartProductQuantity'>Hay: {product.quantity}</p>
                      <p className='cartProductStock'>Quedan: {product.stock}</p>
                      <div className='cartActions'>
                        <button onClick={()=> onAddToCart(product.id)} className='cartButtonAdd'>+</button>
                        <button onClick={()=> onDecreaseItem(product.id)} className='cartButtonDecrease'>-</button>
                        <button onClick={()=> onRemoveItem(product.id)} className='cartButtonRemove'>Remover</button>
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                cart?.length > 0 && (
                  <div className='cartDetailActions'>
                      <p className='cartTotal'>Total: USD {total}</p>
                      <p className='cartItemQuantity'>Productos Totales: {getTotalItemQuantity()}</p>
                      <button onClick={onHandlerCheckout} className='cartButtonCheckout'>Comprar</button>
                  </div>
                )
              }
            </div>
        </div>
      )
}

export default Cart