import './App.css';
import Header from './components/header';
import Input from './components/input/inputIndex';
import Card from './components/products/card/productsIndex';
import Details from './components/products/details/details';
import Loader from './components/loader/loader';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { API_URLS } from './constants/index';

function App() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductsDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);

  const { data: products, loading, error } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);

  const filterBySearch = (query) =>{
    let updateProductList = [... products];

    updateProductList = updateProductList.filter((item) =>{
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })

    setProductFiltered(updateProductList);
  }

  const onChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    filterBySearch(value);
  };

  const onFocus = () =>{
    setActive(true);
  }
  const onBlur = () =>{
    setActive(false)
  };

  const onShowDetails = (id) =>{
    setShowDetails(true);
    const findProduct = products.find((product) => product.id === id);
    setProductsDetail(findProduct);
  }

  const inputClass = `container ${active ? 'active' : ''}`

  return (
      <div>
        <Header />
        <div className='contentContainer'>
          {showDetails ? (
            <>
            <div className='headerDetailContainer'>
              <button className='backButton' onClick={()=> setShowDetails(false)}> &#8592; Atrás</button>
                <h2 className='headerTittleCard'>Detalles del Producto</h2>
            </div>
            <Details {... productDetails} />
            </>
          ) : (
            <>
            <div className='inputContainer'>
                <Input placeholder="Busca un producto" id='task' required={true} name="Buscador" onchange={onChange} onFocus={onFocus} onBlur={onBlur} active={active} className={inputClass} />
            </div>
            <h2 className='headerTittleCard'>Productos</h2>
            <div className='cardContainer'>
              {loading && <Loader />}
              {error && <h3>{error}</h3>}
              {search.length > 0 && productFiltered === 0 && <h2>Producto no encontrado</h2>}
                {
                  search.length > 0 ? (
                     productFiltered.map((product) =>{
                    <Card key={product.id}{ ... product} onShowDetails={onShowDetails}/>
                    })
                  ) : (
                  products.map((product) => (
                    <Card key={product.id}{ ... product} onShowDetails={onShowDetails}/>
                  ))
                  )
                }
            </div>
            </>
          )
        }
        </div>
      </div>
  )
}

export default App