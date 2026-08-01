import { Outlet } from "react-router-dom";
import { InnerAdvancedSearchForm, InnerSearchBar, Sidebar } from "../../components/with-sidebar";
import { useState } from "react";
import { InnerAdvancedSearchModal } from "../../components/modals";

export const MyLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="grid xs:grid-cols-[auto_1fr] xs:h-screen bg-[var(--background-color-even)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Right column (header + books) */}
      <div className="grid grid-rows-[auto_1fr] xs:h-screen">
        {/* Header with InnerSearchBar and toggle */}
        <div className="hidden xs:flex xs:flex-col items-center justify-center text-center w-full p-2 border-b border-[var(--border-gray-even)]">
          <div
            className={`w-fit grid gap-6 transition-all duration-500 ${
              showAdvancedSearch ? "grid-cols-[1fr_auto] items-center" : "grid-cols-1"
            }`}
          >
            {/* InnerSearchBar */}
            <div className="flex flex-col">
              <InnerSearchBar />

              {/* Toggle for the modal */}
              <button
                className="text-center w-fit text-xs mx-auto cursor-pointer border border-[var(--border-gray-even)] bg-yellow-300 rounded-lg px-4 py-2 mt-3"
                onClick={toggleAdvancedSearch}
              >
                Show advanced search
              </button>
            </div>

            {/* Modal for AdvancedSearch */}
            {showAdvancedSearch && (
              <InnerAdvancedSearchModal isOpen={showAdvancedSearch} onClose={toggleAdvancedSearch}>
                <InnerAdvancedSearchForm />
              </InnerAdvancedSearchModal>
            )}
          </div>
        </div>

        {/* Outlet */}
        <div className="xs:overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
