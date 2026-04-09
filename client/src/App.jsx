import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Solve from "./pages/Solve";
import Result from "./pages/Result";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </>
  );
}

export default App
