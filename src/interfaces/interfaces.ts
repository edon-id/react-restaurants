export type Restaurant = {
  reviews: number;
  parkinglot: boolean;
  phone: string;
  image: string;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  id: string;
  reviewsList: ReviewList[];
  isFavourite?: boolean;
};

export type ReviewList = {
  id: number | string;
  author: string;
  comment: string;
  stars: number;
};

export interface ContextData {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  cuisinesArray:string[];
  isLoading:boolean;
  error:string;
}

export interface HandleFavouritesContextData {
  favourites: boolean;
  setFavourites: (favourites: boolean) => void;
  handleFavourites: (
    e: React.MouseEvent<HTMLElement>,
    id: string,
  ) => void;
}

export interface Props {
  children: React.ReactNode;
}
