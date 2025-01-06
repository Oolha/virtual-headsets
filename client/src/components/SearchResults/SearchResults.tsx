import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import css from "./SearchResults.module.css";
import { Game, VRHeadset } from "../../redux/types";

interface SearchResultsProps {
  searchTerm: string;
  onItemClick: (id: string, type: "catalog" | "game") => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  onItemClick,
}) => {
  const { headsets, games } = useSelector(
    (state: RootState) => state.search.searchResults
  );

  // Фільтрація VR шоломів за назвою
  const filteredHeadsets = headsets.filter(
    (item): item is VRHeadset =>
      "name" in item &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фільтрація ігор за назвою
  const filteredGames = games.filter(
    (item): item is Game =>
      "name" in item &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Об'єднання результатів
  const combinedResults = [...filteredHeadsets, ...filteredGames];

  return (
    <div className={css.results}>
      {/* Результати для VR шоломів */}
      {filteredHeadsets.length > 0 && (
        <div className={css.section}>
          <h3>VR Headsets</h3>
          {filteredHeadsets.map((headset) => (
            <div
              key={headset._id}
              className={css.item}
              onClick={() => onItemClick(headset._id, "catalog")}
            >
              <img src={headset.photo} alt={headset.name} />
              <h4>{headset.name}</h4>
            </div>
          ))}
        </div>
      )}

      {/* Результати для ігор */}
      {filteredGames.length > 0 && (
        <div className={css.section}>
          <h3>Games</h3>
          {filteredGames.map((game) => (
            <div
              key={game._id}
              className={css.item}
              onClick={() => onItemClick(game._id, "game")}
            >
              <img src={game.photo} alt={game.name} />
              <h4>{game.name}</h4>
            </div>
          ))}
        </div>
      )}

      {/* Повідомлення, якщо немає результатів */}
      {combinedResults.length === 0 && searchTerm && (
        <p>No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default SearchResults;
