import { NavigationContext } from "./NavigationContext";
import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: Props) => {
  const [allowAccess, setAllowAccess] = useState(false);
  const [clickFromResultList, setClickFromResultList] = useState(false);
  const [clickFromFavorites, setClickFromFavorites] = useState(false);
  const [previousRoute, setPreviousRoute] = useState<string>("");

  return (
    <NavigationContext.Provider
      value={{
        allowAccess,
        setAllowAccess,
        clickFromResultList,
        setClickFromResultList,
        clickFromFavorites,
        setClickFromFavorites,
        previousRoute,
        setPreviousRoute
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
