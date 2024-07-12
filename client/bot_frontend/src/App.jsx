import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// Components
import Home from "./components/Home";
import Bot from "./components/Bot";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <nav className="py-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/bot">BOT</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bot" element={<Bot />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
