import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

const ItemListContainer = ({greeting}) =>{
    const [products, setProducts] = useState([]);
    const {categoryId} = useParams();

    const getProductsByCategory = (categoryId) =>{
        return new Promise((resolve) => {
          setTimeout(() =>{
            resolve(products.find(products => products.category === categoryId))
          }, 500);
        })
    }

    useEffect(()=> {
        const asyncFunc = categoryId ? getProductsByCategory : setProducts;

        asyncFunc(categoryId)
        .then(response =>{
            setProducts(response)
        })
        .catch(error =>{
            console.error(error)
        })
    }, [categoryId])

    return(
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer