import { useEffect } from "react";
import Header from "../../components/Header/Header";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import css from "./SingleProduct.module.css";
import Footer from "../../components/Footer/Footer";

const SingleProduct = ({}) => {
  return (
    <div>
      <Header />
      <ProductDetails />
      <Footer />
    </div>
  );
};

export default SingleProduct;
