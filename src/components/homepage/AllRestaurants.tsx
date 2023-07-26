import { useLocation } from "react-router-dom";
import { Restaurant } from "../../interfaces/interfaces";
import { RestaurantCard } from "../RestaurantCard";
import { Reviews } from "../Reviews";

type Props = {
  restaurants: Restaurant[];
};
export const AllRestaurants = ({ restaurants }: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="container-fluid mb-4">
      <div className="row">
        {restaurants.map((restaurant, index, array) => (
          <div
            key={restaurant.id}
            className={
              pathname !== "/favorites"
                ? `col-lg-2 col-sm-5 mb-4 ${
                    window.innerWidth > 990 && index % 5 === 0
                      ? "offset-sm-1"
                      : ""
                  } ${
                    window.innerWidth > 576 &&
                    window.innerWidth < 990 &&
                    index % 2 === 0
                      ? "offset-sm-1"
                      : ""
                  }`
                : "col-sm-10  offset-sm-1"
            }
          >
            <RestaurantCard data={restaurant}>
              <div className="card-body">
                <h2 className="h5 fw-bold">{restaurant.businessname}</h2>
                <p className="card-text salmon-color fw-bold">
                  {restaurant.restauranttype}
                </p>
                <Reviews restaurant={restaurant} />
              </div>
            </RestaurantCard>
          </div>
        ))}
      </div>
    </div>
  );
};
