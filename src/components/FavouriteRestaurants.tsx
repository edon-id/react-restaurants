import { useContext, useEffect, useState } from "react";
import { Context } from "../context/DataContext";
import { HandleFavouritesContext } from "../context/HandleFavouritesContext";
import { Restaurant } from "../interfaces/interfaces";
import { AllRestaurants } from "./homepage/AllRestaurants";

export const FavouriteRestaurants = () => {
  const { restaurants } = useContext(Context);
  const { favourites } = useContext(HandleFavouritesContext);
  const [favRestaurants, setFavouriteRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    setFavouriteRestaurants(
      restaurants.filter((restaurant) => restaurant.isFavourite === true)
    );
  }, [favourites, restaurants]);

  return (
    <>
      {!favRestaurants.length && (
        <h2 className="text-center text-uppercase fs-4 fw-bold w-100 min-height-class">
          There is no restaurant choosen yet
        </h2>
      )}
      <AllRestaurants restaurants={favRestaurants} />
      {favRestaurants.length === 1 && (
        <div className="min-height-halfsize-class "></div>
      )}
    </>
  );
};
