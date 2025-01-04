import VRHeadsetsList from "../../components/VRHeadsets/VRHeadsets";
import css from "./Catalog.module.css";
import Header from "../../components/Header/Header";
import CatalogHero from "../../components/CatalogHero/CatalogHero";
import Footer from "../../components/Footer/Footer";

const Catalog = ({}) => {
  return (
    <div className={css.noPaddingWrapper}>
      <Header />
      <CatalogHero />
      <VRHeadsetsList />
      <Footer />
    </div>
  );
};

export default Catalog;
