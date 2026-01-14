import { MotionConfig } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Docs from "./pages/Docs";
import Beta from "./pages/Beta";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";

const easing = [0.22, 0.8, 0.28, 1];

export default function App() {
  return (
    <MotionConfig transition={{ duration: 0.6, ease: easing }}>
      <div className="min-h-screen bg-tenney-bg text-slate-900 dark:text-slate-100">
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/beta" element={<Beta />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </MotionConfig>
  );
}
