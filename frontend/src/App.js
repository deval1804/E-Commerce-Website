import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import Mens_Banner from "./Components/Assets/Mens_Banner.png";
import Womens_Banner from "./Components/Assets/Womens_Banner.png";
import Kids_Banner from "./Components/Assets/Kids_Banner.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="main-content" style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={Mens_Banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={Womens_Banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={Kids_Banner} category="kid" />} />
            <Route path='/product' element={<Product />} >
              <Route path=':productID' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;