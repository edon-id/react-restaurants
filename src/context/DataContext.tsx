import { createContext, useEffect, useState } from "react";
import { ContextData, Props, Restaurant } from "../interfaces/interfaces";

export const Context = createContext({} as ContextData);

export const Provider = ({ children }: Props) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisinesArray, setCuisinesArray] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string>('')

  useEffect(() => {
    const storageData = localStorage.getItem("data");
    if (typeof storageData === "string") {
      const theData: Restaurant[] = JSON.parse(localStorage.getItem("data")!);
      setRestaurants(theData);

      setCuisinesArray(
        Array.from(
          new Set(
            theData.map((restaurant: Restaurant) => restaurant.restauranttype)
          )
        )
      );
    } else {
      setLoading(true);
      fetch("http://localhost:5001/restaurants")
        .then((res) => res.json())
        .then((data) => {
          setRestaurants(
            data.map((restaurant: Restaurant) =>
              !restaurant.isFavourite
                ? { ...restaurant, isFavourite: false }
                : { ...restaurant }
            )
          );
          setCuisinesArray(
            Array.from(
              new Set(
                data.map((restaurant: Restaurant) => restaurant.restauranttype)
              )
            )
          );
        })
        .catch(() => setError("Error 404"))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        restaurants,
        setRestaurants,
        cuisinesArray,
        isLoading,
        error,
      }}
    >
      {children}
    </Context.Provider>
  );
};
