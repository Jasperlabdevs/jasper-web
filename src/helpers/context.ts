import { createContext } from "react";

export type sideBarContextType = {
  sideBar: boolean;
  setTodo: () => void;
};

export const SideBarContext = createContext<any | null>(false);
