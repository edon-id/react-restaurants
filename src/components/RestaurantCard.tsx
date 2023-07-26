import { Restaurant } from "../interfaces/interfaces";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useContext } from "react";
import { HandleFavouritesContext } from "../context/HandleFavouritesContext";

interface Props {
  data: Restaurant;
  children?: React.ReactNode;
}
export const RestaurantCard = ({ data, children }: Props) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { favourites, setFavourites, handleFavourites } = useContext(
    HandleFavouritesContext
  );

  return (
    <Link
      to={`/restaurantDetails/${data.id}`}
      className={`${pathname === "/" ? "h-100" : "mb-4"}`}
    >
      <div
        className={`card position-relative rounded-3  bg-light ${
          pathname === "/" && "h-100"
        }`}
      >
        {!id && (
          <i
            className={`salmon-color fa-heart fa-2x hearts-absolute  ${
              data.isFavourite ? "fas" : "far"
            }`}
            onClick={(e) => {
              setFavourites(!favourites);
              handleFavourites(e, data.id);
            }}
          />
        )}
        <div className={`${pathname === "/favorites" ? "res" : "img-ratio"}`}>
          <img
            className={`card-img-top ${!id && "rounded-3"}`}
            src={data.image}
            alt="food and drinks"
          />
        </div>
        {children}
      </div>
    </Link>
  );
};
