// This component specifically handles all searches that return only one book

import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";

export const SingleResult = () => {
  const { book, loading, error, setSelectedBook } = useSearch();
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { setClickFromResultList, setClickFromFavorites } = useNavigation();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>Loading results...</p>
      </div>
    );
  if (error)
    return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>Error fetching books</p>
      </div>
    );
  if (!book)
    return (
      <div className="h-full pb-150 xs:pb-0 xs:h-auto">
        <p>No books found</p>
      </div>
    );

  return (
    <div className="">
      <div
        key={book.book_details.key}
        className="flex flex-col items-center gap-0.5 text-center cursor-pointer p-2 w-fit mx-auto xs:m-0"
        onClick={() => {
          setSelectedBook(book);
          setClickFromResultList(false);
          setClickFromFavorites(false);
          navigate("/books/results/book-detail");
        }}
      >
        <div className="flex flex-col items-center gap-1 p-2 flex-1 justify-between border border-[var(--border-gray-even)] rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
          <img
            src={book.cover_image}
            alt={book.book_details.title}
            className="w-40 h-50 xs:w-50 xs:h-62 object-contain mx-auto"
          ></img>
          <h3 className="mx-auto text-lg font-semibold text-gray-900 max-w-[19ch] break-words text-center">
            {book.book_details.title}
          </h3>
          <p className="mx-auto text-sm text-[var(--border-gray-even)] max-w-[22ch] break-words text-center">
            {book.book_details.author_name.slice(0, 5).join(", ")}
          </p>
          <p className="text-sm text-[var(--border-gray-even)]">{book.book_details.first_publish_year}</p>
        </div>

        {/*  favorite button */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSaveAsFavorite(book);
            }}
            className="cursor-pointer text-xs p-1 mt-2"
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
        </div>
      </div>
    </div>
  );
};
