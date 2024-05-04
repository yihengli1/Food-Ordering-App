import { useContext } from "react";
import { CartContext } from "../store/cart-context";

export default function SecondCart({ price, closeMenu, toggleModal }) {
  const { items } = useContext(CartContext);
  const calculatedTotal = items.length
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    toggleModal(3);
  }

  return (
    <form className="control" onSubmit={onSubmit}>
      <h2 className="margin"> Checkout</h2>
      <p>Total Amount: ${calculatedTotal}</p>
      <div>
        <div className="control-row">
          <div>
            <label>Full Name</label>
            <input />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>Email</label>
            <input />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>Street</label>
            <input />
          </div>
        </div>
      </div>
      <div className="control-row">
        <div>
          <label>Postal Code</label>
          <input />
        </div>
        <div>
          <label>City</label>
          <input />
        </div>
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={closeMenu} type="button">
          Close
        </button>
        <button className="button" type="submit">
          Submit Order
        </button>
      </div>
    </form>
  );
}
