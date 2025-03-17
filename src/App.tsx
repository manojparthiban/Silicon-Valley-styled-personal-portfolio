import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
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
  );
}

export default App;
