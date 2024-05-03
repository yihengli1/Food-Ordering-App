import { CartContext } from "../store/cart-context";
import { useContext } from "react";

export default function Header({ handleShopping }) {
  const { items } = useContext(CartContext);

  return (
    <div id="main-header">
      <h1 id="title">
        <img src="logo.jpg"></img>
        ReactFood
      </h1>
      <button className="button" onClick={() => handleShopping(1)}>
        {items.length
          ? `Cart(${items.reduce((acc, item) => acc + item.quantity, 0)})`
          : "Cart"}
      </button>
    </div>
  );
}
