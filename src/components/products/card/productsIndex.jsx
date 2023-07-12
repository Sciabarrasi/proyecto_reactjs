import './styles.css';

const Card = ({id, image, name, category, description, price, stock, onAddToCart}) =>{
    return(
    <div key={id} className='card'>
        <img className='cardImage' src={image} alt={name} />
        <div className='cardContent'>
            <h3 className='cardName'>{name}</h3>
            <p className='cardCategory'>{category}</p>
            <p className='cardDescription'>{description}</p>
            <p className='cardPrice'>USD {price}</p>
            <p className='cardStock'>Quedan {stock}</p>
        </div>
        <div className='cardActions'>
            <button onClick={() => onAddToCart(id)} className='cardButton'>Agregar al carrito</button>
        </div>
    </div>
    )
}

export default Card;