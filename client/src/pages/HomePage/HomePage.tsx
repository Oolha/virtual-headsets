import FAQ from "../../components/FAQ/FAQ";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import GamingCreator from "../../components/GamingCreator/GamingCreator";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import TopGames from "../../components/TopGames/TopGames";
import style from "./HomePage.module.css";

const HomePage = ({}) => {
  return (
    <div>
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
