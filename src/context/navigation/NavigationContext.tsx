import { createContext, useContext } from "react";

interface NavigationContextProps {
  allowAccess: boolean;
  setAllowAccess: (value: boolean) => void;
  clickFromResultList: boolean;
  setClickFromResultList: (value: boolean) => void;
  clickFromFavorites: boolean;
  setClickFromFavorites: (value: boolean) => void;
  previousRoute: string;
  setPreviousRoute: (route: string) => void;
}

export const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
};
