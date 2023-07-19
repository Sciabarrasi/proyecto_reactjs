import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import ProductDetail from './pages/product-detail';

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products/:productId' element={<ProductDetail />} />
        </Routes>
      </div>
    )
}

export default App