import { Suspense, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoadingAnimation from "./components/LoadingAnimation";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />
      )}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </div>
    </>
  );
}

export default App;
