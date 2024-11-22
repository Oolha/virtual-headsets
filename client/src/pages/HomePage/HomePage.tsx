import Features from "../../components/Features/Features";
import GamingCreator from "../../components/GamingCreator/GamingCreator";
import Header from "../../components/Header/Header";
import TopGames from "../../components/TopGames/TopGames";
import style from "./HomePage.module.css";

const HomePage = ({}) => {
  return (
    <div>
      <Header />
      <Features />
      <GamingCreator />
      <TopGames />
    </div>
  );
};

export default HomePage;
