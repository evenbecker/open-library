/* eslint-disable @typescript-eslint/no-explicit-any */
// useFetch passes Axios requests through additional filters. It also supports pagination by allowing a call with `loadMore = true` to trigger a request for the next page: 2, 3, etc

import { useState } from "react";
import {
  advancedSearch,
  getBooksByAuthor,
  getBooksByFirstPublishYear,
  getBooksBySubject,
  getBooksByTitle,
  getFirstBookByTitle,  
} from "../services/axios/axios.service";
import type { Book } from "../models/book";
import { filterOutRepeatedSingleAuthor, filterOutRepeatedTitle } from "../utils";
import type { AdvancedSearchParams } from "../models/search";

export const useFetch = () => {
  // I create caches so that the OpenLibrary 429 error doesn't occur. Random searches aren't cached because otherwise they would always return the same result.
  const cache: Record<string, Book[]> = {};
  const singleBookCache: Record<string, Book> = {};

  const [bookList, setBookList] = useState<Book[]>([]);
  const [book, setBook] = useState<Book>({
    book_details: {
      title: "",
      author_name: [],
      first_publish_year: 0,
      cover_edition_key: "",
      cover_i: 0,
      key: "",
    },
    cover_size: "",
    cover_image: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Pagination states
  const [searchType, setSearchType] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [advancedCurrentSearch, setAdvancedCurrentSearch] = useState<AdvancedSearchParams>({
    title: "",
    author: "",
    year: "",
    subject: "",
    language: "",
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchBooksByTitle = async (title: string, loadMore: boolean = false) => {
    setSearchType("title");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      // If we aren't requesting any more books and the search is cached, we return the cache
      if (!loadMore && cache[title]) {
        setBookList(cache[title]);
        setCurrentSearch(title);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByTitle(title, pageToFetch);
      const filteredBookList = filterOutRepeatedSingleAuthor(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(title);
        setCurrentPage(1);
        cache[title] = filteredBookList;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };



  const fetchBooksByAuthor = async (author: string, loadMore: boolean = false) => {
    setSearchType("author");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[author]) {
        setBookList(cache[author]);
        setCurrentSearch(author);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByAuthor(author, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(author);
        setCurrentPage(1);
        cache[author] = filteredBookList;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchBooksByFirstPublishYear = async (year: string, loadMore: boolean = false) => {
    setSearchType("year");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[year]) {
        setBookList(cache[year]);
        setCurrentSearch(year);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksByFirstPublishYear(year, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(year);
        setCurrentPage(1);
        cache[year] = filteredBookList;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchBooksBySubject = async (subject: string, loadMore: boolean = false) => {
    setSearchType("subject");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      if (!loadMore && cache[subject]) {
        setBookList(cache[subject]);
        setCurrentSearch(subject);
        setCurrentPage(1);
        return;
      }

      const books = await getBooksBySubject(subject, pageToFetch);
      const filteredBookList = filterOutRepeatedTitle(books);

      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setCurrentSearch(subject);
        setCurrentPage(1);
        cache[subject] = filteredBookList;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchAdvancedSearch = async (params: AdvancedSearchParams, loadMore: boolean = false) => {
    setSearchType("advanced search");

    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setBookList([]);
    }

    try {
      const pageToFetch = loadMore ? currentPage + 1 : 1;

      const books = await advancedSearch({
        ...params,
        page: pageToFetch,
      });

      const filteredBookList = filterOutRepeatedTitle(books);
      if (loadMore) {
        setBookList((prev) => [...prev, ...filteredBookList]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setBookList(filteredBookList);
        setAdvancedCurrentSearch(params);
        setCurrentPage(1);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error(error);
        setError("Unknown error occurred");
      }
    } finally {
      if (loadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };





 

  return {
    bookList,
    book,
    searchType,
    setSearchType,
    currentPage,
    currentSearch,
    advancedCurrentSearch,
    loading,
    loadingMore,
    error,
    fetchBooksByTitle,    
    fetchBooksByAuthor,
    fetchBooksByFirstPublishYear,
    fetchBooksBySubject,    
    fetchAdvancedSearch,
  };
};
