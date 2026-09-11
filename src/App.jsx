import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Search from './pages/Search';
import BlogPost from './pages/BlogPost';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import RequirePayment from './components/RequirePayment';
import Confirmation from './pages/Confirmation';
import OrderTracking from './pages/OrderTracking';
import Support from './pages/Support';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/payment"
          element={(
            <RequirePayment>
              <Payment />
            </RequirePayment>
          )}
        />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
