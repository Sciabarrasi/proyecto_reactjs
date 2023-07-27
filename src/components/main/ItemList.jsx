import './styles.css'

const ItemList = ({image, name, category, description, price, stock}) =>{
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
                </div>
            </div>
        </>
    )
}

export default ItemList