import { useParams } from "react-router-dom";
import css from "./GameDetails.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  selectError,
  selectGames,
  selectIsLoading,
} from "../../redux/games/selectors";
import { useEffect } from "react";
import { fetchTop5Games } from "../../redux/games/operations";
import Loader from "../Loader/Loader";
import Lottie from "lottie-react";
import animationData from "../../../public/animations/cat.json";

const GameDetails = ({}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectGames);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTop5Games());
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const item = items.find((item) => item._id === id);
  if (!item) return <div>Product not found</div>;

  return (
    <div className={css.container}>
      <div className={css.message}>
        <h2>{item.name}</h2>
        <p className={css.text}>
          This page is currently under development. Check back soon for detailed
          game information!
        </p>
        <p>Status: Work in Progress</p>
        <Lottie
          animationData={animationData}
          style={{ width: 300, height: 200 }}
        />
      </div>
    </div>
  );
};

export default GameDetails;
