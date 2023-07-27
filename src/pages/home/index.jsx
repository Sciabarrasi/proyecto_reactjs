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
  const [isFiltered, setIsFiltered] = useState(false);
  const [productDetails, setProductsDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);
  const [cart, setCart] = useState([]);

  const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
  const { data: categories, loading: loadingCategories, error: errorCategories} = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

  {/*
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

  const inputClass = `container ${active ? 'active' : ''}`
  */}

  const onShowDetails = (id) =>{
    navigate(`/products/${id}`);
  }

  const onShowCategory = (id) =>{
    navigate(`/category/${id}`)
  }

  const onFilter =(name) =>{
    setIsFiltered(true);
    const productsByCategory = products.filter((product) => product.category === name);
    setProductFiltered(productsByCategory);
  }

  const onAddToCart = (id) => {
    const item = products.find((product) => product.id === id);
    if(cart?.find((product) => product.id === id)?.quantity === Number(item.stock)) return;
    if(cart?.length === 0){
      setCart([{... item, quantity: 1}])
    }
    if(cart?.length > 0 && !cart?.find((product) => product.id === id)){
      setCart([... cart, {... item, quantity: 1 }])
    }
    if(cart?.length > 0 && cart?.find((product) => product.id === id)){
      setCart((currentCart) =>{
        return currentCart.map((product) =>{
          if(product.id === id){
            return {... product, quantity: product.quantity + 1}
          }else{
            return product;
          }
        })
      });
    }
  }

  return (
      <div>
          <div className='contentContainer'>
            <h2>Carrito</h2>
            <div className='cartContainer'>
                {cart.length === 0 && <h3>El carrito está vacío</h3>}
                {
                  cart?.length > 0 && cart.map((product) =>(
                    <div key={product.id} className='cartItem'>
                      <img className='cardImage' src={product.image} alt={product.name} />
                      <p className='cartProductName'>{product.name}</p>
                      <p className='cartProductQuantity'>{product.quantity}</p>
                      <p className='cartProductPrice'>{product.price}</p>
                      <p className='cartProductStock'>{product.stock}</p>
                    </div>
                  ))
                }
            </div>
            <div className='categoriesContainer'>
              {loadingCategories ? <Loader /> : null}
              {errorCategories ? <h2>{errorCategories}</h2> : null}
              <Slider >
                <button onClick={() => setIsFiltered(false)} type='button' className='categoryContainer'>
                  <p className='categoryName'>Mostrar Todos</p>
                </button>
              {
                categories.map((category) => (
                  <button key={category.id} onClick={()=> onShowCategory(category.id)} type='button' className='categoryContainer'>
                    <p className='categoryName'>{category.name}</p>
                  </button>
                ))
              }
              </Slider>
            </div>
            {/*
            <div className='inputContainer'>
                <Input placeholder="Busca un producto" id='task' required={true} name="Buscador" onchange={onChange} onFocus={onFocus} onBlur={onBlur} active={active} className={inputClass} />
            </div>
            */}
            <h2 className='headerTittleCard'>Productos</h2>
            <div className='cardContainer'>
              {loadingProducts && <Loader />}
              {errorProducts && <h3>{errorProducts}</h3>}
              {search.length > 0 && productFiltered === 0 && <h2>Producto no encontrado</h2>}
                {
                  isFiltered ? (
                    productFiltered.map((product) =>{
                      <Card onAddToCart={onAddToCart} key={product.id} { ... product} onShowDetails={onShowDetails}/>
                    })
                  ) : (
                  products.map((product) => (
                    <Card onAddToCart={onAddToCart} key={product.id} { ... product} onShowDetails={onShowDetails}/>
                  ))
                  )
                }
                {
                  isFiltered && productFiltered.length === 0 ? <h2>No hay Productos!</h2> : null
                }
            </div>
          </div>
        </div>
  )
}

export default Home