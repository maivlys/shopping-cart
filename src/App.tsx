import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Store = lazy(() => import("./pages/Store"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Favorites = lazy(() => import("./pages/Favorites"));
const CheckOut = lazy(() => import("./pages/CheckOut"));

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
