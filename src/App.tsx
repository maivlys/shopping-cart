import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Store } from "./pages/Store";
import { ProductPage } from "./pages/ProductPage";
import { CheckOut } from "./pages/CheckOut";
import { Favorites } from "./pages/Favorites";
import { Route, Routes } from "react-router";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
}

export default App;
