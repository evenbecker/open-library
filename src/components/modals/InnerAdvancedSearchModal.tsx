import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const InnerAdvancedSearchModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--background-color-even)] opacity-92 rounded-lg shadow-lg p-4 relative w-[90%] max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
