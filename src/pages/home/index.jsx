import './styles.css';
import Input from '../../components/input/inputIndex';
import Card from '../../components/products/card/productsIndex';
import Loader from '../../components/loader/loader';
import Slider from '../../components/slider';
import { useEffect, useState, useContext } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [productFiltered, setProductFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Mostrar Todos');

  const { setProducts, onAddToCart } = useContext(CartContext);

  const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
  const { data: categories, loading: loadingCategories, error: errorCategories} = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

  const filterBySearch = (query) =>{
    if(selectedCategory !== 'Mostrar Todos' && query.length === 0){
      onFilter(selectedCategory);
      return;
    }
    let updateProductList = query.length === 0 ? [... products] : [... productFiltered];

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

  useEffect(() =>{
    if(products?.length > 0){
      setProducts(products);
    }
  }, [products, setProducts])

  const onShowDetails = (id) =>{
    navigate(`/products/${id}`);
  }

  const onShowCategory = (name) =>{
    navigate(`/category/${name}`)
  }

  const onFilter =(name) =>{
    setIsFiltered(true);
    const productsByCategory = products.filter((product) => product.category === name);
    setProductFiltered(productsByCategory);
    setSelectedCategory(name);
  }

  return (
      <>
          <div className='contentContainer'>
            <div className='categoriesContainer'>
              {loadingCategories ? <Loader /> : null}
              {errorCategories ? <h2>{errorCategories}</h2> : null}
              <Slider >
                <button onClick={() => setIsFiltered(false)} type='button' className='categoryContainer'>
                  <p className='categoryName'>Mostrar Todos</p>
                </button>
              {
                categories.map((category) => (
                  <button key={category.id} onClick={()=> onShowCategory(category.name)} type='button' className='categoryContainer'>
                    <p className='categoryName'>{category.name}</p>
                  </button>
                ))
              }
              </Slider>
            </div>

            <div className='inputContainer'>
                {
                isFiltered ? (
                  <Input placeholder="Busca un producto" id='task' required={true} name="Buscador" onFilter={onFilter} onChange={onChange} onFocus={onFocus} onBlur={onBlur} active={active}/>
                  ) : null}
            </div>

            <h2 className='headerTittleCard'>Productos</h2>
            <div className='cardContainer'>
              {loadingProducts && <Loader />}
              {errorProducts && <h3>{errorProducts}</h3>}
                {
                  isFiltered ? (
                    productFiltered.map((product) =>{
                      <Card key={product.id} { ... product} onShowDetails={onShowDetails} onAddToCart={onAddToCart}/>
                    })
                  ) : (
                  products.map((product) => (
                    <Card key={product.id} { ... product} onShowDetails={onShowDetails} onAddToCart={onAddToCart}/>
                  ))
                  )
                }
                {
                  isFiltered && productFiltered.length === 0 ? <h2>No hay Productos!</h2> : null
                }
            </div>
          </div>
        </>
  )
}

export default Home