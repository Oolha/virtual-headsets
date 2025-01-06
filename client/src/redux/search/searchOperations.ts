import { AppDispatch, RootState } from "../store";
import { setSearchResults, setSearchTerm } from "./searchSlice";

export const performSearch =
  (searchTerm: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { virtualHeadsets, games } = getState();

    const filteredHeadsets = virtualHeadsets.virtualHeadsets.filter((headset) =>
      headset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGames = games.games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch(setSearchTerm(searchTerm));
    dispatch(
      setSearchResults({
        headsets: filteredHeadsets,
        games: filteredGames,
      })
    );
  };
