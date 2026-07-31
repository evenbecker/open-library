import { createContext, useContext } from "react";
import type { Book } from "../../models/book";
import type { AdvancedSearchParams } from "../../models/search";

interface SearchContextProps {
  book: Book;
  bookList: Book[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentSearch: string;
  advancedCurrentSearch: AdvancedSearchParams;
  searchType: string;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  setSearchType: (type: string) => void;
  fetchBooksByTitle: (title: string, loadMore?: boolean) => void;  
  fetchBooksByAuthor: (author: string, loadMore?: boolean) => void;
  fetchBooksByFirstPublishYear: (year: string, loadMore?: boolean) => void;
  fetchBooksBySubject: (subject: string, loadMore?: boolean) => void;
  fetchAdvancedSearch: (params: AdvancedSearchParams, loadMore?: boolean) => void;
  handleFetchMore: () => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
