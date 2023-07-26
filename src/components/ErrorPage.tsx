import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10 offset-sm-1 min-height-class d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1>Error 404</h1>
            <p className="d-inline h4">
              Page not found. Please return to{" "} 
              {
                <Link to="/" className="text-decoration-underline d-inline text-dark">
                   homepage
                </Link>
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
