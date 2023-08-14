import { useLocation } from 'react-router-dom'
import './style.css'

const SuccessOrder = () =>{
    const location = useLocation();

    const { orderId } = location.state
    return(
        <div>
            <h2>¡Haz completado tu compra. Gracias!</h2>
            <p>Número de órden: {orderId}</p>
        </div>
    )
}

export default SuccessOrder