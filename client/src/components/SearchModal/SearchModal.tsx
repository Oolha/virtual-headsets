import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import debounce from "lodash/debounce";
import { Icon } from "../Icon/Icon";
import css from "./SearchModal.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "../../redux/types";
import { getSuggestions } from "../../redux/search/searchOperations";
import { selectIsLoading } from "../../redux/virtual-headsets/selectors";
import Loader from "../Loader/Loader";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const suggestions = useAppSelector((state) => state.search.suggestions);
  const isLoading = useAppSelector(selectIsLoading);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Debounced suggestions fetch
  const debouncedGetSuggestions = debounce((term: string) => {
    if (term.trim().length > 0) {
      dispatch(getSuggestions(term));
    }
  }, 300);

  useEffect(() => {
    debouncedGetSuggestions(searchTerm);

    return () => {
      debouncedGetSuggestions.cancel();
    };
  }, [searchTerm]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      handleSuggestionClick(selected);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    navigate(`/${suggestion.type}/${suggestion.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        {/* Search Input Section */}
        <div className={css.searchContainer}>
          <div className={css.searchInputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search games & products.."
              className={css.searchInput}
            />
          </div>
        </div>

        {/* Suggestions Section */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {suggestions.length > 0 && (
              <div className={css.suggestions}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    className={`${css.suggestionItem} ${
                      index === selectedIndex ? css.selected : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.photo && (
                      <img
                        src={suggestion.photo}
                        alt={suggestion.name}
                        className={css.suggestionPhoto}
                      />
                    )}
                    <div className={css.suggestionContent}>
                      <span className={css.suggestionName}>
                        {suggestion.name}
                      </span>
                      <span className={css.suggestionType}>
                        {suggestion.category}
                      </span>
                    </div>
                    <Icon
                      id="icon-arrow-right"
                      className={css.suggestionArrow}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {searchTerm.length > 0 && suggestions.length === 0 && (
              <div className={css.noResults}>
                No results found for "{searchTerm}"
              </div>
            )}
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
