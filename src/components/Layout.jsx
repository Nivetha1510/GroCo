import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import CartToast from './CartToast';

export default function Layout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <CartToast />
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
