import { NavLink } from "react-router-dom";

export const HomeButton = () => {
  return (
    <NavLink
      to="/search"
      className={({ isActive }) =>
        `flex flex-col w-fit xs:flex-row items-center gap-1 py-1 xs:mt-3 px-2 rounded-lg ${
          isActive ? "bg-white text-red-500 font-bold" : "text-gray-900 hover:bg-amber-200"
        }`
      }
    >
      <svg width="40" height="40" aria-hidden="true" className="text-red-500 xs:w-7 xs:h-7">
        <use href="/assets/spritesheet.svg#icon-home"></use>
      </svg>
      <span className="hidden xs:inline xs:text-md font-semibold">Home page</span>
    </NavLink>
  );
};
