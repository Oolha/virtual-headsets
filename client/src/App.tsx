import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Catalog from "./pages/Catalog/Catalog";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/singleProduct" element={<SingleProduct />} />
    </Routes>
  );
}

export default App;
