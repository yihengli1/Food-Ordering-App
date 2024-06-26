import Meals from "./components/Meals";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import { CartContext } from "./store/cart-context";
import ShowCart from "./components/ShowCart";
import ErrorMsg from "./components/ErrorMsg";
import SecondCart from "./components/SecondCart";
import Success from "./components/Success";

function App() {
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [shopping, setShopping] = useState(0);

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
        console.log(data);
      } catch (error) {
        setError(error.message);
        errorDialog.current.showModal();
      }

      setIsFetching(false);
    }

    fetching();
  }, []);

  function handleAddMeal(id) {
    const temp1 = id.slice(1);
    const data = fetchedMeals[+temp1 - 1];
    setItemsSelected((prev) => {
      const index = prev.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const temp = [...prev];
        temp[index].quantity++;
        return temp;
      } else {
        return [...prev, { ...data, quantity: 1 }];
      }
    });
  }

  function handleErrorClose() {
    setError("");
    errorDialog.current.close();
  }

  function openError(msg) {
    setError(msg);
    errorDialog.current.showModal();
    firstCart.current.close();
    setShopping(0);
  }

  function handleClose() {
    setShopping(0);
    firstCart.current.close();
  }

  function handleShopping(next, cond) {
    if (cond) {
      setError("You have no items added to cart!");
      errorDialog.current.showModal();
      firstCart.current.close();
      setShopping(0);
    } else {
      setShopping(next);
      firstCart.current.showModal();
    }
  }

  function quantityChange(sign, id) {
    setItemsSelected((prev) => {
      const index = itemsSelected.findIndex((item) => item.id === id);
      const temp = [...prev];
      if (sign === 1) {
        temp[index].quantity++;
        return temp;
      } else {
        if (temp[index].quantity == 1) {
          return temp.filter((item) => item.id !== id);
        } else {
          temp[index].quantity--;
          return temp;
        }
      }
    });
  }

  function timer() {
    setTimeout(() => {
      firstCart.current.close();
      setShopping(0);
    }, 2500);
  }

  const cartCtx = {
    items: itemsSelected,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {/* Error */}
      <Modal ref={errorDialog} onClose={handleErrorClose}>
        <ErrorMsg text={error} handleError={handleErrorClose} />
      </Modal>
      <Header handleShopping={handleShopping} />
      {/* Cart */}
      <Modal ref={firstCart} onClose={handleClose}>
        {shopping === 1 ? (
          <ShowCart
            closeMenu={handleClose}
            toggleModal={handleShopping}
            quantityChange={quantityChange}
          />
        ) : null}
        {shopping === 2 ? (
          <SecondCart
            closeMenu={handleClose}
            toggleModal={handleShopping}
            openError={openError}
          />
        ) : null}
        {shopping === 3 ? <Success timer={timer} /> : null}
      </Modal>
      {/* Meals */}
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
