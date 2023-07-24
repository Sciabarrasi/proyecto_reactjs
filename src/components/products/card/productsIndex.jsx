import './styles.css';

const Card = ({id, image, name, category, description, price, stock, onAddToCart, onShowDetails}) =>{
    return(
    <div className='card'>
        <button className='cartButtonContainer' type='button' onClick={() => onShowDetails(id)}>
            <img className='cardImage' src={image} alt={name} />
            <div className='cardContent'>
                <h3 className='cardName'>{name}</h3>
                <p className='cardCategory'>{category}</p>
                <p className='cardDescription'>{description}</p>
                <p className='cardPrice'>USD {price}</p>
                <p className='cardStock'>Quedan {stock}</p>
            </div>
        </button>
        <div className='cardActions'>
            <button onClick={onAddToCart} className='cardButton'>Agregar al carrito</button>
        </div>
    </div>
    )
}

export default Card;