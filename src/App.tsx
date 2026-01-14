import { useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import RoutesConfig from './routes';

const BASENAME = '/tenney-web';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      const decoded = decodeURIComponent(redirect);
      const url = decoded.startsWith('/') ? decoded : `/${decoded}`;
      navigate(url, { replace: true });
    }
  }, [location.search, navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <RedirectHandler />
      <RoutesConfig />
    </BrowserRouter>
  );
};

export default App;
