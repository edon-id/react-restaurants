import { useContext } from "react";
import { Context } from "../context/DataContext";
import { AllRestaurants } from "./homepage/AllRestaurants";
import { Cuisines } from "./homepage/Cuisines";
import { SectionTitle } from "./homepage/SectionTitles";
import { MostPopular } from "./homepage/MostPopular";
import { RandomChoise } from "./homepage/RandomChoise";
import { Audio } from "react-loader-spinner";
export const HomePage = () => {
  const { restaurants, isLoading } = useContext(Context);

  console.log(restaurants);
  return (
    <>
      {isLoading && (
        <div className="d-flex min-height-class justify-content-center align-items-center">
          <div className="text-center">
            <h1>LOADING...</h1>
            <Audio height="80" width="80" color="green" ariaLabel="loading" />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <SectionTitle title="Dont't know what to eat?" />
          <RandomChoise arr={restaurants} />
          <SectionTitle title="Our most popular restaurants" />
          <MostPopular />
          <SectionTitle title="Cuisines" />
          <Cuisines />
          <SectionTitle title="All restaurants" />
          <AllRestaurants restaurants={restaurants} />
        </>
      )}
    </>
  );
};
