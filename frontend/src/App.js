import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound/NotFound";
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
