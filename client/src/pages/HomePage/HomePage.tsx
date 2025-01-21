import FAQ from "../../components/FAQ/FAQ";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import GamingCreator from "../../components/GamingCreator/GamingCreator";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import TopGames from "../../components/TopGames/TopGames";
import css from "./HomePage.module.css";

const HomePage = ({}) => {
  return (
    <div className={css.contentContainer}>
      <div className={css.gradient}></div>
      <div className={css.gradient1}></div>
      <Header />
      <Hero />
      <Features />
      <GamingCreator />
      <TopGames />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
