import Meals from "./components/Meals";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import { CartContext } from "./store/cart-context";
import ShowCart from "./components/ShowCart";

function App() {
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [shopping, setShopping] = useState(false);
  const [form, setForm] = useState(false);

  const errorDialog = useRef();
  const firstCart = useRef();

  useEffect(() => {
    async function fetching() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch data, refresh to try again");
        }

        const data = await response.json();
        setFetchedMeals(data);
      } catch (error) {
        setError(error.message);
        errorDialog.current.showModal();
      }

      setIsFetching(false);
    }

    fetching();
  }, []);

  function handleAddMeal(id) {
    const temp = id.slice(1);
    const data = fetchedMeals[+temp - 1];
    setItemsSelected((prev) => [...prev, data]);
  }

  function handleErrorClose() {
    setError("");
    errorDialog.current.close();
  }

  function openFormInput() {}

  function handleShopping() {
    setShopping(true);
    firstCart.current.showModal();
  }

  const cartCtx = {
    items: itemsSelected,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      <Header handleShopping={handleShopping} />
      {shopping ? (
        <Modal ref={firstCart} onClose={openFormInput}>
          <ShowCart />
        </Modal>
      ) : null}
      {/* {error ? (
        <Modal ref={errorDialog} onClose={handleErrorClose}>
          <p> {error} </p>
          <button onClick={onClose}> Close </button>
        </Modal>
      ) : null}
      <Header handleShopping={handleShopping} />
      {isFetching ? (
        <h1>Is fetching data...</h1>
      ) : (
        <div id="meals">
          {fetchedMeals.map((meal) => {
            return <Meals key={meal.id} {...meal} addMeal={handleAddMeal} />;
          })}
        </div>
      )} */}
    </CartContext.Provider>
  );
}

export default App;
