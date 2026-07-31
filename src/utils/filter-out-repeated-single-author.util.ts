// In many title searches, OpenLibrary includes the same “original” book (written by the author) multiple times. These are not different editions; they are the same book uploaded multiple times. This feature only includes the book by the original author once, and it also includes books with multiple authors even if one of them is the original author. This is because, sometimes, the authors of a commentary also list the original author

import type { Book } from "../models/book";

export const filterOutRepeatedSingleAuthor = (books: Book[]): Book[] => {
  const filteredBooks: string[] = [];

  return books.filter((book) => {
    const authors = book.book_details.author_name;

    if (authors.length === 1) {
      const author = authors[0];
      if (!filteredBooks.includes(author)) {
        filteredBooks.push(author);
        return true; // We only included the author's first solo book
      }
      return false; // The rest are discarded
    }
    return true // Books with multiple authors are always a hit
  });
};
