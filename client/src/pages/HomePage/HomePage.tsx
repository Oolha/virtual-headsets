import FAQ from "../../components/FAQ/FAQ";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import GamingCreator from "../../components/GamingCreator/GamingCreator";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import TopGames from "../../components/TopGames/TopGames";

const HomePage = ({}) => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <GamingCreator />
      <TopGames />
      <FAQ />
      <Footer />
    </>
  );
};

export default HomePage;
