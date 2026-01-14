import { Route, Routes } from 'react-router-dom';
import MarketingLanding from './pages/MarketingLanding';
import Docs from './pages/Docs';
import Beta from './pages/Beta';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingLanding />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/beta" element={<Beta />} />
    </Routes>
  );
}
