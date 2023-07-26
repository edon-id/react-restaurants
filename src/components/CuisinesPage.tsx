import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/DataContext";
import { Restaurant } from "../interfaces/interfaces";
import { AllRestaurants } from "./homepage/AllRestaurants";
import { ErrorPage } from "./ErrorPage";
import { SectionTitle } from "./homepage/SectionTitles";

export const CuisinesPage = () => {
  const { cuisines } = useParams();
  const { restaurants } = useContext(Context);
  let cuisineRestaurants: Restaurant[] = [];
  console.log(cuisines)

  if (cuisines) {
    cuisineRestaurants = restaurants.filter((restaurant) =>
      restaurant.restauranttype === cuisines
    );

    if(cuisineRestaurants.length === 0){

      return <ErrorPage />;
    }
  }
  
  console.log(cuisineRestaurants)

  return (
    <>
      <SectionTitle title={`${cuisines} restaurants`} />
      <AllRestaurants restaurants={cuisineRestaurants} />
    </>
  );
};
