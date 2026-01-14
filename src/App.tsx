import { Route, Routes } from "react-router-dom";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Beta from "./pages/Beta";
import Docs from "./pages/Docs";
import Marketing from "./pages/Marketing";

const App = () => {
  return (
    <div className="relative min-h-screen bg-ink-900 text-white">
      <Background />
      <Nav />
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/beta" element={<Beta />} />
      </Routes>
    </div>
  );
};

export default App;
