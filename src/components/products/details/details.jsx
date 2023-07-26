import './styles.css';

const Details = ({image, name, category, description, price, stock, onAddToCart}) =>{
    return(
        <>
        <div className='cardDetail'>
            <div className='cardDetailImageContainer'>
                <img className='cardDetailImage' src={image} alt={name} />
            </div>
            <div className='cardDetailContent'>
                <h3 className='cardDetailName'>{name}</h3>
                <p className='cardDetailCategory'>{category}</p>
                <p className='cardDetailDescription'>{description}</p>
                <p className='cardDetailPrice'>USD {price}</p>
                <p className='cardDetailStock'>Quedan {stock}</p>
                <div className='cardDetailActions'>
                    <button onClick={onAddToCart} className='cardDetailButton'>Agregar al carrito</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Details;