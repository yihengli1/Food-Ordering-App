import { CartContext } from "../store/cart-context";
import { useContext } from "react";

export default function Header() {
  const { items } = useContext(CartContext);

  return (
    <div id="main-header">
      <h1 id="title">
        <img src="logo.jpg"></img>
        ReactFood
      </h1>
      <button className="button">
        {items ? `Cart(${items.length})` : "Cart"}
      </button>
    </div>
  );
}
