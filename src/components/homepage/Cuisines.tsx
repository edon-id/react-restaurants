import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/DataContext";

export const Cuisines = () => {
  const { cuisinesArray } = useContext(Context);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10 offset-sm-1">
          <div className="d-flex justify-content-center  pb-4 border-bottom border-2 flex-wrap">
            {cuisinesArray.map((cuisine, index) => (
              <Link key={index}
                className={`btn text-white bg-salmon mb-2 ${
                  index !== cuisinesArray.length - 1 && "me-3"
                }`}
                to={`/${cuisine}`}
              >
                {cuisine}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
