// The Axios service sends requests to the API and parses the response. Each call returns the first page of results from OpenLibrary (100).

import axios from "axios";
import type { Book, OpenLibraryDoc } from "../../models/book";
import { filterOutRepeatedTitle, mapDocsToBooks } from "../../utils";
import { languageMap } from "../../models/language/LanguageMap.type";
import type { AdvancedSearchParams } from "../../models/search/index";

// GET BOOKS BY TITLE
export const getBooksByTitle = async (title: string, page: number = 1): Promise<Book[]> => {
  // We encode the query so that it is in the correct format
  const query = encodeURIComponent(title);

  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}&page=${page}`);
  // We convert from OpenLibraryDoc to Book
  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET FIRST BOOK BY TITLE (QUICK SEARCH)
export const getFirstBookByTitle = async (title: string): Promise<Book> => {
  const query = encodeURIComponent(title);
  const res = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
  // We published only the first book
  const docToShow: OpenLibraryDoc = res.data.docs[0];

  return mapDocsToBooks(docToShow);
};

// GET BOOKS BY AUTHOR
export const getBooksByAuthor = async (author: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(author);
  const res = await axios.get(`https://openlibrary.org/search.json?author=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET BOOKS BY FIRST PUBLISH YEAR
export const getBooksByFirstPublishYear = async (year: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(year);
  const res = await axios.get(`https://openlibrary.org/search.json?q=first_publish_year:${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// GET BOOKS BY GENRE
export const getBooksBySubject = async (subject: string, page: number = 1): Promise<Book[]> => {
  const query = encodeURIComponent(subject);
  const res = await axios.get(`https://openlibrary.org/search.json?subject=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};

// ADVANCED SEARCH
export const advancedSearch = async ({
  title,
  author,
  year,
  subject,
  language,
  page = 1,
}: AdvancedSearchParams): Promise<Book[]> => {
  let q = "";

  if (title) q += `title:${title} `;
  if (author) q += `author:${author} `;
  if (year) q += `year:${year} `;
  if (subject) q += `subject:${subject} `;
  if (language) {
    const isoLang = languageMap[language.toLowerCase()];
    if (isoLang) q += `language:${isoLang} `;
  }

  const query = encodeURIComponent(q.trim());
  const res = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`);

  return res.data.docs.map((docs: OpenLibraryDoc) => mapDocsToBooks(docs));
};






