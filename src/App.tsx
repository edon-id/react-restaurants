import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CuisinesPage } from "./components/CuisinesPage";
import { ErrorPage } from "./components/ErrorPage";
import { FavouriteRestaurants } from "./components/FavouriteRestaurants";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import { RestaurantDetails } from "./components/RestaurantDetails";
import { Provider } from "./context/DataContext";
import { Provider as HandleFavourites } from "./context/HandleFavouritesContext";

const App = () => {
  return (
    <>
      <Provider>
        <HandleFavourites>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavouriteRestaurants />} />
              <Route
                path="/restaurantDetails/:id"
                element={<RestaurantDetails />}
              />
              <Route path='/:cuisines' element={<CuisinesPage/>}/>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </HandleFavourites>
      </Provider>
    </>
  );
};

export default App;
