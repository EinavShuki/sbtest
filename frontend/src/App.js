import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Search from "./screens/SearchScreen";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
