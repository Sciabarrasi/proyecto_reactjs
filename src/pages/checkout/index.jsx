import Input from "../../components/input/inputIndex"
import "./styles.css"
import { useForm } from "../../hooks/useForm";
import { CartContext } from "../../context/cart-context"
import { firebaseServices } from "../../services/firebase"
import { useContext, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useQuery } from '../../hooks/useQuery'
import CartItem from "../../components/cart/item";
import Total from "../../components/cart/total";


const initialState = {
    name : { value: '',error: '', hasError: true, active: false, name: 'nombre'},
    surname : { value: '',error: '', hasError: true, active: false, name: 'surname'},
    address : { value: '',error: '', hasError: true, active: false, name: 'address'},
    country : { value: '',error: '', hasError: true, active: false, name: 'country'},
    email : { value: '',error: '', hasError: true, active: false, name: 'email'},
    isFormValid: false,
}

function Checkout() {
    const [formState, inputHandler, inputFocus, inputBlur, clearInputs] = useForm(initialState);
    const {cart, total, setCart, onAddToCart, onDecreaseItem,onRemoveItem, getTotalItemQuantity} = useContext(CartContext);
    const { state } = useLocation();
    const navigate = useNavigate();
    let query = useQuery();

    useEffect(() =>{
        const cartId = query.get('cartId')

        if(query.get("cartId")){
            const getCart = async () =>{
                const cart = await firebaseServices.getCartById(cartId)
                return cart
            }
            getCart()
                .then((cart) =>{
                    setCart(cart.items)
                })
                .catch((error) =>{
                    console.log({error})
                })
        }
    }, [query])


    const onChange = (event) => {
        const {name, value} = event.target
        inputHandler({ name, value })
    }

    const onFocus = ({name}) => {
        inputFocus({name})
    }

    const onBlur = ({name}) => {
        inputBlur({name});
    }

    const onHandlerOrder = async () =>{
        const newOrder = {
            buyer: {
                name: formState.name.value,
                surname: formState.surname.value,
                address: formState.address.value,
                country: formState.country.value,
                email: formState.email.value,
            },
            createAt: new Date(),
            items: cart,
            payment: {
                currency: 'USD',
                method: 'CASH',
                type: 'CASH',
            },
            seller: {
                id: 1,
                name: 'Predito',
                phoen: '123103021',
                email: 'pedrito@gmail.com',
            },
            shipping:{
                deliverDate: new Date() + 7,
                trackingNumber: '123151234asdad123',
                type: 'DELIVERY',
            },
            total: total
        }

        const orderId = await firebaseServices.createOrder(newOrder);
        await firebaseServices.updateCart(state.cartId);
        return { orderId, }
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        const { orderId } = await onHandlerOrder();
        clearInputs({formState})
        navigate('/successOrder',{state: {orderId: orderId.id}})
    }

    return(
        <div className="checkoutContainer">
            <div className='checkoutDetailContainer'>
                <div className='checkoutFormContainer'>
                    <h1 className='checkoutTitle'>Formulario de Compra</h1>
                    <form onSubmit={onSubmit}  className="checkoutForm">
                        <div className="checkoutFormContent">
                        <div className="checkoutFormInputGroup">
                            <Input
                                placeholder="Ingrese su nombre"
                                id='nombre'
                                name="name"
                                required={true}
                                label="Nombre"
                                onChange={onChange}
                                onFocus={()=> onFocus({name:'name'})}
                                onBlur={()=> onBlur({name:'name'})}
                                active={formState.name.active}
                                error={formState.name.hasError}
                                hasError={formState.name.hasError}
                                maxLength={40}/>
                        </div>
                        <div className="checkoutFormInputGroup">
                            <Input
                                placeholder="Ingrese su apellido"
                                id='surname'
                                name="surname"
                                required={true}
                                label="Apellido"
                                onChange={onChange}
                                onFocus={()=> onFocus({name:'surname'})}
                                onBlur={()=> onBlur({name:'surname'})}
                                active={formState.surname.active}
                                error={formState.surname.hasError}
                                hasError={formState.surname.hasError}
                                maxLength={40}/>
                        </div>
                        <div className="checkoutFormInputGroup">
                            <Input
                                placeholder="Ingrese su domicilio"
                                id='address'
                                name="address"
                                required={true}
                                label="Domicilio"
                                onChange={onChange}
                                onFocus={()=> onFocus({name:'address'})}
                                onBlur={()=> onBlur({name:'address'})}
                                active={formState.address.active}
                                error={formState.address.hasError}
                                hasError={formState.address.hasError}
                                maxLength={40}/>
                        </div>
                        <div className="checkoutFormInputGroup">
                            <Input
                                placeholder="Ingrese de que país es"
                                id='country'
                                name="country"
                                required={true}
                                label="País"
                                onChange={onChange}
                                onFocus={()=> onFocus({name:'country'})}
                                onBlur={()=> onBlur({name:'country'})}
                                active={formState.country.active}
                                error={formState.country.hasError}
                                hasError={formState.country.hasError}
                                maxLength={40}/>
                        </div>
                        <div className="checkoutFormInputGroup">
                            <Input
                                placeholder="Ingrese su mail"
                                id='email'
                                name="email"
                                required={true}
                                label="Email"
                                onChange={onChange}
                                onFocus={()=> onFocus({name:'email'})}
                                onBlur={()=> onBlur({name:'email'})}
                                active={formState.email.active}
                                error={formState.email.hasError}
                                hasError={formState.email.hasError}
                                maxLength={40}/>
                        </div>
                    </div>
                        <button type='submit' className='buttonCheckout'>Confirmar Compra</button>
                    </form>
                </div>
                {cart?.length > 0 ? (
                     <div className='checkoutCartContainer'>
                     <h2 className='checkoutTitle'>Productos en el carrito</h2>
                     {
                         cart.map((product) => (
                             <CartItem key={product.id}{...product} onAddToCart={onAddToCart} onDecreaseItem={onDecreaseItem} onRemoveItem={onRemoveItem} />
                         ))
                     }
                     <Total total={total} totalItemQuantity={getTotalItemQuantity()} />
                 </div>
                ) : null}
            </div>
        </div>
    )
}

export default Checkout