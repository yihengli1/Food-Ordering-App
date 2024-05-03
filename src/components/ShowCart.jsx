import { CartContext } from "../store/cart-context";
import Item from "./Item";
import { useContext } from "react";

export default function ShowCart({ toggleModal, closeMenu, quantityChange }) {
  const { items } = useContext(CartContext);

  const calculatedTotal = items.length
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="cart">
      <h2> Your Cart</h2>
      <ul>
        {items.length ? (
          items.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                text={`${item.name} - ${item.quantity} x $${item.price}`}
                number={item.quantity}
                quantityChange={quantityChange}
              />
            );
          })
        ) : (
          <p>No items so far</p>
        )}
      </ul>
      <p className="cart-total">${calculatedTotal}</p>
      <div className="modal-actions">
        <button className="text-button" onClick={closeMenu}>
          Close
        </button>
        <button className="button" onClick={() => toggleModal(2)}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
