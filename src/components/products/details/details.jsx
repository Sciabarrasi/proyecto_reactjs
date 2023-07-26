import { useParams } from 'react-router-dom';
import './styles.css';
import { API_URLS } from '../../../constants';
import { useFetch } from '../../../hooks/useFetch';
import Loader from '../../loader/loader';

const Details = ({id, image, name, category, description, price, stock, onAddToCart}) =>{
    const {categoryId} = useParams();
    const urlCategory = `${API_URLS.CATEGORIES.url}/${categoryId}`;

    const { data, loading, error } = useFetch(urlCategory, API_URLS.CATEGORIES.config);
    return(
        <>
        {loading && (
            <div className='loaderContainer'>
                <Loader />
            </div>
        )}
        {error && <p>Algo salió mal..</p>}
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
                    <button onClick={() => onAddToCart(id)} className='cardDetailButton'>Agregar al carrito</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Details;