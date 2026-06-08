import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

const Store = lazy(() => import("./pages/Store"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Favorites = lazy(() => import("./pages/Favorites"));
const CheckOut = lazy(() => import("./pages/CheckOut"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
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
