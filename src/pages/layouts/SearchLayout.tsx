import { useState } from "react";
import { AdvancedSearchForm, SearchBar } from "../../components/search";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SearchLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[var(--background-color-even)]">
      {/* A container that encompasses the entire block and moves along with it */}
      <div
        className={`
          flex flex-col items-center
          transition-all duration-700
          ${showAdvancedSearch ? "lg:-translate-y-1/4" : "translate-y-0"}
        `}
      >
        {/* SearchBar */}
        <div
          className={`transition-opacity duration-700 ${
            showAdvancedSearch ? "sm:opacity-35 opacity-0" : "opacity-100"
          }`}
        >
          <SearchBar />
        </div>

        {/* toggle button*/}
        <div className="py-4 text-sm text-center mt-6">
          {showAdvancedSearch ? (
            <>
              <p>Hide advanced search</p>
              <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
                <ChevronUp size={16} />
              </button>
            </>
          ) : (
            <>
              <p>Show advanced search</p>
              <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
                <ChevronDown size={16} />
              </button>
            </>
          )}
        </div>

        {/* AdvancedSearchForm */}
        {showAdvancedSearch && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 sm:static sm:top-auto sm:translate-y-0 animate-[slideInDownwards_0.5s_ease-in-out_0.1s_both]`}
          >
            <AdvancedSearchForm />
          </div>
        )}
      </div>
    </div>
  );
};
