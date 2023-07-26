import { createContext, useContext, useState } from "react";
import { HandleFavouritesContextData, Props } from "../interfaces/interfaces";
import { Context } from "./DataContext";

export const HandleFavouritesContext = createContext(
  {} as HandleFavouritesContextData
);

export const Provider = ({ children }: Props) => {
  const [favourites, setFavourites] = useState<boolean>(false);
  const { restaurants } = useContext(Context);

  const handleFavourites = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();

    const selectedElement = restaurants.find((res) => res.id === id);
    if (selectedElement) {
      selectedElement.isFavourite = !selectedElement.isFavourite;
    }
    localStorage.setItem("data", JSON.stringify(restaurants));
  };

  return (
    <HandleFavouritesContext.Provider
      value={{
        favourites,
        setFavourites,
        handleFavourites,
      }}
    >
      {children}
    </HandleFavouritesContext.Provider>
  );
};
