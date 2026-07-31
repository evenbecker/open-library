// This filter allows the first book with the title “X” to pass through and removes the previous ones, so there are no duplicates.

import type { Book } from "../models/book";

export const filterOutRepeatedTitle = (books: Book[]): Book[] => {
  const filteredBooks: string[] = [];

  return books.filter((book) => {
    const bookTitle = book.book_details.title;

    if (!filteredBooks.includes(bookTitle)) {
      filteredBooks.push(bookTitle);
      return true;
    }
    return false;
  });
};
