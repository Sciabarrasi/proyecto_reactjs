import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URLS } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/loader";
import ItemList from "./ItemList";
import Card from "../products/card/productsIndex";

const ItemListContainer = () =>{
    const [products, setProducts] = useState([]);
    const {categoryId} = useParams();
    const urlProduct = `${API_URLS.PRODUCTS.url}`;

    const { data, loading, error } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);

    const filteredProducts = data.filter(product => product.category === categoryId);
    console.log(filteredProducts);

    return(
        <>
            <div className='headerDetailContainer'>
                {history.length > 2 ? (<button onClick={()=> navigate(-1)} className='backButton'> &#8592; Volver</button>) : null}
                <h2 className='headerTittleCard'>Detalles del Producto</h2>
            </div>
            {
            filteredProducts.map((product) => (
                <Card key={product.id} { ... product}/>
                ))
            }
        </>
    )
}

export default ItemListContainer