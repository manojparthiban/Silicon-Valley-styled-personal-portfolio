import { Suspense, useState, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";

// Lazy load components
const Home = lazy(() => import("./components/home"));

// Import routes normally since it contains route configuration
import routes from "tempo-routes";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isLoading && (
        <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />
      )}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          willChange: 'opacity'
        }}
      >
        <Suspense 
          fallback={
            <div className="flex items-center justify-center h-screen">
              <p>Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {import.meta.env.VITE_TEMPO === "true" && routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
