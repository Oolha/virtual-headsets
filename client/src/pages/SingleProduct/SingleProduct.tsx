import { useEffect } from "react";
import Header from "../../components/Header/Header";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import css from "./SingleProduct.module.css";

const SingleProduct = ({}) => {


  return (
    <div>
      <Header />
     
        <ProductDetails />
      
    </div>
  );
};

export default SingleProduct;
