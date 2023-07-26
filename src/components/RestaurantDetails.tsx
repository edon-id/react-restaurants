import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/DataContext";
import { Restaurant, ReviewList } from "../interfaces/interfaces";
import { ErrorPage } from "./ErrorPage";
import { SectionTitle } from "./homepage/SectionTitles";
import { RestaurantCard } from "./RestaurantCard";
import { Reviews } from "./Reviews";

const findRestaurant = (
  id: string | undefined,
  restaurants: Restaurant[]
): Restaurant | undefined => {
  if (!id) {
    return undefined;
  }
  return restaurants.find((res) => res.id === id);
};

export type FormEvents =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const INITSTATE = {
  id: "",
  author: "",
  comment: "",
  stars: 0,
};

export const RestaurantDetails = () => {
  const { restaurants, setRestaurants } = useContext(Context);
  const { id } = useParams();
  const [dataRecord, setDataRecord] = useState<ReviewList>(INITSTATE);
  const [formCheck, setFormCheck] = useState<boolean>(false);

  let restaurant = findRestaurant(id, restaurants);
  useEffect(() => {
    if (restaurant) {
      localStorage.setItem("data", JSON.stringify(restaurants));
    }
  }, [restaurants,restaurant]);

 
  if (!restaurant) {
    return <ErrorPage />;
  }

  const onChange = (e: FormEvents) => {
    e.target.name !== "stars"
      ? setDataRecord({
          ...dataRecord,
          [e.target.name]: e.target.value,
          id: restaurant ? restaurant.reviewsList.length : 0,
        })
      : setDataRecord({ ...dataRecord, [e.target.name]: +e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormCheck(true);
    if (
      dataRecord.author !== "" &&
      dataRecord.comment !== "" &&
      dataRecord.stars > 0
    ) {
      console.log(dataRecord);
      if (restaurant) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...restaurant,
            reviewsList: [...restaurant.reviewsList, dataRecord],
            reviews: restaurant.reviews + 1,
          }),
        };
        fetch(`http://localhost:5001/restaurants/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data: Restaurant) =>
            setRestaurants(
              restaurants.map((restaurant) =>
                restaurant.id === data.id ? data : restaurant
              )
            )
          );
      }

      setDataRecord(INITSTATE);
      setFormCheck(false);
      console.log(dataRecord);
    }
  };

  return (
    <>
      <SectionTitle title={restaurant.businessname} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <RestaurantCard key={restaurant.id} data={restaurant}>
              <div className="card-body">
                <Reviews restaurant={restaurant} />
                <p className="card-text">{restaurant.phone}</p>
                <p className="card-text">{restaurant.email}</p>
                <p className="card-text">{restaurant.address}</p>
                <p className="card-text">
                  We {!restaurant.parkinglot && "don't"} have parking lot
                  waiting for you
                </p>
              </div>
            </RestaurantCard>
            {restaurant.reviewsList.length > 0 && (
              <h2 className="text-center mb-4 text-uppercase fs-4 fw-bold w-100">
                Reviews
              </h2>
            )}
            {restaurant.reviewsList.length > 0 &&
              restaurant.reviewsList.map((review, index) => (
                <div key={index} className="p-4 bg-light mb-4 rounded">
                  <p>
                    <span className="fw-bold">Author: </span>
                    <span>{review.author}</span>
                  </p>
                  <p>
                    <span className="fw-bold">Message: </span>
                    <span>{review.comment}</span>
                  </p>
                  <p>
                    <span className="fw-bold">Stars: </span>
                    <span>{review.stars}</span>
                  </p>
                </div>
              ))}
            <>
              <h2 className="text-center mb-4 text-uppercase fs-4 fw-bold w-100">
                Review Form
              </h2>
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="nameInput">Name</label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="name"
                    name="author"
                    className="form-control"
                    placeholder="Name"
                    value={dataRecord.author}
                  />
                  {formCheck && dataRecord.author === "" && (
                    <p className="small text-danger">Please enter your name</p>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="commentInput">Comment</label>
                  <textarea
                    onChange={(e) => onChange(e)}
                    name="comment"
                    className="form-control"
                    placeholder="Comment..."
                    rows={1}
                    value={dataRecord.comment}
                  />
                  {formCheck && dataRecord.comment === "" && (
                    <p className="small text-danger">Please enter comment</p>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label className="form-check-label">Rating</label>
                  <input
                    name="stars"
                    type="range"
                    className="form-range"
                    min="0"
                    max="5"
                    value={dataRecord.stars}
                    onChange={(e) => onChange(e)}
                  />
                  {formCheck && dataRecord.stars === 0 && (
                    <p className="small text-danger">
                      Please rate the restaurant from 1 to 5
                    </p>
                  )}
                </div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
