import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { useFetch } from "../../hooks/useFetch";
import type { Book } from "../../models/book";

interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const fetchAnything = useFetch();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleFetchMore = () => {
    switch (fetchAnything.searchType) {
      case "title":
        fetchAnything.fetchBooksByTitle(fetchAnything.currentSearch, true);
        break;
      case "author":
        fetchAnything.fetchBooksByAuthor(fetchAnything.currentSearch, true);
        break;
      case "year":
        fetchAnything.fetchBooksByFirstPublishYear(fetchAnything.currentSearch, true);
        break;
      case "subject":
        fetchAnything.fetchBooksBySubject(fetchAnything.currentSearch, true);
        break;
      case "advanced search":
        fetchAnything.fetchAdvancedSearch(fetchAnything.advancedCurrentSearch, true);
        break;
    }
  };

  return (
    <SearchContext.Provider
      value={{
        ...fetchAnything,
        handleFetchMore,
        selectedBook,
        setSelectedBook,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
