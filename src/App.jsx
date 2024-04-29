import Meals from "./components/Meals";
import Header from "./components/Header";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedMeals, setFetchedMeals] = useState([]);

  useEffect(() => {
    async function fetching() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();
        setFetchedMeals(data);
      } catch (error) {
        setError("Failed to fetch data");
      }

      setIsFetching(false);
    }

    fetching();
  }, []);

  return (
    <>
      <Header />
      <div id="meals">
        {fetchedMeals.map((meal) => {
          return <Meals key={meal.id} {...meal} />;
        })}
      </div>
    </>
  );
}

export default App;
