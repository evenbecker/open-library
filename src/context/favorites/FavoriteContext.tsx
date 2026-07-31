import { createContext, useContext } from "react";
import type { Book } from "../../models/book";

interface FavoriteContextProps {
  favorites: Book[];
  handleSaveAsFavorite: (book: Book) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }

  return context;
};
