import Header from "../../components/Header/Header";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import css from "./SingleProduct.module.css";
import Footer from "../../components/Footer/Footer";

const SingleProduct = ({}) => {
  return (
    <div className={css.singleProduct}>
      <div className={css.wrapperHeader}>
        <Header />
      </div>
      <div className={css.productWrapper}>
        <ProductDetails />
        <Footer />
      </div>
    </div>
  );
};

export default SingleProduct;
