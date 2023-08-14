import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"
import Details from "../../components/products/details/details"
import Loader from "../../components/loader/loader";
import { API_URLS } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

function ProductDetail() {
    const { productId} = useParams();
    const navigate = useNavigate();
    const urlProductDetail = `${API_URLS.PRODUCTS.url}/${productId}`;

    const { data, loading, error } = useFetch(urlProductDetail, API_URLS.PRODUCTS.config);
    const history = window.history;

    return(
        <>
        <div className='headerDetailContainer'>
            {history.length > 2 ? (<button onClick={()=> navigate(-1)} className='backButton'> &#8592; Volver</button>) : null}
            <h2 className='headerTittleCard'>Detalles del Producto</h2>
        </div>
        {loading && (
        <div className="loaderContainer">
            <Loader />
        </div>)}
        {error && <p>Algo salió mal..</p>}

        <Details {... data} />
        </>
    )
}

export default ProductDetail