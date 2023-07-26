import { useContext } from "react";

import { Context } from "../context/DataContext";

export const Footer = () => {
  const { isLoading } = useContext(Context);
  return (
    <>
      {!isLoading && (
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              <footer className="py-3 text-center border-top border-2">
                <p className="mb-0"> Copyright &#169; Brainster 2023</p>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
