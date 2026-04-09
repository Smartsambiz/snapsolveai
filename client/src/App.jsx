import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Solve from "./pages/Solve";
import Result from "./pages/Result";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
