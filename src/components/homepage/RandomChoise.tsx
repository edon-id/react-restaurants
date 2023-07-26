import { Link } from "react-router-dom";
import { Restaurant } from "../../interfaces/interfaces";

interface RandomDataProps {
  arr: Restaurant[];
}

export const RandomChoise = ({ arr }: RandomDataProps) => {
  return (
    <div className="container-fluid">
      {arr.length > 0 && (
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <div className="pb-4 border-bottom border-2">
              <Link
                className="btn btn-green w-100"
                to={`/restaurantDetails/${
                  arr[Math.floor(Math.random() * arr.length)].id
                }`}
              >
                Surprise me!
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
