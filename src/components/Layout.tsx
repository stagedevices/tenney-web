import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LiquidMetalBackground from '../shaders/LiquidMetalBackground';
import PaperTextureBackground from '../shaders/PaperTextureBackground';

const Layout = () => {
  const location = useLocation();
  const paperMode = location.pathname.startsWith('/docs');

  return (
    <div className={`min-h-screen ${paperMode ? 'bg-paper text-black' : 'bg-[#05070B] text-white'} transition-colors`}>
      {paperMode ? (
        <PaperTextureBackground className="fixed inset-0 -z-10 opacity-80" />
      ) : (
        <LiquidMetalBackground className="fixed inset-0 -z-10 opacity-80" />
      )}
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer paperMode={paperMode} />
    </div>
  );
};

export default Layout;
