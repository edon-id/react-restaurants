import { useContext } from "react";
import { Context } from "../../context/DataContext";
import { Restaurant } from "../../interfaces/interfaces";
import { AllRestaurants } from "./AllRestaurants";
import { ErrorPage } from "../ErrorPage";



export const MostPopular = () => {
  const { restaurants } = useContext(Context);
  let sortedRestaurants: Restaurant[];

  if (restaurants) {
    sortedRestaurants = restaurants
      .sort((prev, next) => (prev.reviews > next.reviews ? -1 : 1))
      .filter((el, index) => index < 10);
  } else {
    return <ErrorPage />;
  }

  return (
    <>
      <AllRestaurants restaurants={sortedRestaurants} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <hr className="border-bottom border-2"/>
          </div>
        </div>
      </div>
    </>
  );
};
