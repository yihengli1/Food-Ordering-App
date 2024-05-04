import { useContext } from "react";
import { CartContext } from "../store/cart-context";

export default function SecondCart({ closeMenu, toggleModal, openError }) {
  const { items } = useContext(CartContext);
  const calculatedTotal = items.length
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const modifiedData = { customer: data, items: items };

    console.log(modifiedData);

    const message = await sendEmail(modifiedData);
    if (message === "Something went wrong!") {
      openError("Something went wrong!");
    } else {
      toggleModal(3);
    }
  }

  async function sendEmail(data) {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify({ order: data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response);

      const responseData = await response.json();
      return responseData.message;
    } catch (error) {
      return error.message;
    }
  }

  return (
    <form className="control" onSubmit={onSubmit}>
      <h2 className="margin"> Checkout</h2>
      <p>Total Amount: ${calculatedTotal}</p>
      <div>
        <div className="control-row">
          <div>
            <label>Full Name</label>
            <input type="text" name="name" required />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
        </div>
        <div className="control-row">
          <div>
            <label>Street</label>
            <input type="text" name="street" required />
          </div>
        </div>
      </div>
      <div className="control-row">
        <div>
          <label>Postal Code</label>
          <input type="text" name="postal-code" required />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" required />
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
