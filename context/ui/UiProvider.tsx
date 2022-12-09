import { FC, useState } from "react";
import { UiContext } from "./";

export const UiProvider: FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <UiContext.Provider
      value={{
        isMenuOpen,

        // Methods
        toggleSideMenu,
      }}>
      {children}
    </UiContext.Provider>
  );
};
