import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Docs from './pages/Docs';
import DocsLearn from './pages/DocsLearn';
import Nightly from './pages/Nightly';
import Privacy from './pages/Privacy';
import Press from './pages/Press';

const RoutesConfig = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/docs/learn" element={<DocsLearn />} />
      <Route path="/docs/*" element={<Docs />} />
      <Route path="/nightly" element={<Nightly />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/press" element={<Press />} />
    </Route>
  </Routes>
);

export default RoutesConfig;
