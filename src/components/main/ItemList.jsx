import './styles.css'

const ItemList = (products) =>{
    console.log(products);
    return(
        <>
        {
        products.map((product) => (
            <div className='cardDetail'>
            <div className='cardDetailImageContainer'>
                <img className='cardDetailImage' src={product.image} alt={product.name} />
            </div>
            <div className='cardDetailContent'>
                <h3 className='cardDetailName'>{product.name}</h3>
                <p className='cardDetailCategory'>{product.category}</p>
                <p className='cardDetailDescription'>{product.description}</p>
                <p className='cardDetailPrice'>USD {product.price}</p>
                <p className='cardDetailStock'>Quedan {product.stock}</p>
            </div>
        </div>
        ))
        }
        </>
    )
}

export default ItemList