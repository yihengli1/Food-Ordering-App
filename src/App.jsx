import Meals from "./components/Meals";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import { CartContext } from "./store/cart-context";

function App() {
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);

  useEffect(() => {
    async function fetching() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();
        setFetchedMeals(data);
      } catch (error) {
        setError("Failed to fetch data, refresh to try again");
      }

      setIsFetching(false);
    }

    fetching();
  }, []);

  function handleAddMeal(id) {
    const temp = id.slice(1);
    const data = fetchedMeals[+temp - 1];
    setItemsSelected((prev) => [...prev, data]);
    console.log(itemsSelected);
  }

  const cartCtx = {
    items: itemsSelected,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {error ? <Modal text={error} /> : null}
      <Header />
      {isFetching ? (
        <h1>Is fetching data...</h1>
      ) : (
        <div id="meals">
          {fetchedMeals.map((meal) => {
            return <Meals key={meal.id} {...meal} addMeal={handleAddMeal} />;
          })}
        </div>
      )}
    </CartContext.Provider>
  );
}

export default App;
