import { useContext } from "react";

import { Context } from "../context/DataContext";
import { Restaurant } from "../interfaces/interfaces";

interface Props {
  restaurant: Restaurant;
}
export const Reviews = ({ restaurant }: Props) => {
  const { restaurants } = useContext(Context);


  let reviewsRecord: Record<string, number> = {};

  restaurants.forEach((restaurant: Restaurant) => {
    if (!reviewsRecord[restaurant.businessname]) {
      const individualReviewCount = restaurant.reviewsList.map(
        (review) => review.stars
      );
      reviewsRecord[restaurant.businessname] = individualReviewCount.reduce(
        (a, b) => {
          return a + b;
        },
        0
      );
    }
  });

  return (
    <div>
      <>
        {restaurant.reviewsList.length > 0 && (
          <>
            <p className="mb-1">
              Rating -
              {(reviewsRecord[restaurant.businessname] / restaurant.reviews)},
            </p>
            <p className="small">Based on {restaurant.reviews} reviews</p>
          </>
        )}
      </>
    </div>
  );
};
