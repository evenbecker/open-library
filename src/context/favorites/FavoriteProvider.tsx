// This context manages bookmarks throughout the app. It sets them up at the start and provides a way to save new bookmarks.

import { useEffect, useState, type ReactNode } from "react";
import { FavoriteContext } from "./FavoriteContext";
import type { Book } from "../../models/book";

interface Props {
  children: ReactNode;
}

export const FavoriteProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleSaveAsFavorite = (book: Book) => {
    // If the book is already in your favorites, clicking the button removes it. Otherwise, clicking the button adds it.
    const isAlreadyFavorite = favorites.some((fav) => fav.book_details.key === book.book_details.key);

    let updatedFaves: Book[];

    if (isAlreadyFavorite) {
      updatedFaves = favorites.filter((fave) => book.book_details.key !== fave.book_details.key);
    } else {
      updatedFaves = [...favorites, book];
    }

    setFavorites(updatedFaves);
    localStorage.setItem("favorites", JSON.stringify(updatedFaves));
  };

  return <FavoriteContext.Provider value={{ favorites, handleSaveAsFavorite }}>{children}</FavoriteContext.Provider>;
};
