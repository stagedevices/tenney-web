import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LiquidMetalBackground from '../shaders/LiquidMetalBackground';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#05070B] text-white">
      {!isHome && <LiquidMetalBackground className="fixed inset-0 -z-10 opacity-60" />}
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
