
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/DataContext";

export const Navbar = () => {
  const { isLoading } = useContext(Context);


  return (
    <>
      {!isLoading &&<div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-sm-1">
            <nav className="d-flex  justify-content-between py-4 align-items-center border-bottom border-2">
              <Link className="navbar-brand fs-5 fw-bold" to="/">
                RESTAURANT
              </Link>
              <Link to={"/favorites"}>
                <i className="fa fa-heart fa-2x salmon-color" />
              </Link>
            </nav>
          </div>
        </div>
      </div>}
    </>
  );
};
