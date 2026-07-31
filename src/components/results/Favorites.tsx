import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/favorites";
import { useSearch } from "../../context/search";
import { useNavigation } from "../../context/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Favorites = () => {
  const { favorites, handleSaveAsFavorite } = useFavorite();
  const { setSelectedBook } = useSearch();
  const { previousRoute, setPreviousRoute } = useNavigation();
  const navigate = useNavigate();
  const [listView, setListView] = useState<boolean>(false);

  // Use the flag that tracks where clicks come from so that navigation from Favorites works properly
  const handleBack = () => {
    setSelectedBook(null);
    navigate(previousRoute || "/books/results/result-list");

    setPreviousRoute("");
  };

  return (
  <>
    {/* View mode buttons for mobile devices */}
    <div className="flex w-fit mb-2 mx-auto gap-6">
      <button
        onClick={() => setListView(true)}
        className={`block xs:hidden mx-auto cursor-pointer ${listView ? "text-red-500" : ""}`}
      >
        <svg width="28" height="28" aria-hidden="true">
          <use href="/assets/spritesheet.svg#icon-list"></use>
        </svg>
      </button>
      <button
        onClick={() => setListView(false)}
        className={`block xs:hidden mx-auto cursor-pointer ${!listView ? "text-red-500" : ""}`}
      >
        <svg width="24" height="24" aria-hidden="true">
          <use href="/assets/spritesheet.svg#icon-grid-dots"></use>
        </svg>
      </button>
    </div>

    
    <div className="py-3">
      <button onClick={handleBack} className="self-start flex items-center gap-1 text-sm font-medium">
        <ArrowLeft className="w-5 h-5" /> Back to results
      </button>
    </div>

    {/* Favorites */}
    <div
      className={
        listView
          ? "flex flex-col gap-2"
          : "grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-1"
      }
    >
      {favorites.map((favorite) => (
        <div
          key={favorite.book_details.key}
          className={`flex flex-col items-center gap-2 text-center 
            ${listView ? "flex-row items-center gap-4" : ""}`}
        >

          {/* Container with a rim*/}
          <div
            onClick={() => {
              setSelectedBook(favorite);
              navigate("/books/results/book-detail");
            }}
            className={
              listView
                ? "flex flex-row items-center gap-4 flex-1 justify-between border border-[var(--border-gray-even)] rounded-lg p-2"
                : "flex flex-col items-center gap-0.5 border border-[var(--border-gray-even)] rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
            }
          >
            <img
              src={favorite.cover_image}
              alt={favorite.book_details.title}
              className={
                listView
                  ? "w-24 h-32 object-contain"
                  : "w-40 h-50 xs:w-50 xs:h-62 object-contain mx-auto"
              }
            />
            <div>
              <h3
                className={
                  listView ? "text-sm font-semibold text-gray-900" : "mx-auto text-lg font-semibold text-gray-900 max-w-[19ch] break-words text-center"
                }
              >
                {favorite.book_details.title}
              </h3>
              <p
                className={
                  listView ? "text-xs text-[var(--border-gray-even)] max-w-[22ch] break-words text-center" : "mx-auto text-sm text-[var(--border-gray-even)] max-w-[22ch] break-words text-center"
                }
              >
                {favorite.book_details.author_name.slice(0, 5).join(", ")}
              </p>
              <p
                className={
                  listView ? "text-xs text-[var(--border-gray-even)]" : "text-sm text-[var(--border-gray-even)]"
                }
              >
                {favorite.book_details.first_publish_year}
              </p>
            </div>

            {/* Favorites button inside the border in list view*/}
            {listView && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveAsFavorite(favorite);
                }}
                className="cursor-pointer text-xs p-1"
              >
                {favorites.some((fav) => fav.book_details.key === favorite.book_details.key) ? (
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
            <button onClick={() => handleSaveAsFavorite(favorite)} className="cursor-pointer text-xs p-1">
              {favorites.some((fav) => fav.book_details.key === favorite.book_details.key) ? (
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
      ))}
    </div>
  </>
);
};
