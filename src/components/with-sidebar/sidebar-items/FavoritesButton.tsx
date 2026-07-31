import { NavLink, useLocation } from "react-router-dom";
import { useNavigation } from "../../../context/navigation";

export const FavoritesButton = () => {
  const location = useLocation();
  const { setPreviousRoute } = useNavigation();

  return (
    <NavLink
      to="/books/results/favorites"
      onClick={() => setPreviousRoute(location.pathname)}
      className={({ isActive }) =>
        `flex flex-col w-fit xs:flex-row items-center gap-1 py-1 px-2 xs:mt-1 rounded-lg ${
          isActive ? "xs:bg-amber-200 text-gray-900 font-bold" : "text-gray-900 hover:bg-amber-200"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <svg width="40" height="40" aria-hidden="true" className="text-red-500 xs:w-7 xs:h-7">
            <use href={`/assets/spritesheet.svg#${isActive ? "icon-heart-filled" : "icon-heart-outline"}`}></use>
          </svg>
          <span className="hidden xs:inline xs:text-md font-semibold">My favorites</span>
        </>
      )}
    </NavLink>
  );
};
