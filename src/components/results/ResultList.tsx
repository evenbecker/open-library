import { useState } from "react";
import { useSearch } from "../../context/search";
import { useFavorite } from "../../context/favorites";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../context/navigation";

const BOOKS_PER_PAGE = 20;

export const ResultList = () => {
  const { bookList, loading, loadingMore, error, handleFetchMore, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const [shownBooks, setShownBooks] = useState<number>(BOOKS_PER_PAGE);
  const [listView, setListView] = useState<boolean>(false);
  const { setClickFromResultList, setClickFromFavorites } = useNavigation();
  const navigate = useNavigate();

  const visibleBooks = bookList.slice(0, shownBooks);
  const canShowMore = bookList.length > shownBooks;
  const canFetchMore = !canShowMore && bookList.length > 0;

  const handleShowMore = () => setShownBooks((prev) => prev + BOOKS_PER_PAGE);

  if (loading) return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>Loading results...</p>
      </div>
    );
  if (error) return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>Error fetching books</p>
      </div>
    );
  if (bookList.length === 0) return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>No books found</p>
      </div>
    );

  return (
    <>
      {/* mobile device */}
      <div className="flex w-fit mb-2 mx-auto gap-6 h-fit">
        <button
          onClick={() => setListView(true)}
          className={`block mx-auto cursor-pointer ${listView ? "text-red-700" : "text-zinc-500"}`}
        >
          <svg width="28" height="28" aria-hidden="true">
            <use href="/assets/spritesheet.svg#icon-list"></use>
          </svg>
        </button>
        <button
          onClick={() => setListView(false)}
          className={`block mx-auto cursor-pointer ${!listView ? "text-red-700" : "text-zinc-500"}`}
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/assets/spritesheet.svg#icon-grid-dots"></use>
          </svg>
        </button>
      </div>

      {/* Grid or list of books */}
      <div
        className={
          listView
            ? "flex flex-col gap-4 p-1"
            : "grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-1"
        }
      >
        {visibleBooks.map((book) => (
          <div
            key={book.book_details.key}
            className={`flex flex-col items-center gap-2 text-center 
            ${listView ? "flex-row items-center gap-4" : ""}`}
          >
            
            
            <div
              onClick={() => {
                setSelectedBook(book);
                setClickFromResultList(true);
                setClickFromFavorites(false);
                navigate("/books/results/book-detail");
              }}
              className={
                listView
                  ? "flex items-center gap-4 flex-1 justify-between border border-[var(--border-gray-even)] rounded-lg p-2"
                  : "flex flex-col items-center gap-0.5 border border-[var(--border-gray-even)] rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
              }
            >
              <img
                src={book.cover_image}
                alt={book.book_details.title}
                className={listView ? "w-24 h-32 object-contain" : "w-40 h-50 xs:w-50 xs:h-62 object-contain mx-auto"}
              />
              <div>
                <h3
                  className={
                    listView
                      ? "text-sm font-semibold text-gray-900"
                      : "mx-auto text-lg font-semibold text-gray-900 max-w-[19ch] break-words text-center"
                  }
                >
                  {book.book_details.title}
                </h3>
                <p
                  className={
                    listView
                      ? "text-xs text-[var(--border-gray-even)]"
                      : "mx-auto text-sm text-[var(--border-gray-even)] max-w-[22ch] break-words text-center"
                  }
                >
                  {book.book_details.author_name.slice(0, 5).join(", ")}
                </p>
                <p
                  className={
                    listView ? "text-xs text-[var(--border-gray-even)]" : "text-sm text-[var(--border-gray-even)]"
                  }
                >
                  {book.book_details.first_publish_year}
                </p>
              </div>

              {/* Favorites button inside the border in list view*/}
              {listView && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveAsFavorite(book);
                  }}
                  className="cursor-pointer text-xs p-1"
                >
                  {favorites.some((fav) => fav.book_details.key === book.book_details.key) ? (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-filled"></use>
                    </svg>
                  ) : (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-outline"></use>
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Off-edge favorite button in grid view*/}
            {!listView && (
              <div>
                <button onClick={() => handleSaveAsFavorite(book)} className="cursor-pointer text-xs p-1">
                  {favorites.some((fav) => fav.book_details.key === book.book_details.key) ? (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-filled"></use>
                    </svg>
                  ) : (
                    <svg width="28" height="28" aria-hidden="true" className="text-red-500">
                      <use href="/assets/spritesheet.svg#icon-heart-outline"></use>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* “Show More” and “Fetch More” buttons*/}
      <div className="flex flex-col items-center mt-4 w-full">
        {canShowMore && (
          <button
            onClick={handleShowMore}
            className="cursor-pointer text-center p-2 mt-2 mb-8 border border-[var(--border-gray-even)] rounded-lg"
          >
            Show more books
          </button>
        )}

        {canFetchMore && (
          <button
            onClick={handleFetchMore}
            className="cursor-pointer text-center p-2 mt-2 mb-8 border border-[var(--border-gray-even)] rounded-lg"
          >
            Fetch more books
          </button>
        )}

        {loadingMore && <p className="mt-2">Loading more books...</p>}
      </div>
    </>
  );
};
