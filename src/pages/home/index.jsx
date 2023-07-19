import './styles.css';
import Header from '../../components/header';
import Input from '../../components/input/inputIndex';
import Card from '../../components/products/card/productsIndex';
import Details from '../../components/products/details/details';
import Loader from '../../components/loader/loader';
import Slider from '../../components/slider';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [productDetails, setProductsDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);

  const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
  const {data: categories, loading: loadingCategories, error: errorCategories} = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

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
    navigate(`/products/${id}`);
  }

  const inputClass = `container ${active ? 'active' : ''}`

  return (
      <div>
          <div className='contentContainer'>
            <div className='categoriesContainer'>
              {loadingCategories && <Loader />}
              {errorCategories && <h2>{errorCategories}</h2>}
              <Slider >
              {
                categories.map((category) => (
                  <div key={category.id} className='categoryContainer'>
                    <p className='categoryName'>{category.name}</p>
                  </div>
                ))
              }
              </Slider>
            </div>

            <div className='inputContainer'>
                <Input placeholder="Busca un producto" id='task' required={true} name="Buscador" onchange={onChange} onFocus={onFocus} onBlur={onBlur} active={active} className={inputClass} />
            </div>
            <h2 className='headerTittleCard'>Productos</h2>
            <div className='cardContainer'>
              {loadingProducts && <Loader />}
              {errorProducts && <h3>{errorProducts}</h3>}
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
          </div>
        </div>
  )
}

export default Home