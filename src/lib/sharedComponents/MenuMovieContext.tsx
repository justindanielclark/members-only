import { createContext, useContext } from "react";

export type MenuMovieContextType = {
  selectedID?: number;
  setSelectedID?: (x?: number) => void;
};

export const MenuMovieContext = createContext<MenuMovieContextType>({
  selectedID: undefined,
  setSelectedID: undefined,
});

export const useMenuMovieContext = () => useContext(MenuMovieContext);
