import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import ProductDetail from './pages/product-detail';
import Card from './components/products/card/productsIndex';
import Details from './components/products/details/details';

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products/:productId' element={<ProductDetail />} />
          <Route path='/category/categoryid' element={<Card />} />
          <Route path='Item/itemid' element={<Details />} />
        </Routes>
      </div>
    )
}

export default App