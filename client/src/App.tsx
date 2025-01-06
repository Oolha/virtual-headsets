import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Catalog from "./pages/Catalog/Catalog";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
