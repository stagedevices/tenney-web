import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import DocsRedirect from "./pages/DocsRedirect";
import Beta from "./pages/Beta";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";
import Features from "./pages/Features";
import FeaturesWhitePaper from "./pages/FeaturesWhitePaper";

const easing = [0.22, 0.8, 0.28, 1];

export default function App() {
  const [storyState, setStoryState] = useState({ beatIndex: 0, isActive: false });

  return (
    <MotionConfig transition={{ duration: 0.6, ease: easing }}>
      <div className="min-h-screen bg-tenney-bg text-slate-900 dark:text-slate-100 flex flex-col">
        <Header storyBeatIndex={storyState.beatIndex} storyActive={storyState.isActive} />
        <div className="flex-1 pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<Home onStoryStateChange={setStoryState} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/features/white-paper" element={<FeaturesWhitePaper />} />
            <Route path="/docs/*" element={<DocsRedirect />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MotionConfig>
  );
}
