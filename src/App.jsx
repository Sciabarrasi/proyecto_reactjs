import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import ProductDetail from './pages/product-detail';
import ItemListContainer from './components/main/ItemListContainer';
import { CartProvider } from './context/cart-context';
import Cart from './pages/cart';


function App() {

  return (
      <div>
        <CartProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/category/:categoryId' element={<ItemListContainer />} />
            <Route  path='/cart' element={<Cart />} />
          </Routes>
        </CartProvider>
      </div>
    )
}

export default App