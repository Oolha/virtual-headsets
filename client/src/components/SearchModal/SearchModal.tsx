import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import Modal from "../Modal/Modal";
import css from "./SearchModal.module.css";
import SearchResults from "../SearchResults/SearchResults";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { performSearch } from "../../redux/search/searchOperations";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (searchTerm: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector((state: RootState) => state.search);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(performSearch(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const handleItemClick = (id: string, type: "catalog" | "game") => {
    navigate(`/${type}/${id}`);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={css.searchModal}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          ref={inputRef}
          type="text"
          className={css.searchInput}
          placeholder="Search games & products.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={css.searchButton}>
          <PiMagnifyingGlassBold className={css.searchIcon} />
        </button>
      </form>
      <SearchResults searchTerm={searchTerm} onItemClick={handleItemClick} />
    </Modal>
  );
};

export default SearchModal;
