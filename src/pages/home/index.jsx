import './styles.css';
import Header from '../../components/header';
import Input from '../../components/input/inputIndex';
import Card from '../../components/products/card/productsIndex';
import Details from '../../components/products/details/details';
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
  const [productDetails, setProductsDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);

  const { setProducts, products: productsContext, onAddToCart, cart } = useContext(CartContext);

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
  }

  console.log({productsContext, cart})

  return (
      <div>
          <div className='contentContainer'>
            {/*<h2>Carrito</h2>
            <div className='cartContainer'>
                {cart.length === 0 && <h3>El carrito está vacío</h3>}
                {
                  cart?.length > 0 && cart.map((product) =>(
                    <div key={product.id} className='cartItem'>
                      <div className='cardImageContainer'>
                        <img className='cardImage' src={product.image} alt={product.name} />
                      </div>
                      <div className='cartContentContainer'>
                        <p className='cartProductName'>{product.name}</p>
                        <p className='cartProductPrice'>USD {product.price}</p>
                        <p className='cartProductQuantity'>Hay: {product.quantity}</p>
                        <p className='cartProductStock'>Quedan: {product.stock}</p>
                        <div className='cartActions'>
                          <button onClick={()=> onAddToCart(product.id)} className='cartButtonAdd'>+</button>
                          <button onClick={()=> onDecreaseCartItem(product.id)} className='cartButtonDecrease'>-</button>
                          <button onClick={()=> onRemoveCartItem(product.id)} className='cartButtonRemove'>Remover</button>
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  cart?.length > 0 && <p className='cartTotal'>Total: USD {sumTotalCart}</p>
                }
              </div>*/}
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
        </div>
  )
}

export default Home